import { benefitSchemes } from "./benefitSchemes";

export class AIMatchingService {
  constructor() {
    this.baseUrl = '/api/match-benefits';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Generate cache key
  generateCacheKey(transcript, userProfile) {
    const profileKey = userProfile ? 
      `${userProfile.address?.city}_${userProfile.address?.state}_${userProfile.name}` : 
      'anonymous';
    return `${transcript.slice(0, 50)}_${profileKey}`.replace(/\s+/g, '_');
  }

  // Check if cache entry is valid
  isCacheValid(entry) {
    return entry && (Date.now() - entry.timestamp) < this.cacheTimeout;
  }

  // Main benefit matching function
  async matchBenefits(transcript, userProfile, language = 'en', sessionId = null) {
    try {
      // Check cache first
      const cacheKey = this.generateCacheKey(transcript, userProfile);
      const cachedResult = this.cache.get(cacheKey);
      
      if (this.isCacheValid(cachedResult)) {
        console.log('Returning cached result');
        return {
          ...cachedResult.data,
          fromCache: true
        };
      }

      // Prepare request data
      const requestData = {
        transcript: transcript.trim(),
        userProfile: userProfile || {},
        language,
        sessionId: sessionId || this.generateSessionId(),
        timestamp: new Date().toISOString()
      };

      console.log('Calling AI matching API...');
      const startTime = Date.now();

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const processingTime = Date.now() - startTime;

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const result = await response.json();
      
      // Cache the result
      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });

      // Add client-side metadata
      result.clientMetadata = {
        requestTime: processingTime,
        cached: false,
        timestamp: new Date().toISOString()
      };

      console.log(`AI matching completed in ${processingTime}ms`);
      return result;

    } catch (error) {
      console.error('AI Matching Service Error:', error);
      
      // Return fallback response
      return {
        success: false,
        error: error.message,
        fallbackMatches: this.getFallbackMatches(transcript),
        recommendations: 'AI service temporarily unavailable. Showing basic matches.',
        confidenceScore: 0.3
      };
    }
  }

  // Simple fallback matching for offline/error scenarios
  getFallbackMatches(transcript) {
    const keywords = transcript.toLowerCase();
    const fallbackSchemes = benefitSchemes;

    return fallbackSchemes.filter(scheme => scheme.matchScore > 0.5);
  }

  // Generate session ID
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
  }

  // Get service health
  async getServiceHealth() {
    try {
      const response = await fetch(this.baseUrl, { method: 'GET' });
      return await response.json();
    } catch (error) {
      return { status: 'error', error: error.message };
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }

  // Preprocess transcript for better matching
  preprocessTranscript(transcript, language = 'en') {
    // Basic text cleaning
    let cleaned = transcript.trim();
    
    // Remove common filler words based on language
    const fillerWords = {
      'en': ['um', 'uh', 'like', 'you know', 'actually'],
      'hi': ['अरे', 'यार', 'बस', 'तो'],
      'mr': ['अरे', 'नं', 'बरं']
    };

    const fillers = fillerWords[language] || fillerWords['en'];
    fillers.forEach(filler => {
      cleaned = cleaned.replace(new RegExp(`\\b${filler}\\b`, 'gi'), '');
    });

    // Normalize spaces
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    return cleaned;
  }

  // Batch process multiple transcripts (for testing)
  async batchMatchBenefits(transcripts, userProfile, language = 'en') {
    const results = [];
    
    for (const transcript of transcripts) {
      try {
        const result = await this.matchBenefits(transcript, userProfile, language);
        results.push({ transcript, result });
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        results.push({ transcript, error: error.message });
      }
    }
    
    return results;
  }

  // Analytics helper
  getMatchingStats() {
    return {
      cacheSize: this.cache.size,
      cacheHitRate: this.cacheHits / (this.cacheHits + this.cacheMisses) || 0,
      totalRequests: this.totalRequests || 0
    };
  }
}

// Export singleton instance
export const aiMatchingService = new AIMatchingService();

// Utility functions for UI components
export const formatMatchScore = (score) => {
  if (score >= 0.8) return { text: 'High Match', color: 'green' };
  if (score >= 0.6) return { text: 'Good Match', color: 'blue' };
  if (score >= 0.4) return { text: 'Possible Match', color: 'yellow' };
  return { text: 'Low Match', color: 'red' };
};

export const formatEligibilityStatus = (status) => {
  const statusMap = {
    'eligible': { text: 'Eligible ✅', color: 'green' },
    'likely_eligible': { text: 'Likely Eligible 🟡', color: 'blue' },
    'needs_verification': { text: 'Needs Verification 📋', color: 'yellow' },
    'not_eligible': { text: 'Not Eligible ❌', color: 'red' }
  };
  
  return statusMap[status] || { text: 'Unknown', color: 'gray' };
};

// React hook for AI matching
export const useAIMatching = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const matchBenefits = async (transcript, userProfile, language = 'en', sessionId = null) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      const result = await aiMatchingService.matchBenefits(transcript, userProfile, language, sessionId);
      setResults(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  const clearResults = () => {
    setResults(null);
    setError(null);
  };

  return {
    matchBenefits,
    isProcessing,
    results,
    error,
    clearResults
  };
};