import { NextResponse } from "next/server";
import { benefitSchemes } from "@/lib/benefitSchemes";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY = process.env.GEMINI_API_KEY;

async function matchBenefitsWithAI(transcript, userProfile, language = "en") {
  try {
    // Only send essential scheme details to Gemini (avoid token bloat)
    const minimalSchemes = benefitSchemes.map(({ id, name, eligibility, category, level, amount }) => ({
      id,
      name,
      amount,
      eligibility,
      category,
      level,
    }));

    const systemPrompt = `You are an AI assistant for Sahara, a social welfare benefits platform in India. 
Your job is to analyze user situations and match them with appropriate government schemes.

User Profile Context:
- Name: ${userProfile?.name || "Not provided"}
- Location: ${userProfile?.address?.city || "Not specified"}, ${userProfile?.address?.state || "Not specified"}
- Phone: ${userProfile?.phone || "Not provided"}
- Preferred Language: ${language}

Available Schemes (simplified): ${JSON.stringify(minimalSchemes, null, 2)}

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

Respond ONLY with valid JSON containing:
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
}`;

    const userPrompt = `User Transcript (${language}): "${transcript}"
Please analyze this and provide benefit matching as specified. Respond ONLY with valid JSON.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: systemPrompt }, { text: userPrompt }] },
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

    // Validate AI structure
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!aiText) {
      throw new Error("Unexpected AI response format");
    }

    // Clean AI output
    const cleanText = aiText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Parse JSON safely
    let aiResponse;
    try {
      aiResponse = JSON.parse(cleanText);
    } catch (err) {
      console.error("Failed to parse AI response:", cleanText);
      throw new Error("Invalid AI JSON output");
    }

    // Enhance matched schemes
    const enhancedMatches = (aiResponse.matchedSchemes || []).map((match) => {
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
    };
  } catch (error) {
    console.error("AI matching error:", error);
    return {
      success: false,
      error: "Benefit matching failed. Please try again later.",
      errorCode: "AI_MATCHING_ERROR",
    };
  }
}

// API POST handler
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

    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }

    result.metadata = {
      processingTime,
      timestamp: new Date().toISOString(),
      version: "1.0",
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

// GET health check
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
