'use client';

import { useState, useEffect } from 'react';
import { FaChartLine, FaHistory, FaSpinner, FaHome, FaCog } from 'react-icons/fa';
import ImageCapture from '@/components/ImageCapture';
import AnalysisResult from '@/components/AnalysisResult';
import HistoryList from '@/components/HistoryList';
import PromptEditor from '@/components/PromptEditor';
import { Analysis } from '@/types/analysis';
import { storageService, DEFAULT_STRATEGY, OutputSettings, DEFAULT_OUTPUT_SETTINGS } from '@/lib/storage';

type View = 'home' | 'result' | 'history';

export default function Home() {
  const [view, setView] = useState<View>('home');
  const [analyzing, setAnalyzing] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<Analysis | null>(null);
  const [history, setHistory] = useState<Analysis[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPromptEditorOpen, setIsPromptEditorOpen] = useState(false);
  const [customStrategy, setCustomStrategy] = useState<string>('');
  const [outputSettings, setOutputSettings] = useState<OutputSettings>(DEFAULT_OUTPUT_SETTINGS);

  // Load history, custom strategy, and output settings on mount
  useEffect(() => {
    setHistory(storageService.getHistory());
    setCustomStrategy(storageService.getStrategy());
    setOutputSettings(storageService.getOutputSettings());
  }, []);

  const handleImageSelected = async (file: File) => {
    setAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('strategy', customStrategy);
      formData.append('outputSettings', JSON.stringify(outputSettings));

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze chart');
      }

      const analysis: Analysis = await response.json();
      
      // Save to history
      storageService.saveAnalysis(analysis);
      setHistory(storageService.getHistory());
      
      // Show result
      setCurrentAnalysis(analysis);
      setView('result');
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis');
      console.error('Analysis error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleHistorySelect = (analysis: Analysis) => {
    setCurrentAnalysis(analysis);
    setView('result');
  };

  const handleHistoryDelete = (id: string) => {
    storageService.deleteAnalysis(id);
    setHistory(storageService.getHistory());
  };

  const handleNewAnalysis = () => {
    setCurrentAnalysis(null);
    setError(null);
    setView('home');
  };

  const handleSaveSettings = (strategy: string, outputs: OutputSettings) => {
    storageService.saveStrategy(strategy);
    storageService.saveOutputSettings(outputs);
    setCustomStrategy(strategy);
    setOutputSettings(outputs);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-lg">
                <FaChartLine className="text-primary text-2xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TradeSensei</h1>
                <p className="text-xs text-gray-400">AI Trading Analysis</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleNewAnalysis}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  view === 'home'
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <FaHome size={16} />
                <span className="hidden sm:inline">Home</span>
              </button>
              <button
                onClick={() => setView('history')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  view === 'history'
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <FaHistory size={16} />
                <span className="hidden sm:inline">History</span>
              </button>
              <button
                onClick={() => setIsPromptEditorOpen(true)}
                className="px-4 py-2 rounded-lg transition-colors flex items-center gap-2 bg-gray-800 text-gray-300 hover:bg-gray-700"
                title="Customize Analysis Strategy"
              >
                <FaCog size={16} />
                <span className="hidden sm:inline">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-20">
        {view === 'home' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Analyze Your Trading Chart
              </h2>
              <p className="text-gray-400">
                Upload a chart image to get AI-powered trading ideas
              </p>
            </div>

            <ImageCapture onImageSelected={handleImageSelected} disabled={analyzing} />

            {analyzing && (
              <div className="bg-gray-800 border border-primary/30 rounded-lg p-6 text-center">
                <FaSpinner className="animate-spin text-primary text-4xl mx-auto mb-3" />
                <p className="text-white font-semibold">Analyzing your chart...</p>
                <p className="text-gray-400 text-sm mt-1">
                  Detecting Order Blocks, Fair Value Gaps, and generating trading ideas
                </p>
              </div>
            )}

            {error && (
              <div className="bg-danger/10 border border-danger/30 rounded-lg p-4">
                <p className="text-danger font-semibold mb-1">Analysis Failed</p>
                <p className="text-gray-300 text-sm">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-3 text-sm text-gray-400 hover:text-white"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Recent History Preview */}
            {history.length > 0 && !analyzing && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Recent Analyses</h3>
                  <button
                    onClick={() => setView('history')}
                    className="text-primary text-sm hover:underline"
                  >
                    View All
                  </button>
                </div>
                <HistoryList
                  history={history.slice(0, 3)}
                  onSelect={handleHistorySelect}
                  onDelete={handleHistoryDelete}
                />
              </div>
            )}
          </div>
        )}

        {view === 'result' && currentAnalysis && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
              <button
                onClick={handleNewAnalysis}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                New Analysis
              </button>
            </div>

            {currentAnalysis.imagePreview && (
              <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <img
                  src={currentAnalysis.imagePreview}
                  alt="Analyzed chart"
                  className="w-full h-auto"
                />
              </div>
            )}

            <AnalysisResult analysis={currentAnalysis} />
          </div>
        )}

        {view === 'history' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Analysis History</h2>
              {history.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all history?')) {
                      storageService.clearHistory();
                      setHistory([]);
                    }
                  }}
                  className="text-danger text-sm hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            <HistoryList
              history={history}
              onSelect={handleHistorySelect}
              onDelete={handleHistoryDelete}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800 py-4 fixed bottom-0 left-0 right-0">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>Powered by Google Gemini AI</p>
        </div>
      </footer>

      {/* Prompt Editor Modal */}
      <PromptEditor
        isOpen={isPromptEditorOpen}
        onClose={() => setIsPromptEditorOpen(false)}
        onSave={handleSaveSettings}
        currentStrategy={customStrategy}
        defaultStrategy={DEFAULT_STRATEGY}
        currentOutputSettings={outputSettings}
        defaultOutputSettings={DEFAULT_OUTPUT_SETTINGS}
      />
    </div>
  );
}
