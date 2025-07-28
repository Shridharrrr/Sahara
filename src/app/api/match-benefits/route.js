import { NextResponse } from "next/server";
import { benefitSchemes } from "@/lib/benefitSchemes";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY = process.env.GEMINI_API_KEY;

async function matchBenefitsWithAI(transcript, userProfile, language = "en") {
  try {
    const systemPrompt = `You are an AI assistant for Sahara, a social welfare benefits platform in India. Your job is to analyze user situations and match them with appropriate government schemes.

User Profile Context:
- Name: ${userProfile?.name || "Not provided"}
- Location: ${userProfile?.address?.city || "Not specified"}, ${
      userProfile?.address?.state || "Not specified"
    }
- Phone: ${userProfile?.phone || "Not provided"}
- Preferred Language: ${language}

Available Schemes: ${JSON.stringify(benefitSchemes, null, 2)}

Analyze the user's transcript and extract:
1. Demographics (age, gender, location, family size)
2. Occupation and employment status
3. Income level indicators  
4. Specific needs mentioned (housing, healthcare, education, etc.)
5. Family composition (children, elderly, etc.)
6. Asset ownership (land, house, bank account)

Then match them with the most relevant schemes based on:
- Eligibility criteria match
- Keyword relevance
- Demographic fit
- Need alignment
- Geographic applicability

Respond with a JSON object containing:
{
  "extractedProfile": {
    "demographics": {...},
    "occupation": "...",
    "estimatedIncome": "...",
    "needs": [...],
    "familyComposition": {...},
    "assets": {...}
  },
  "matchedSchemes": [
    {
      "schemeId": "...",
      "matchScore": 0.95,
      "matchReasons": [...],
      "eligibilityStatus": "eligible/likely_eligible/needs_verification",
      "requiredDocuments": [...],
      "nextSteps": "..."
    }
  ],
  "recommendations": "...",
  "confidenceScore": 0.85
}

Prioritize schemes with higher match scores and eligibility likelihood. Respond ONLY with valid JSON. Do not include any markdown formatting or additional text.`;

    const userPrompt = `User Transcript (${language}): "${transcript}"

Please analyze this and provide benefit matching as specified. Respond ONLY with valid JSON.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: systemPrompt }, { text: userPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2000,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const responseText = data.candidates[0].content.parts[0].text;

    // Clean the response (remove any potential markdown formatting)
    const cleanText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const aiResponse = JSON.parse(cleanText);

    // Enhance the response with full scheme details
    const enhancedMatches = aiResponse.matchedSchemes.map((match) => {
      const scheme = benefitSchemes.find((s) => s.id === match.schemeId);
      return {
        ...scheme,
        matchScore: match.matchScore,
        matchReasons: match.matchReasons,
        eligibilityStatus: match.eligibilityStatus,
        requiredDocuments: match.requiredDocuments,
        nextSteps: match.nextSteps,
      };
    });

    return {
      success: true,
      extractedProfile: aiResponse.extractedProfile,
      matchedBenefits: enhancedMatches,
      recommendations: aiResponse.recommendations,
      confidenceScore: aiResponse.confidenceScore,
      processingTime: Date.now(),
    };
  } catch (error) {
    console.error("AI matching error:", error);
    return fallbackMatching(transcript, userProfile);
  }
}

// Fallback rule-based matching
function fallbackMatching(transcript, userProfile) {
  const keywords = transcript.toLowerCase().split(" ");
  const matches = [];

  benefitSchemes.forEach((scheme) => {
    let score = 0;
    const matchReasons = [];

    // Keyword matching
    scheme.eligibility.keywords.forEach((keyword) => {
      if (keywords.some((k) => k.includes(keyword) || keyword.includes(k))) {
        score += 0.3;
        matchReasons.push(`Keyword match: ${keyword}`);
      }
    });

    if (
      keywords.some((k) =>
        [
          "farmer",
          "किसान",
          "शेतकरी",
          "agriculture",
          "farming",
          "खेती",
          "शेती",
        ].includes(k)
      ) &&
      scheme.category === "Agriculture"
    ) {
      score += 0.4;
      matchReasons.push("Occupation match");
    }

    if (
      keywords.some((k) =>
        [
          "house",
          "घर",
          "home",
          "गृह",
          "household",
          "मकान",
          "वास्तु",
          "निवास",
        ].includes(k)
      ) &&
      scheme.category === "Housing"
    ) {
      score += 0.4;
      matchReasons.push("Housing need identified");
    }

    if (
      keywords.some((k) =>
        [
          "health",
          "medical",
          "स्वास्थ्य",
          "आरोग्य",
          "hospital",
          "दवा",
          "औषध",
          "उपचार",
          "डॉक्टर",
          "वैद्य",
        ].includes(k)
      ) &&
      scheme.category === "Healthcare"
    ) {
      score += 0.4;
      matchReasons.push("Healthcare need identified");
    }

    if (
      keywords.some((k) =>
        [
          "education",
          "school",
          "शिक्षा",
          "शाळा",
          "विद्यालय",
          "college",
          "महाविद्यालय",
          "शिकणे",
          "अभ्यास",
          "तुती",
        ].includes(k)
      ) &&
      scheme.category === "Education"
    ) {
      score += 0.4;
      matchReasons.push("Education need identified");
    }

    if (
      keywords.some((k) =>
        [
          "woman",
          "women",
          "स्त्री",
          "महिला",
          "बाई",
          "girl",
          "मुलगी",
          "बालिका",
          "माता",
          "mother",
        ].includes(k)
      ) &&
      scheme.category === "Women Welfare"
    ) {
      score += 0.4;
      matchReasons.push("Women-specific need identified");
    }

    if (
      keywords.some((k) =>
        [
          "disabled",
          "divyang",
          "दिव्यांग",
          "अपंग",
          "handicap",
          "disabled",
          "विकलांग",
          "खंडित",
        ].includes(k)
      ) &&
      scheme.category === "Disability"
    ) {
      score += 0.4;
      matchReasons.push("Disability need identified");
    }

    if (
      keywords.some((k) =>
        [
          "student",
          "विद्यार्थी",
          "तुती",
          "परीक्षा",
          "exam",
          "शिष्यवृत्ती",
          "scholarship",
        ].includes(k)
      ) &&
      scheme.category === "Education"
    ) {
      score += 0.4;
      matchReasons.push("Student need identified");
    }

    if (
      keywords.some((k) =>
        [
          "business",
          "enterprise",
          "व्यवसाय",
          "उद्योग",
          "दुकान",
          "shop",
          "employ",
          "रोजगार",
          "नोकरी",
          "काम",
        ].includes(k)
      ) &&
      scheme.category === "Employment"
    ) {
      score += 0.4;
      matchReasons.push("Employment/Business need identified");
    }

    if (
      keywords.some((k) =>
        [
          "pension",
          "वृद्ध",
          "मदत",
          "पेन्शन",
          "वयोवृद्ध",
          "senior citizen",
          "निवृत्त",
          "retired",
        ].includes(k)
      ) &&
      scheme.category === "Pension"
    ) {
      score += 0.4;
      matchReasons.push("Pension need identified");
    }

    if (
      keywords.some((k) =>
        [
          "loan",
          "credit",
          "कर्ज",
          "उधार",
          "ऋण",
          "finance",
          "वित्त",
          "पैसे",
          "money",
        ].includes(k)
      ) &&
      scheme.category === "Financial Assistance"
    ) {
      score += 0.4;
      matchReasons.push("Financial need identified");
    }

    if (score > 0.3) {
      matches.push({
        ...scheme,
        matchScore: Math.min(score, 1),
        matchReasons,
        eligibilityStatus:
          score > 0.7 ? "likely_eligible" : "needs_verification",
      });
    }
  });

  // Sort by match score
  matches.sort((a, b) => b.matchScore - a.matchScore);

  return {
    success: true,
    extractedProfile: {
      demographics: { source: "fallback_matching" },
      needs: keywords.filter((k) =>
        ["house", "health", "education", "job"].includes(k)
      ),
    },
    matchedBenefits: matches.slice(0, 10),
    recommendations:
      "Matches found using keyword analysis. For better results, please provide more details.",
    confidenceScore: 0.6,
    processingTime: Date.now(),
    fallbackUsed: true,
  };
}

// Main API route handler (unchanged)
export async function POST(request) {
  try {
    const { transcript, userProfile, language, sessionId } =
      await request.json();

    if (!transcript || transcript.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Transcript too short. Please provide more details about your situation.",
          errorCode: "INSUFFICIENT_INPUT",
        },
        { status: 400 }
      );
    }

    console.log(`Processing benefit matching for session: ${sessionId}`);
    console.log(
      `User location: ${userProfile?.address?.city}, ${userProfile?.address?.state}`
    );
    console.log(`Transcript length: ${transcript.length} characters`);

    const startTime = Date.now();
    const result = await matchBenefitsWithAI(transcript, userProfile, language);
    const processingTime = Date.now() - startTime;

    console.log(`AI matching completed in ${processingTime}ms`);
    console.log(
      `Found ${result.matchedBenefits?.length || 0} matching benefits`
    );
    console.log(`Confidence score: ${result.confidenceScore}`);

    result.metadata = {
      processingTime,
      timestamp: new Date().toISOString(),
      version: "1.0",
      fallbackUsed: result.fallbackUsed || false,
      aiModel: "gemini-2.0-flash",
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again.",
        errorCode: "PROCESSING_ERROR",
      },
      { status: 500 }
    );
  }
}

// GET endpoint for health check
export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "AI Benefit Matching Service",
    version: "1.0",
    availableSchemes: benefitSchemes.length,
    timestamp: new Date().toISOString(),
    aiProvider: "Google Gemini",
    aiModel: "gemini-2.0-flash",
  });
}
