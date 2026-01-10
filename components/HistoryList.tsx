'use client';

import React from 'react';
import { Analysis } from '@/types/analysis';
import { FaTrash, FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

interface HistoryListProps {
  history: Analysis[];
  onSelect: (analysis: Analysis) => void;
  onDelete: (id: string) => void;
}

export default function HistoryList({ history, onSelect, onDelete }: HistoryListProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'BULLISH':
        return <FaArrowUp className="text-secondary" />;
      case 'BEARISH':
        return <FaArrowDown className="text-danger" />;
      default:
        return <FaMinus className="text-gray-400" />;
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No analysis history yet</p>
        <p className="text-gray-500 text-sm mt-2">Start analyzing charts to build your history</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {history.map((analysis) => (
        <div
          key={analysis.id}
          className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-primary/50 transition-colors"
        >
          <div
            onClick={() => onSelect(analysis)}
            className="cursor-pointer"
          >
            <div className="flex gap-3 p-4">
              {/* Thumbnail */}
              {analysis.imagePreview && (
                <div className="w-24 h-24 bg-gray-900 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={analysis.imagePreview}
                    alt="Chart"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {getTrendIcon(analysis.trend)}
                    <span className="font-semibold text-white">{analysis.trend}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        analysis.tradingIdea.direction === 'BUY'
                          ? 'bg-secondary/20 text-secondary'
                          : analysis.tradingIdea.direction === 'SELL'
                          ? 'bg-danger/20 text-danger'
                          : 'bg-gray-700/20 text-gray-400'
                      }`}
                    >
                      {analysis.tradingIdea.direction}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(analysis.id);
                    }}
                    className="text-gray-400 hover:text-danger transition-colors p-1"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
                
                <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                  {analysis.summary}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {formatDate(analysis.timestamp)}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      analysis.confidence === 'HIGH'
                        ? 'text-secondary'
                        : analysis.confidence === 'MEDIUM'
                        ? 'text-yellow-500'
                        : 'text-gray-400'
                    }`}
                  >
                    {analysis.confidence}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
