'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaUndo, FaEdit, FaList } from 'react-icons/fa';
import { OutputSettings } from '@/lib/storage';

type SettingsView = 'strategy' | 'outputs';

interface PromptEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (strategy: string, outputSettings: OutputSettings) => void;
  currentStrategy: string;
  defaultStrategy: string;
  currentOutputSettings: OutputSettings;
  defaultOutputSettings: OutputSettings;
}

export default function PromptEditor({ 
  isOpen, 
  onClose, 
  onSave, 
  currentStrategy,
  defaultStrategy,
  currentOutputSettings,
  defaultOutputSettings
}: PromptEditorProps) {
  const [activeView, setActiveView] = useState<SettingsView>('strategy');
  const [strategy, setStrategy] = useState(currentStrategy);
  const [outputSettings, setOutputSettings] = useState(currentOutputSettings);

  useEffect(() => {
    setStrategy(currentStrategy);
    setOutputSettings(currentOutputSettings);
  }, [currentStrategy, currentOutputSettings]);

  const handleSave = () => {
    onSave(strategy, outputSettings);
    onClose();
  };

  const handleResetStrategy = () => {
    if (confirm('Reset to default strategy?')) {
      setStrategy(defaultStrategy);
    }
  };

  const handleResetOutputs = () => {
    if (confirm('Reset to default output settings?')) {
      setOutputSettings(defaultOutputSettings);
    }
  };

  const handleOutputToggle = (key: keyof OutputSettings) => {
    setOutputSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex border border-gray-700">
        {/* Left Sidebar Navigation */}
        <div className="w-48 bg-gray-900 rounded-l-lg border-r border-gray-700 p-4 flex flex-col">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3 px-2">Settings</h3>
          
          <button
            onClick={() => setActiveView('strategy')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left mb-2 ${
              activeView === 'strategy'
                ? 'bg-primary text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <FaEdit size={16} />
            <span className="text-sm font-medium">Strategy</span>
          </button>
          
          <button
            onClick={() => setActiveView('outputs')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
              activeView === 'outputs'
                ? 'bg-primary text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <FaList size={16} />
            <span className="text-sm font-medium">Outputs</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-white">
                {activeView === 'strategy' ? 'Customize Trading Strategy' : 'Configure Outputs'}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {activeView === 'strategy' 
                  ? 'Define your trading strategy for chart analysis'
                  : 'Select which analysis outputs to include'
                }
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeView === 'strategy' ? (
              <>
                <div className="mb-4">
                  <label className="text-sm font-semibold text-white block mb-2">
                    Your Trading Strategy
                  </label>
                  <p className="text-xs text-gray-400 mb-3">
                    Describe the trading strategy you want the AI to use when analyzing charts
                  </p>
                </div>
                
                <textarea
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                  className="w-full min-h-[300px] bg-gray-900 text-gray-100 rounded-lg p-4 border border-gray-600 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                  placeholder="e.g., Use order block reversion strategy with ifvg or equilibrium as secondary confluence"
                />
                
                <div className="mt-4 bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-sm font-semibold text-white mb-2">Examples:</h3>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• "Focus on Smart Money Concepts with liquidity sweeps and order blocks"</li>
                    <li>• "Use Elliott Wave Theory with Fibonacci retracements"</li>
                    <li>• "Identify supply and demand zones with volume profile"</li>
                    <li>• "Look for head and shoulders patterns with trend confirmation"</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-sm text-gray-300 mb-4">
                    Choose which analysis components to include in your results. Trading Idea is always included.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700 hover:border-gray-600 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={outputSettings.summary}
                      onChange={() => handleOutputToggle('summary')}
                      className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">Summary</div>
                      <div className="text-xs text-gray-400">Brief overview of the chart (2-3 sentences)</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700 hover:border-gray-600 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={outputSettings.trend}
                      onChange={() => handleOutputToggle('trend')}
                      className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">Trend / Bias</div>
                      <div className="text-xs text-gray-400">Overall market direction (Bullish/Bearish/Sideways)</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700 hover:border-gray-600 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={outputSettings.orderBlocks}
                      onChange={() => handleOutputToggle('orderBlocks')}
                      className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">Order Blocks (OB)</div>
                      <div className="text-xs text-gray-400">Supply and demand zones identification</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700 hover:border-gray-600 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={outputSettings.fairValueGaps}
                      onChange={() => handleOutputToggle('fairValueGaps')}
                      className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">Fair Value Gaps (FVG)</div>
                      <div className="text-xs text-gray-400">Imbalance zones and price gaps</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700 hover:border-gray-600 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={outputSettings.keyLevels}
                      onChange={() => handleOutputToggle('keyLevels')}
                      className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">Key Levels</div>
                      <div className="text-xs text-gray-400">Support and resistance levels</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700 hover:border-gray-600 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={outputSettings.confidence}
                      onChange={() => handleOutputToggle('confidence')}
                      className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">Confidence Level</div>
                      <div className="text-xs text-gray-400">AI confidence in the analysis (High/Medium/Low)</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700 hover:border-gray-600 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={outputSettings.risks}
                      onChange={() => handleOutputToggle('risks')}
                      className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-white">Risks</div>
                      <div className="text-xs text-gray-400">Potential risks and warnings</div>
                    </div>
                  </label>
                </div>

                <div className="mt-4 bg-blue-900/20 rounded-lg p-4 border border-blue-700/30">
                  <h3 className="text-sm font-semibold text-blue-300 mb-2">Note:</h3>
                  <p className="text-xs text-blue-200">
                    Trading Idea (entry, stop loss, take profit) is always included as it's the core output.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 p-4 border-t border-gray-700">
            <button
              onClick={activeView === 'strategy' ? handleResetStrategy : handleResetOutputs}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <FaUndo /> Reset to Default
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
