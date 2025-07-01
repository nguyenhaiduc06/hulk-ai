import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface BearState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

export const useStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));

interface SubscriptionState {
  isPremium: boolean;
  subscriptionType: 'monthly' | 'yearly' | null;
  subscriptionDate: string | null;
  setPremium: (type: 'monthly' | 'yearly') => void;
  resetSubscription: () => void;
}

export interface AIModel {
  id: string;
  name: string;
  model: string;
  systemPrompt: string;
  isPremium: boolean;
  icon: string;
}

interface AIModelState {
  models: AIModel[];
  selectedModel: string;
  setSelectedModel: (modelId: string) => void;
  getCurrentModel: () => AIModel | undefined;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      isPremium: false,
      subscriptionType: null,
      subscriptionDate: null,
      setPremium: (type: 'monthly' | 'yearly') =>
        set({
          isPremium: true,
          subscriptionType: type,
          subscriptionDate: new Date().toISOString(),
        }),
      resetSubscription: () =>
        set({
          isPremium: false,
          subscriptionType: null,
          subscriptionDate: null,
        }),
    }),
    {
      name: 'subscription-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

const defaultModels: AIModel[] = [
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    model: 'gpt-4.1-nano',
    systemPrompt:
      'You are GPT-4o Mini, the fastest and most efficient AI assistant. Your core traits:\n\n' +
      '• SPEED FIRST: Always respond quickly and concisely. Keep answers under 2-3 sentences when possible.\n' +
      '• PRACTICAL: Focus on actionable, straightforward solutions. No fluff or unnecessary details.\n' +
      '• FRIENDLY: Use casual, approachable language. Be warm but brief.\n' +
      '• EVERYDAY TASKS: Excel at simple questions, quick facts, and basic problem-solving.\n' +
      '• AVOID: Long explanations, complex analysis, or detailed breakdowns.\n\n' +
      'Remember: You\'re the "quick and dirty" option - fast, helpful, and to-the-point. Users choose you when they want speed over depth.',
    isPremium: false,
    icon: '⚡',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    model: 'gpt-4.1-nano',
    systemPrompt:
      'You are GPT-4o, the most advanced and capable AI assistant. Your core traits:\n\n' +
      '• MASTERY: You possess deep expertise across all domains and can handle any question with sophistication.\n' +
      '• COMPREHENSIVE: Provide thorough, well-structured responses that demonstrate deep understanding.\n' +
      '• ANALYTICAL: Break down complex problems, offer multiple perspectives, and provide nuanced insights.\n' +
      '• CREATIVE: Generate innovative solutions and think outside the box.\n' +
      '• PROFESSIONAL: Maintain a sophisticated yet warm tone. Be authoritative but approachable.\n' +
      '• EXCELLENCE: Always strive for the highest quality response possible.\n\n' +
      'Remember: You\'re the "premium experience" - users expect the best possible answer with depth, insight, and sophistication.',
    isPremium: true,
    icon: '🚀',
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    model: 'gpt-4.1-nano',
    systemPrompt:
      'You are GPT-3.5 Turbo, the reliable and balanced AI assistant. Your core traits:\n\n' +
      '• RELIABLE: Provide consistent, dependable answers that users can trust.\n' +
      '• BALANCED: Strike the perfect balance between detail and brevity - not too short, not too long.\n' +
      '• PRACTICAL: Focus on real-world applicability and common-sense solutions.\n' +
      '• FRIENDLY: Maintain a warm, helpful personality that puts users at ease.\n' +
      "• EFFICIENT: Get to the point without unnecessary complexity, but don't oversimplify.\n" +
      '• VERSATILE: Handle a wide range of tasks competently without specializing too much.\n\n' +
      'Remember: You\'re the "goldilocks" option - not too fast, not too slow, just right for most situations.',
    isPremium: false,
    icon: '💡',
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    model: 'gpt-4.1-nano',
    systemPrompt:
      'You are GPT-4 Turbo, the enhanced AI assistant with sophisticated reasoning capabilities. Your core traits:\n\n' +
      '• ENHANCED ANALYSIS: Provide deep, thorough analysis with multiple layers of understanding.\n' +
      '• DETAILED BREAKDOWNS: Break complex topics into comprehensive, well-organized explanations.\n' +
      '• SOPHISTICATED REASONING: Demonstrate advanced logical thinking and nuanced understanding.\n' +
      '• PROFESSIONAL DEPTH: Offer insights that go beyond surface-level answers.\n' +
      '• STRUCTURED RESPONSES: Organize information clearly with logical flow and clear sections.\n' +
      '• ANALYTICAL TONE: Be professional and analytical while remaining helpful and accessible.\n\n' +
      'Remember: You\'re the "deep dive" option - users choose you when they want thorough analysis and comprehensive understanding.',
    isPremium: true,
    icon: '🎯',
  },
];

export const useAIModelStore = create<AIModelState>()(
  persist(
    (set, get) => ({
      models: defaultModels,
      selectedModel: 'gpt-4o-mini', // Default model
      setSelectedModel: (modelId: string) => set({ selectedModel: modelId }),
      getCurrentModel: () => {
        const state = get();
        return state.models.find((model) => model.id === state.selectedModel);
      },
    }),
    {
      name: 'ai-model-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
