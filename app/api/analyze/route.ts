import { NextRequest, NextResponse } from 'next/server';

interface OutputSettings {
  summary: boolean;
  trend: boolean;
  orderBlocks: boolean;
  fairValueGaps: boolean;
  keyLevels: boolean;
  confidence: boolean;
  risks: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const customStrategy = formData.get('strategy') as string | null;
    const outputSettingsStr = formData.get('outputSettings') as string | null;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Parse output settings
    const outputSettings: OutputSettings = outputSettingsStr 
      ? JSON.parse(outputSettingsStr)
      : {
          summary: true,
          trend: true,
          orderBlocks: true,
          fairValueGaps: true,
          keyLevels: true,
          confidence: true,
          risks: true,
        };

    // Convert image to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Use custom strategy if provided, otherwise use default
    const defaultStrategy = 'Use order block reversion strategy with ifvg or equilibrium as secondary confluence';
    const strategy = customStrategy || defaultStrategy;

    // Build dynamic JSON structure based on output settings
    const jsonFields: string[] = [];
    
    if (outputSettings.summary) {
      jsonFields.push('  "summary": "Brief overview of the chart (2-3 sentences)"');
    }
    if (outputSettings.trend) {
      jsonFields.push('  "trend": "BULLISH/BEARISH/SIDEWAYS"');
    }
    if (outputSettings.orderBlocks) {
      jsonFields.push(`  "orderBlocks": [
    {
      "type": "SUPPLY/DEMAND",
      "priceLevel": "approximate price level",
      "description": "brief description"
    }
  ]`);
    }
    if (outputSettings.fairValueGaps) {
      jsonFields.push(`  "fairValueGaps": [
    {
      "type": "BULLISH/BEARISH",
      "priceRange": "approximate price range",
      "description": "brief description"
    }
  ]`);
    }
    if (outputSettings.keyLevels) {
      jsonFields.push(`  "keyLevels": {
    "support": ["level1", "level2"],
    "resistance": ["level1", "level2"]
  }`);
    }
    
    // Trading idea is always included
    jsonFields.push(`  "tradingIdea": {
    "direction": "BUY/SELL/WAIT",
    "entry": "suggested entry price/zone",
    "stopLoss": "suggested stop loss",
    "takeProfit": ["TP1", "TP2", "TP3"],
    "reasoning": "detailed explanation of the trade setup"
  }`);
    
    if (outputSettings.confidence) {
      jsonFields.push('  "confidence": "HIGH/MEDIUM/LOW"');
    }
    if (outputSettings.risks) {
      jsonFields.push('  "risks": ["risk1", "risk2"]');
    }

    const jsonStructure = `{\n${jsonFields.join(',\n')}\n}`;

    // Fixed output format to ensure proper parsing
    const outputFormat = `Analyze this trading chart image using my strategy and provide a detailed analysis in the following JSON format:

${jsonStructure}

Provide ONLY the JSON response, no additional text.`;

    // Combine strategy with output format
    const prompt = `${strategy}\n\n${outputFormat}`;

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
      
      // Ensure takeProfit is always an array
      if (analysis.tradingIdea && !Array.isArray(analysis.tradingIdea.takeProfit)) {
        if (typeof analysis.tradingIdea.takeProfit === 'string') {
          // If it's a string, split by comma or put it in an array
          analysis.tradingIdea.takeProfit = analysis.tradingIdea.takeProfit
            .split(/[,;]/)
            .map((s: string) => s.trim())
            .filter((s: string) => s);
          if (analysis.tradingIdea.takeProfit.length === 0) {
            analysis.tradingIdea.takeProfit = [analysis.tradingIdea.takeProfit];
          }
        } else {
          analysis.tradingIdea.takeProfit = [];
        }
      }
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
