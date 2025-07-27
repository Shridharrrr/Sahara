"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { translations } from "@/lib/translations/voice-benefits";
import { benefitSchemes } from "@/lib/benefitSchemes";
import { 
  Mic, MicOff, Volume2, FileText, MapPin, Users, Heart, Save, History, 
  LogOut, User, Settings, ChevronDown, Brain, Zap, CheckCircle, AlertCircle 
} from "lucide-react";
import { auth, db } from "@/lib/firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { 
  collection, addDoc, getDocs, query, where, orderBy, limit, 
  doc, getDoc, Timestamp 
} from "firebase/firestore";
import { aiMatchingService, formatMatchScore, formatEligibilityStatus } from '@/lib/aiMatchingService';

export default function VoiceToBenefitPage() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [matchedBenefits, setMatchedBenefits] = useState([]);
  const [extractedProfile, setExtractedProfile] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [previousSessions, setPreviousSessions] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [aiResults, setAiResults] = useState(null);
  const [processingError, setProcessingError] = useState(null);
  const recognitionRef = useRef(null);
  const router = useRouter();

  // Language options
  const languages = [
    { code: 'hi-IN', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr-IN', name: 'मराठी', flag: '🇮🇳' },
    { code: 'en-IN', name: 'English', flag: '🇮🇳' }
  ];
  
  const t = translations[selectedLanguage] || translations["en-IN"];

  // Authentication check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await loadUserProfile(currentUser.uid);
        initializeSession(currentUser.uid);
        await loadPreviousSessions(currentUser.uid);
      } else {
        router.push("/auth");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showUserMenu]);

  // Load user profile from Firestore
  const loadUserProfile = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const profile = userDoc.data();
        setUserProfile(profile);
        // Set language based on user preference
        if (profile.preferredLanguage) {
          let langCode;
          switch(profile.preferredLanguage) {
            case 'hi':
              langCode = 'hi-IN'; // Hindi - India
              break;
            case 'mr':
              langCode = 'mr-IN'; // Marathi - India
              break;
            default:
              langCode = 'en-IN'; // English - India
          }
          setSelectedLanguage(langCode);
        }
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      setProcessingError("Failed to load user profile.");
    }
  };

  // Initialize session
  const initializeSession = (userId) => {
    const newSessionId =
      "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);
    setSessionId(newSessionId);
  };

  // Load previous sessions from Firebase
  const loadPreviousSessions = async (userId) => {
    try {
      const sessionsQuery = query(
        collection(db, "user_sessions"),
        where("userId", "==", userId),
        orderBy("timestamp", "desc"),
        limit(5)
      );

      const querySnapshot = await getDocs(sessionsQuery);
      const sessions = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        sessions.push({ 
          id: doc.id, 
          ...data,
          // Handle different timestamp formats
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(data.timestamp)
        });
      });

      setPreviousSessions(sessions);
    } catch (error) {
      console.error("Error loading previous sessions:", error);
    }
  };

  // Initialize speech recognition with proper error handling
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLanguage;

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(prev => prev + ' ' + finalTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setProcessingError('Microphone access denied. Please allow microphone access and try again.');
        } else if (event.error === 'no-speech') {
          setProcessingError('No speech detected. Please try speaking again.');
        } else {
          setProcessingError(`Speech recognition error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setProcessingError('Speech recognition is not supported in this browser.');
    }

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [selectedLanguage]);

  // Save session to Firebase with proper error handling
  const saveSession = async (sessionData) => {
    if (!user) return;

    try {
      setIsSaving(true);
      setProcessingError(null);

      const sessionDoc = {
        sessionId: sessionId,
        userId: user.uid,
        userEmail: user.email,
        userName: userProfile?.name || user.displayName || 'Unknown User',
        timestamp: Timestamp.now(), // Use Firestore Timestamp
        language: selectedLanguage,
        transcript: transcript,
        userProfile: extractedProfile,
        matchedBenefits: matchedBenefits.map((benefit) => ({
          id: benefit.id,
          name: benefit.name,
          nameEn: benefit.nameEn,
          category: benefit.category,
          amount: benefit.amount,
        })),
        benefitCount: matchedBenefits.length,
        location: userProfile?.address ? 
          `${userProfile.address.city}, ${userProfile.address.state}` : 
          'Not specified',
        ...sessionData,
      };

      await addDoc(collection(db, "user_sessions"), sessionDoc);

      setSaveMessage("सत्र सुरक्षित हो गया | Session saved successfully");
      await loadPreviousSessions(user.uid);

      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error("Error saving session:", error);
      setSaveMessage("सत्र सुरक्षित करने में त्रुटि | Error saving session");
      setTimeout(() => setSaveMessage(""), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  // Update session with benefit interaction
  const trackBenefitInteraction = async (benefitId, action) => {
    if (!user || !sessionId) return;

    try {
      const interactionData = {
        benefitId: benefitId,
        action: action,
        timestamp: Timestamp.now()
      };

      await addDoc(collection(db, "benefit_interactions"), {
        sessionId: sessionId,
        userId: user.uid,
        userEmail: user.email,
        ...interactionData,
      });
    } catch (error) {
      console.error("Error tracking interaction:", error);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setProcessingError(null);
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        setIsListening(false);
        setProcessingError('Failed to start speech recognition.');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      setIsListening(false);
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
  };

  const processTranscript = async () => {
    if (!transcript.trim()) {
      setProcessingError('Please provide some input before processing.');
      return;
    }

    setIsProcessing(true);
    setProcessingError(null);

    try {
      // Try to use AI matching service if available
      let aiResult = null;
      try {
        if (aiMatchingService && typeof aiMatchingService.matchBenefits === 'function') {
          aiResult = await aiMatchingService.matchBenefits(transcript, userProfile);
          setAiResults(aiResult);
        }
      } catch (aiError) {
        console.warn('AI service failed, falling back to keyword matching:', aiError);
      }

      // Fallback to keyword matching
      const keywords = transcript.toLowerCase().split(" ");
      const matches = benefitSchemes.filter((scheme) =>
        scheme.eligibility.keywords.some((eligibility) =>
          keywords.some(
            (keyword) =>
              keyword.includes(eligibility) || eligibility.includes(keyword)
          )
        )
      );

      // Use AI results if available, otherwise use keyword matching
      const finalMatches = aiResult?.matchedBenefits?.length > 0 ? 
        aiResult.matchedBenefits : matches;

      // Extract user profile information enhanced with stored profile
      const profile = {
        hasChildren: keywords.some((k) =>
          ["बच्चे", "children", "school", "student", "बच्चा"].includes(k)
        ),
        isFarmer: keywords.some((k) =>
          ["किसान", "farmer", "agriculture", "खेती", "फसल"].includes(k)
        ),
        needsHousing: keywords.some((k) =>
          ["घर", "house", "home", "shelter", "मकान"].includes(k)
        ),
        needsHealthcare: keywords.some((k) =>
          ["बीमार", "sick", "hospital", "treatment", "इलाज"].includes(k)
        ),
        isWomen: keywords.some((k) =>
          ["महिला", "woman", "female", "औरत"].includes(k)
        ),
        location: userProfile?.address?.city || "Not specified",
        state: userProfile?.address?.state || "Not specified",
        registeredAddress: userProfile?.address
          ? `${userProfile.address.street || ''}, ${userProfile.address.city}, ${userProfile.address.state} - ${userProfile.address.pincode}`
          : "Not available",
      };

      setExtractedProfile(profile);
      setMatchedBenefits(finalMatches);

      // Auto-save session after successful processing
      if (finalMatches.length > 0) {
        await saveSession({
          searchType: 'voice_search',
          processingTime: 2000,
          keywords: keywords.slice(0, 10),
          aiUsed: !!aiResult?.success
        });
      }

    } catch (error) {
      console.error('Error processing transcript:', error);
      setProcessingError('Failed to process your input. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const loadPreviousSession = (session) => {
    try {
      setTranscript(session.transcript || "");
      setSelectedLanguage(session.language || "en-IN");
      setExtractedProfile(session.userProfile);
      setMatchedBenefits(session.matchedBenefits || []);
      setSessionId(session.sessionId);

      setSaveMessage("पिछला सत्र लोड हो गया | Previous session loaded");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error('Error loading previous session:', error);
      setProcessingError('Failed to load previous session.');
    }
  };

  const clearAll = () => {
    setTranscript("");
    setMatchedBenefits([]);
    setExtractedProfile(null);
    setAiResults(null);
    setProcessingError(null);
    const newSessionId =
      "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);
    setSessionId(newSessionId);
  };

  const speakText = (text, benefitId = null) => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel(); // Stop any ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = selectedLanguage;
        utterance.rate = 0.8; // Slightly slower for better comprehension
        utterance.onerror = (error) => {
          console.error('Speech synthesis error:', error);
        };
        window.speechSynthesis.speak(utterance);
        
        if (benefitId) {
          trackBenefitInteraction(benefitId, 'listened');
        }
      } catch (error) {
        console.error('Error with text-to-speech:', error);
      }
    } else {
      setProcessingError('Text-to-speech is not supported in this browser.');
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      router.push("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
      setProcessingError('Failed to sign out. Please try again.');
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Recent session';
    
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Recent session';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading... लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center md:justify-start">
              <span className="bg-blue-600 text-white rounded-lg px-3 py-1 mr-2">🏛️</span>
              <span>Sahara - सहारा</span>
            </h1>
            <p className="text-md text-gray-600">{t.yourVoiceYourRights}</p>
          </div>

          {/* Enhanced User Menu */}
          <div className="relative user-menu-container">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition-all border border-gray-200"
            >
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:inline">
                {userProfile?.name || user?.displayName || "User"}
              </span>
              <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-10 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <p className="text-sm font-medium text-gray-700">{userProfile?.name || user?.email}</p>
                  <p className="text-xs text-gray-500 mt-1">User ID: {user?.uid?.slice(-8)}</p>
                </div>
                <div className="divide-y divide-gray-200">
                  <button
                    onClick={() => setShowUserMenu(false)}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <Settings className="h-4 w-4 mr-3 text-gray-500" />
                    {t.profile}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-3 text-red-500" />
                    {t.logout}
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* User Profile Card - Enhanced */}
        {userProfile && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              {t.welcome}, {userProfile.name}! 👋
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 mb-1">📧 Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 mb-1">📱 Phone</p>
                <p className="font-medium">{userProfile.phone || "Not provided"}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-500 mb-1">📍 Location</p>
                <p className="font-medium">{userProfile.address?.city || 'Not specified'}, {userProfile.address?.state || 'Not specified'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Save Message - Enhanced */}
        {saveMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            {saveMessage}
          </div>
        )}

        {/* Processing Error */}
        {processingError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                {processingError}
              </div>
              <button
                onClick={() => setProcessingError(null)}
                className="text-red-700 hover:text-red-900"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* AI Results Summary */}
        {aiResults && aiResults.success && (
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Brain className="mr-2 text-purple-600" />
              AI Analysis Results | AI विश्लेषण परिणाम
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                <span>
                  <strong>Confidence:</strong> {Math.round((aiResults.confidenceScore || 0) * 100)}%
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                <span>
                  <strong>Schemes Found:</strong> {aiResults.matchedBenefits?.length || 0}
                </span>
              </div>
              <div className="flex items-center">
                <Brain className="mr-2 h-4 w-4 text-blue-500" />
                <span>
                  <strong>Processing:</strong> {aiResults.metadata?.processingTime || 0}ms
                </span>
              </div>
            </div>
            {aiResults.recommendations && (
              <div className="mt-3 p-3 bg-white rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>💡 AI Recommendations:</strong> {aiResults.recommendations}
                </p>
              </div>
            )}
            {aiResults.metadata?.fallbackUsed && (
              <div className="mt-2 text-xs text-orange-600">
                ⚠️ Fallback matching used due to AI service limitations
              </div>
            )}
          </div>
        )}

        {/* Previous Sessions - Enhanced */}
        {previousSessions.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <History className="h-5 w-5 text-purple-600" />
              </div>
              {t.previousSessions}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {previousSessions.map((session) => (
                <div
                  key={session.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-all bg-gray-50 hover:bg-white"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatTimestamp(session.timestamp)}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {session.benefitCount || 0} benefits
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {session.language}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{session.location || 'Location not specified'}</p>
                    </div>
                    <button
                      onClick={() => loadPreviousSession(session)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Load
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Language Selection */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
            <div className="bg-yellow-100 p-2 rounded-full mr-3">
              <Volume2 className="h-5 w-5 text-yellow-600" />
            </div>
            {t.chooseLanguage}
          </h2>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`px-4 py-2 rounded-lg transition-all flex items-center ${
                  selectedLanguage === lang.code
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Input Section - Enhanced */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <Mic className="h-5 w-5 text-red-600" />
            </div>
            {t.tellSituation}
          </h2>

          <div className="flex flex-col items-center mb-6">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`w-24 h-24 rounded-full transition-all transform hover:scale-105 flex items-center justify-center shadow-lg ${
                isListening
                  ? "bg-red-500 hover:bg-red-600 animate-pulse ring-4 ring-red-200"
                  : "bg-blue-600 hover:bg-blue-700 ring-4 ring-blue-200"
              } text-white`}
            >
              {isListening ? (
                <MicOff size={36} className="animate-pulse" />
              ) : (
                <Mic size={36} />
              )}
            </button>
            <p className="mt-4 text-sm text-gray-600 text-center max-w-md">
              {isListening ? (
                <span className="flex items-center justify-center">
                  <span className="animate-pulse mr-2">●</span> {t.listening}
                </span>
              ) : (
                t.clickToSpeak
              )}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 min-h-[120px] border border-gray-200">
            {transcript ? (
              <p className="text-gray-700 whitespace-pre-wrap">{transcript}</p>
            ) : (
              <p className="text-gray-400 italic">{t.textWillAppear}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button
              onClick={processTranscript}
              disabled={!transcript.trim() || isProcessing}
              className={`flex-1 md:flex-none px-6 py-3 rounded-lg transition-colors flex items-center justify-center min-w-[200px] ${
                !transcript.trim() || isProcessing
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.processing}
                </>
              ) : (
                <>
                  <Heart className="h-5 w-5 mr-2" />
                  {t.findBenefits}
                </>
              )}
            </button>
            <button
              onClick={() => saveSession({ searchType: "manual_save" })}
              disabled={!transcript.trim() || isSaving}
              className={`px-6 py-3 rounded-lg transition-colors flex items-center ${
                !transcript.trim() || isSaving
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <Save className="h-5 w-5 mr-2" />
              {isSaving ? t.saving : t.save}
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t.clear}
            </button>
          </div>
        </div>

        {/* User Profile Summary - Enhanced */}
        {extractedProfile && (
          <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-800">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              {t.yourProfile}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-500 mb-1">👨‍👩‍👧‍👦 Children</p>
                <p className="font-medium">
                  {extractedProfile.hasChildren ? "हाँ | Yes" : "नहीं | No"}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-500 mb-1">🌾 Farmer</p>
                <p className="font-medium">
                  {extractedProfile.isFarmer ? "हाँ | Yes" : "नहीं | No"}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-500 mb-1">🏠 Housing</p>
                <p className="font-medium">
                  {extractedProfile.needsHousing ? "चाहिए | Needed" : "नहीं | No"}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-500 mb-1">🏥 Healthcare</p>
                <p className="font-medium">
                  {extractedProfile.needsHealthcare ? "चाहिए | Needed" : "नहीं | No"}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-500 mb-1">👩 Women</p>
                <p className="font-medium">
                  {extractedProfile.isWomen ? "हाँ | Yes" : "नहीं | No"}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-500 mb-1">📍 Location</p>
                <p className="font-medium">{extractedProfile.location}</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-500 mb-1">📋 State</p>
                <p className="font-medium">{extractedProfile.state}</p>
              </div>
            </div>
            {extractedProfile.registeredAddress !== "Not available" && (
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="text-sm text-gray-500 mb-1">📝 Registered Address</p>
                <p className="font-medium">{extractedProfile.registeredAddress}</p>
              </div>
            )}
          </div>
        )}

        {/* Matched Benefits - Enhanced */}
        {matchedBenefits.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-800">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <Heart className="h-5 w-5 text-red-600" />
              </div>
              {t.benefitsForYou} <span className="ml-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{matchedBenefits.length}</span>
            </h3>

            <div className="grid gap-6">
              {matchedBenefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="border rounded-xl p-5 hover:shadow-md transition-shadow bg-gradient-to-r from-gray-50 to-white"
                >
                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-shrink-0">
                      <div className="bg-blue-100 p-4 rounded-lg text-3xl w-16 h-16 flex items-center justify-center">
                        {benefit.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                        <div>
                          <h4 className="font-semibold text-lg text-gray-900">{benefit.name}</h4>
                          <p className="text-sm text-gray-600">{benefit.nameEn}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium self-start md:self-center">
                          💰 {benefit.amount}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{benefit.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          📋 {benefit.level}
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                          🏇 {benefit.category}
                        </span>
                        {benefit.tags?.map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-2 self-start">
                      <button
                        onClick={() => {
                          speakText(
                            benefit.name + ". " + benefit.description,
                            benefit.id
                          );
                        }}
                        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg flex items-center justify-center"
                        title="सुनें | Listen"
                      >
                        <Volume2 size={18} />
                      </button>
                      <button
                        onClick={() =>
                          trackBenefitInteraction(benefit.id, "details_clicked")
                        }
                        className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg flex items-center justify-center"
                        title="विवरण | Details"
                      >
                        <FileText size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">{t.nextStep}</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      इन योजनाओं के लिए आवेदन करने हेतु हमारे "कागज़ी कार्य सहायक" का उपयोग करें।
                      <br />
                      Use our "Paperwork Assistant" to apply for these schemes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Instructions */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold mb-4 text-lg text-gray-800">कैसे उपयोग करें | How to Use</h3>
          <ol className="space-y-3">
            {[
              "अपनी भाषा चुनें | Choose your language",
              "माइक बटन दबाएं और अपनी स्थिति बताएं | Press mic and describe your situation",
              'उदाहरण: "मैं एक किसान हूँ, मेरे दो बच्चे हैं, मुझे घर चाहिए" | Example: "I am a farmer with two children, I need a house"',
              '"योजनाएं खोजें" बटन दबाएं | Press "Find Benefits" button',
              "अपने लिए उपलब्ध योजनाएं देखें | View available schemes for you",
              "सत्र सुरक्षित करें भविष्य में उपयोग के लिए | Save session for future reference"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center mr-3 text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ol>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">🔒 सुरक्षा | Security</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    आपका डेटा सुरक्षित है और केवल आप ही इसे देख सकते हैं।
                    <br />
                    Your data is secure and only visible to you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600 space-y-2">
            <p className="font-medium">🏛️ Sahara - आपके अधिकारों का साथी | Your Rights Companion</p>
            <p className="text-xs">Logged in as: {userProfile?.name || user?.email}</p>
            <p className="text-xs opacity-70">Session: {sessionId?.slice(-8)}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}