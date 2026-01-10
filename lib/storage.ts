import { Analysis } from '@/types/analysis';

const STORAGE_KEY = 'geminitrades_history';

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
};
