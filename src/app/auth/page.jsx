"use client";

import { useState, useEffect } from "react";
import {
  User,
  Phone,
  MapPin,
  Globe,
  Eye,
  EyeOff,
  UserPlus,
  LogIn,
  Home,
  ChevronDown,
} from "lucide-react";
import { auth, db } from "../../lib/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { languages } from "@/lib/languages";
import { translations } from "@/lib/translations/auth";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [usePhoneAuth, setUsePhoneAuth] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    preferredLanguage: "",
  });

  const [otp, setOtp] = useState("");

  const t = translations[selectedLanguage];

  // Initialize reCAPTCHA for phone auth
  useEffect(() => {
    if (usePhoneAuth && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA verified");
          },
        }
      );
    }
  }, [usePhoneAuth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const showMessage = (msg, type = "info") => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 5000);
  };

  // Save user profile to Firestore
  const saveUserProfile = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name: formData.name,
        email: user.email,
        phone: formData.phone,
        address: formData.address,
        preferredLanguage: selectedLanguage,
        createdAt: new Date(),
        lastLogin: new Date(),
      });
    } catch (error) {
      console.error("Error saving user profile:", error);
    }
  };

  // Email/Password Registration
  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      await saveUserProfile(userCredential.user);

      showMessage(
        "खाता सफलतापूर्वक बना दिया गया! | Account created successfully!",
        "success"
      );
    } catch (error) {
      showMessage(getErrorMessage(error), "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Email/Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update last login and language
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, { lastLogin: new Date(), preferredLanguage: selectedLanguage }, { merge: true });

      showMessage(
        "सफलतापूर्वक लॉगिन हो गए! | Successfully logged in!",
        "success"
      );
    } catch (error) {
      showMessage(getErrorMessage(error), "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Phone Authentication - Send OTP
  const handlePhoneAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const phoneNumber = "+91" + formData.phone.replace(/\D/g, "");
      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      setShowOtpInput(true);

      showMessage("OTP भेजा गया! | OTP sent!", "success");
    } catch (error) {
      showMessage(getErrorMessage(error), "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
      const userCredential = await auth.signInWithCredential(credential);

      // Check if user profile exists, if not in registration mode, create it
      const userRef = doc(db, "users", userCredential.user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists() && !isLogin) {
        await saveUserProfile(userCredential.user);
      } else if (userDoc.exists()) {
        await setDoc(userRef, { lastLogin: new Date() }, { merge: true });
      }

      showMessage("सफलतापूर्वक सत्यापित! | Successfully verified!", "success");
    } catch (error) {
      showMessage("गलत OTP | Invalid OTP", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "यह ईमेल पहले से प्रयोग में है | Email already in use";
      case "auth/weak-password":
        return "कमजोर पासवर्ड | Weak password";
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "गलत ईमेल या पासवर्ड | Wrong email or password";
      case "auth/invalid-phone-number":
        return "गलत फोन नंबर | Invalid phone number";
      case "auth/too-many-requests":
        return "बहुत सारे प्रयास, कुछ देर बाद कोशिश करें | Too many attempts, try later";
      default:
        return error.message;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 flex items-center justify-center p-4 md:p-6">
      <div className="max-w-md w-full">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            <span className="bg-blue-600 text-white rounded-lg px-3 py-1 inline-block">🏛️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h1>
          <p className="text-gray-600 text-lg">{t.subtitle}</p>
        </div>

        {/* Enhanced Language Selection */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex items-center mb-3">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <span className="font-medium text-gray-800">{t.language}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`px-3 py-2 rounded-lg transition-all flex items-center text-sm ${
                  selectedLanguage === lang.code
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          {/* Enhanced Toggle Login/Register */}
          <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-200">
            <button
              onClick={() => {
                setIsLogin(true);
                setUsePhoneAuth(false);
                setShowOtpInput(false);
              }}
              className={`flex-1 py-3 px-4 transition-all flex items-center justify-center ${
                isLogin
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <LogIn className="mr-2 h-5 w-5" />
              {t.login}
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setUsePhoneAuth(false);
                setShowOtpInput(false);
              }}
              className={`flex-1 py-3 px-4 transition-all flex items-center justify-center ${
                !isLogin
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <UserPlus className="mr-2 h-5 w-5" />
              {t.register}
            </button>
          </div>

          {/* Enhanced Auth Method Toggle */}
          <div className="mb-6">
            <button
              onClick={() => {
                setUsePhoneAuth(!usePhoneAuth);
                setShowOtpInput(false);
              }}
              className="w-full py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center"
            >
              {usePhoneAuth ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {t.emailAuth}
                </>
              ) : (
                <>
                  <Phone className="h-4 w-4 mr-2" />
                  {t.phoneAuth}
                </>
              )}
            </button>
          </div>

          {/* Enhanced Message Display */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg text-sm flex items-start ${
                message.includes("success") || message.includes("सफल")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              <div className={`flex-shrink-0 h-5 w-5 ${message.includes("success") || message.includes("सफल") ? "text-green-500" : "text-red-500"}`}>
                {message.includes("success") || message.includes("सफल") ? (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">{message}</div>
            </div>
          )}

          {/* Phone Auth Form - Enhanced */}
          {usePhoneAuth ? (
            <form
              onSubmit={showOtpInput ? handleOtpVerification : handlePhoneAuth}
              className="space-y-4"
            >
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      {t.name}
                    </div>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                      <Phone className="h-4 w-4 text-blue-600" />
                    </div>
                    {t.phone}
                  </div>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="9876543210"
                    maxLength="10"
                    required
                  />
                </div>
              </div>

              {/* Address fields for registration */}
              {!isLogin && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                          <Home className="h-4 w-4 text-blue-600" />
                        </div>
                        {t.street}
                      </div>
                    </label>
                    <input
                      type="text"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required={!isLogin}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.city}
                      </label>
                      <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required={!isLogin}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.state}
                      </label>
                      <input
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required={!isLogin}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                          <MapPin className="h-4 w-4 text-blue-600" />
                        </div>
                        {t.pincode}
                      </div>
                    </label>
                    <input
                      type="text"
                      name="address.pincode"
                      value={formData.address.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      maxLength="6"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* OTP Input */}
              {showOtpInput && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.enterOtp}
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    maxLength="6"
                    placeholder="123456"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-center ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : showOtpInput ? (
                  t.verifyOtp
                ) : (
                  t.sendOtp
                )}
              </button>
            </form>
          ) : (
            /* Email Auth Form - Enhanced */
            <form onSubmit={isLogin ? handleEmailLogin : handleEmailRegister} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      {t.name}
                    </div>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                      <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    {t.email}
                  </div>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                        <Phone className="h-4 w-4 text-blue-600" />
                      </div>
                      {t.phone}
                    </div>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="9876543210"
                      maxLength="10"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                      <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {t.password}
                  </div>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Address fields for registration */}
              {!isLogin && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                          <Home className="h-4 w-4 text-blue-600" />
                        </div>
                        {t.street}
                      </div>
                    </label>
                    <input
                      type="text"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required={!isLogin}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.city}
                      </label>
                      <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required={!isLogin}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.state}
                      </label>
                      <input
                        type="text"
                        name="address.state"
                        value={formData.address.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required={!isLogin}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-1.5 rounded-full mr-2">
                          <MapPin className="h-4 w-4 text-blue-600" />
                        </div>
                        {t.pincode}
                      </div>
                    </label>
                    <input
                      type="text"
                      name="address.pincode"
                      value={formData.address.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      maxLength="6"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-center ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : isLogin ? (
                  t.loginBtn
                ) : (
                  t.registerBtn
                )}
              </button>
            </form>
          )}

          {/* reCAPTCHA container (invisible) */}
          <div id="recaptcha-container"></div>

          {/* Enhanced Switch Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setUsePhoneAuth(false);
                setShowOtpInput(false);
                setMessage("");
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center mx-auto"
            >
              {isLogin ? t.switchToRegister : t.switchToLogin}
              <ChevronDown className="h-4 w-4 ml-1 transform rotate-90" />
            </button>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p className="font-medium">🏛️ Sahara - आपके अधिकारों का साथी</p>
          <p className="text-gray-500">Your Rights, Our Mission</p>
        </div>
      </div>
    </div>
  );
}