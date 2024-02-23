import { create } from 'zustand';
import { search } from './api.js';

export const useStore = create((set) => ({
  topK: 10,
  query: '',
  results: [],
  loading: false,
  setTopK: (topK) => set((state) => ({ topK })),
  setQuery: (query) => set((state) => ({ query })),
  clearQuery: () => set({ query: [], loading: false, terms: [] }),

  clearResults: () => set({ results: [] }),
  fetchSearchResults: async (query, topK) => {
    set({ loading: true });
    const response = await search(query, topK, 0.0);
    set({ results: response?.matches || [], loading: false });
  },
}));
