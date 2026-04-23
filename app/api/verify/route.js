import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Google Generative AI API key is missing. Please add GOOGLE_GENERATIVE_AI_API_KEY to your .env.local file." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Initialize the model with the exact System Instruction requested
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      systemInstruction: 'You are the Syntry Forensic Land Analyst. Analyze GPS coordinates, documents, and Title IDs. Cross-reference coordinates against Stool Land boundaries (Nii Ashalley Annang Family) and identify red flags like double mapping or missing stamps. Return a strict JSON object with: verification_score (0-100), owner_details (current_legal_holder, root_of_title), transaction_history (array of events), geospatial_feedback (lat_long_match, boundary_conflict), and grid_status (stool_land_auth, lands_commission, litigation_check).'
    });

    // Parse the incoming request payload
    let body;
    try {
        body = await request.json();
    } catch (e) {
        return NextResponse.json({ error: "Invalid JSON body provided." }, { status: 400 });
    }

    const { documentData, coordinates, titleNumber } = body;

    const prompt = `Please perform a forensic analysis on the following asset data:
- Coordinates: ${coordinates ? JSON.stringify(coordinates) : 'Not provided'}
- Title Number: ${titleNumber || 'Not provided'}
- Document Data: ${documentData ? JSON.stringify(documentData) : 'Not provided'}

Ensure the output is exclusively the strict JSON object as requested in the system instructions.`;

    // Force the model to output strict JSON
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const responseText = result.response.text();
    
    // Parse to ensure it is clean JSON before sending back to the client
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch (parseError) {
      // Fallback cleanup if the model accidentally wraps it in markdown ticks
      const cleanJson = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanJson);
    }

    return NextResponse.json(parsedData, { status: 200 });

  } catch (error) {
    console.error("[Syntry Oracle Error]:", error);
    return NextResponse.json(
      { error: "Oracle forensic verification failed due to an internal error.", details: error.message },
      { status: 500 }
    );
  }
}
