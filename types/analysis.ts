export interface OrderBlock {
  type: 'SUPPLY' | 'DEMAND';
  priceLevel: string;
  description: string;
}

export interface FairValueGap {
  type: 'BULLISH' | 'BEARISH';
  priceRange: string;
  description: string;
}

export interface KeyLevels {
  support: string[];
  resistance: string[];
}

export interface TradingIdea {
  direction: 'BUY' | 'SELL' | 'WAIT';
  entry: string;
  stopLoss: string;
  takeProfit: string[];
  reasoning: string;
}

export interface Analysis {
  id: string;
  timestamp: string;
  imagePreview?: string;
  summary: string;
  trend: 'BULLISH' | 'BEARISH' | 'SIDEWAYS' | 'UNKNOWN';
  orderBlocks: OrderBlock[];
  fairValueGaps: FairValueGap[];
  keyLevels: KeyLevels;
  tradingIdea: TradingIdea;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  risks: string[];
}
