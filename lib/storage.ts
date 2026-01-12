import { Analysis } from '@/types/analysis';

const STORAGE_KEY = 'geminitrades_history';
const STRATEGY_KEY = 'geminitrades_custom_strategy';
const OUTPUT_SETTINGS_KEY = 'geminitrades_output_settings';

export interface OutputSettings {
  summary: boolean;
  trend: boolean;
  orderBlocks: boolean;
  fairValueGaps: boolean;
  keyLevels: boolean;
  confidence: boolean;
  risks: boolean;
}

export const DEFAULT_OUTPUT_SETTINGS: OutputSettings = {
  summary: true,
  trend: true,
  orderBlocks: true,
  fairValueGaps: true,
  keyLevels: true,
  confidence: true,
  risks: true,
};

export const DEFAULT_STRATEGY = `You are an expert trading analyst specializing in Smart Money Concepts (SMC) and Institutional Order Flow.

Primary Strategy: Order Block Reversion with Multi-Confluence Analysis

Analyze the current price action and market structure on the chart AS IT IS RIGHT NOW. If a valid trade setup exists based on the criteria below, identify it. If no valid setup exists or if the market bias contradicts the entry direction, recommend WAIT.

ENTRY CRITERIA FOR VALID TRADES:
1. Identify the current market bias (bullish/bearish) based on Break of Structure (BOS) or Change of Character (ChoCh)
2. Locate untested Order Blocks (OB) - the last bullish/bearish candle before an impulsive move
3. Check if price is currently at or near an OB zone (premium for sells, discount for buys)
4. Look for additional confluence within the OB:
   - Inverse Fair Value Gap (iFVG) present
   - 50% equilibrium level alignment
   - Volume imbalance visible (wicks showing rejection)
   - Liquidity sweep occurred before current price level

TRADE EXECUTION RULES:
- BUY SETUP: Market bias must be bullish AND price at demand OB in discount zone with confluence
- SELL SETUP: Market bias must be bearish AND price at supply OB in premium zone with confluence
- WAIT: Use if:
  * No clear OB present at current price
  * Market bias doesn't match the OB direction (e.g., bullish bias but price at supply)
  * Insufficient confluence factors (need at least 2)
  * Price is in the middle of range (no premium/discount advantage)
  * Recent OB has been tested multiple times (mitigated)

RISK MANAGEMENT (when trade is valid):
- Stop Loss: 1-2 pips beyond the opposite side of the OB
- Take Profit: Target next liquidity pools, previous highs/lows, or opposing OBs
- Risk-Reward Ratio: Minimum 1:2, ideally 1:3 or better

IMPORTANT: Be honest about chart conditions. If the setup isn't there RIGHT NOW, choose WAIT and explain what's needed for a valid entry.`;

export const OUTPUT_FORMAT = `Analyze this trading chart image using my strategy and provide a detailed analysis in the following JSON format:

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
    "direction": "BUY/SELL/WAIT",
    "entry": "suggested entry price/zone",
    "stopLoss": "suggested stop loss",
    "takeProfit": ["TP1", "TP2", "TP3"],
    "reasoning": "detailed explanation of the trade setup"
  },
  "confidence": "HIGH/MEDIUM/LOW",
  "risks": ["risk1", "risk2"]
}

Provide ONLY the JSON response, no additional text.`;

export const storageService = {
  // Save analysis to history
  saveAnalysis: (analysis: Analysis): void => {
    try {
      const history = storageService.getHistory();
      history.unshift(analysis); // Add to beginning
      // Keep only last 50 analyses
      const trimmedHistory = history.slice(0, 50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
    } catch (error) {
      console.error('Failed to save analysis:', error);
    }
  },

  // Get all history
  getHistory: (): Analysis[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to get history:', error);
      return [];
    }
  },

  // Delete specific analysis
  deleteAnalysis: (id: string): void => {
    try {
      const history = storageService.getHistory();
      const filtered = history.filter((a) => a.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Failed to delete analysis:', error);
    }
  },

  // Clear all history
  clearHistory: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  },

  // Get custom strategy or default
  getStrategy: (): string => {
    try {
      const stored = localStorage.getItem(STRATEGY_KEY);
      return stored || DEFAULT_STRATEGY;
    } catch (error) {
      console.error('Failed to get strategy:', error);
      return DEFAULT_STRATEGY;
    }
  },

  // Save custom strategy
  saveStrategy: (strategy: string): void => {
    try {
      localStorage.setItem(STRATEGY_KEY, strategy);
    } catch (error) {
      console.error('Failed to save strategy:', error);
    }
  },

  // Get output settings or default
  getOutputSettings: (): OutputSettings => {
    try {
      const stored = localStorage.getItem(OUTPUT_SETTINGS_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_OUTPUT_SETTINGS;
    } catch (error) {
      console.error('Failed to get output settings:', error);
      return DEFAULT_OUTPUT_SETTINGS;
    }
  },

  // Save output settings
  saveOutputSettings: (settings: OutputSettings): void => {
    try {
      localStorage.setItem(OUTPUT_SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save output settings:', error);
    }
  },
};
