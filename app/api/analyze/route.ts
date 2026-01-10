import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Create the prompt for trading analysis
    const prompt = `You are an expert trading analyst specializing in Order Blocks (OB) and Fair Value Gaps (FVG).

Analyze this trading chart image and provide a detailed analysis in the following JSON format:

{
  "summary": "Brief overview of the chart (2-3 sentences)",
  "trend": "BULLISH/BEARISH/SIDEWAYS",
  "orderBlocks": [
    {
      "type": "SUPPLY/DEMAND",
      "priceLevel": "approximate price level",
      "description": "brief description"
    }
  ],
  "fairValueGaps": [
    {
      "type": "BULLISH/BEARISH",
      "priceRange": "approximate price range",
      "description": "brief description"
    }
  ],
  "keyLevels": {
    "support": ["level1", "level2"],
    "resistance": ["level1", "level2"]
  },
  "tradingIdea": {
    "direction": "BUY/SELL",
    "entry": "suggested entry price/zone",
    "stopLoss": "suggested stop loss",
    "takeProfit": ["TP1", "TP2", "TP3"],
    "reasoning": "detailed explanation of the trade setup"
  },
  "confidence": "HIGH/MEDIUM/LOW",
  "risks": ["risk1", "risk2"]
}

Provide ONLY the JSON response, no additional text.`;

    // Use REST API directly with v1
    const apiKey = process.env.GEMINI_API_KEY;
    // Using gemini-2.0-flash - free tier with vision support
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [{
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: image.type,
              data: base64Image
            }
          }
        ]
      }]
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Try to parse JSON from the response
    let analysis;
    try {
      // Remove markdown code blocks if present
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysis = JSON.parse(cleanText);
    } catch (parseError) {
      // If parsing fails, return the raw text
      analysis = {
        summary: text,
        trend: 'UNKNOWN',
        orderBlocks: [],
        fairValueGaps: [],
        keyLevels: { support: [], resistance: [] },
        tradingIdea: {
          direction: 'WAIT',
          entry: 'N/A',
          stopLoss: 'N/A',
          takeProfit: [],
          reasoning: text,
        },
        confidence: 'LOW',
        risks: ['Unable to parse structured analysis'],
      };
    }

    // Add timestamp and ID
    const fullAnalysis = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      imagePreview: `data:${image.type};base64,${base64Image}`,
      ...analysis,
    };

    return NextResponse.json(fullAnalysis);
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze chart' },
      { status: 500 }
    );
  }
}
