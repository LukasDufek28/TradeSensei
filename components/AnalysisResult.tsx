'use client';

import React from 'react';
import { Analysis } from '@/types/analysis';
import {
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaCheckCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';

interface AnalysisResultProps {
  analysis: Analysis;
}

export default function AnalysisResult({ analysis }: AnalysisResultProps) {
  const getTrendIcon = () => {
    switch (analysis.trend) {
      case 'BULLISH':
        return <FaArrowUp className="text-secondary" />;
      case 'BEARISH':
        return <FaArrowDown className="text-danger" />;
      default:
        return <FaMinus className="text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    switch (analysis.trend) {
      case 'BULLISH':
        return 'text-secondary';
      case 'BEARISH':
        return 'text-danger';
      default:
        return 'text-gray-400';
    }
  };

  const getDirectionBadge = () => {
    const direction = analysis.tradingIdea.direction;
    if (direction === 'BUY') {
      return 'bg-secondary/20 text-secondary border-secondary';
    } else if (direction === 'SELL') {
      return 'bg-danger/20 text-danger border-danger';
    }
    return 'bg-gray-700/20 text-gray-400 border-gray-600';
  };

  const getConfidenceBadge = () => {
    switch (analysis.confidence) {
      case 'HIGH':
        return 'bg-secondary/20 text-secondary';
      case 'MEDIUM':
        return 'bg-yellow-500/20 text-yellow-500';
      default:
        return 'bg-gray-700/20 text-gray-400';
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Summary Card */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            {getTrendIcon()}
            Market Analysis
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getConfidenceBadge()}`}>
            {analysis.confidence} Confidence
          </span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">{analysis.summary}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-gray-400 text-xs">Trend:</span>
          <span className={`font-semibold ${getTrendColor()}`}>{analysis.trend}</span>
        </div>
      </div>

      {/* Trading Idea Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border-2 border-primary/30">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Trading Idea</h3>
          <span className={`px-3 py-1.5 rounded-lg text-sm font-bold border-2 ${getDirectionBadge()}`}>
            {analysis.tradingIdea.direction}
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-900/50 rounded p-3">
              <p className="text-xs text-gray-400 mb-1">Entry</p>
              <p className="text-white font-semibold">{analysis.tradingIdea.entry}</p>
            </div>
            <div className="bg-gray-900/50 rounded p-3">
              <p className="text-xs text-gray-400 mb-1">Stop Loss</p>
              <p className="text-danger font-semibold">{analysis.tradingIdea.stopLoss}</p>
            </div>
          </div>
          
          <div className="bg-gray-900/50 rounded p-3">
            <p className="text-xs text-gray-400 mb-2">Take Profit Targets</p>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(analysis.tradingIdea.takeProfit) && analysis.tradingIdea.takeProfit.length > 0 ? (
                analysis.tradingIdea.takeProfit.map((tp, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-secondary/20 text-secondary rounded text-sm font-semibold"
                  >
                    TP{idx + 1}: {tp}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-sm">
                  {typeof analysis.tradingIdea.takeProfit === 'string' 
                    ? analysis.tradingIdea.takeProfit 
                    : 'No take profit targets'}
                </span>
              )}
            </div>
          </div>

          <div className="bg-gray-900/50 rounded p-3">
            <p className="text-xs text-gray-400 mb-2">Reasoning</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              {analysis.tradingIdea.reasoning}
            </p>
          </div>
        </div>
      </div>

      {/* Order Blocks */}
      {analysis.orderBlocks.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <FaCheckCircle className="text-primary" />
            Order Blocks
          </h3>
          <div className="space-y-2">
            {analysis.orderBlocks.map((ob, idx) => (
              <div key={idx} className="bg-gray-900/50 rounded p-3">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-semibold ${
                      ob.type === 'SUPPLY' ? 'text-danger' : 'text-secondary'
                    }`}
                  >
                    {ob.type}
                  </span>
                  <span className="text-white font-mono text-sm">{ob.priceLevel}</span>
                </div>
                <p className="text-gray-400 text-xs">{ob.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fair Value Gaps */}
      {analysis.fairValueGaps.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <FaCheckCircle className="text-primary" />
            Fair Value Gaps
          </h3>
          <div className="space-y-2">
            {analysis.fairValueGaps.map((fvg, idx) => (
              <div key={idx} className="bg-gray-900/50 rounded p-3">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-semibold ${
                      fvg.type === 'BULLISH' ? 'text-secondary' : 'text-danger'
                    }`}
                  >
                    {fvg.type}
                  </span>
                  <span className="text-white font-mono text-sm">{fvg.priceRange}</span>
                </div>
                <p className="text-gray-400 text-xs">{fvg.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Levels */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-3">Key Levels</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-secondary mb-2 font-semibold">Support</p>
            <div className="space-y-1">
              {analysis.keyLevels.support.map((level, idx) => (
                <div key={idx} className="bg-secondary/10 rounded px-2 py-1">
                  <span className="text-secondary text-sm font-mono">{level}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-danger mb-2 font-semibold">Resistance</p>
            <div className="space-y-1">
              {analysis.keyLevels.resistance.map((level, idx) => (
                <div key={idx} className="bg-danger/10 rounded px-2 py-1">
                  <span className="text-danger text-sm font-mono">{level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Risks */}
      {analysis.risks.length > 0 && (
        <div className="bg-danger/10 border border-danger/30 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-danger mb-3 flex items-center gap-2">
            <FaExclamationTriangle />
            Risk Factors
          </h3>
          <ul className="space-y-2">
            {analysis.risks.map((risk, idx) => (
              <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-danger mt-1">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
