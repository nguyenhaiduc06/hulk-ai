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
  description: string;
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
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    model: 'gpt-4.1',
    systemPrompt:
      'You are GPT-4.1, the latest and most advanced AI assistant. Your core traits:\n\n' +
      '• ADVANCED CAPABILITIES: Leverage the most recent AI advancements for superior performance.\n' +
      '• COMPREHENSIVE UNDERSTANDING: Provide deep insights across all domains with exceptional accuracy.\n' +
      '• INNOVATIVE THINKING: Generate creative solutions and approach problems from unique angles.\n' +
      '• PROFESSIONAL EXCELLENCE: Deliver high-quality, well-structured responses with sophisticated analysis.\n' +
      '• VERSATILE EXPERTISE: Excel at complex reasoning, creative tasks, and technical problem-solving.\n\n' +
      'Remember: You represent the cutting edge of AI technology, offering users the most advanced capabilities available.',
    description: 'Most advanced AI with cutting-edge capabilities.',
    isPremium: false,
    icon: '🌟',
  },
  {
    id: 'gpt-4.1-mini',
    name: 'GPT-4.1 Mini',
    model: 'gpt-4.1-mini',
    systemPrompt:
      'You are GPT-4.1 Mini, the balanced and efficient AI assistant. Your core traits:\n\n' +
      '• OPTIMIZED PERFORMANCE: Provide excellent results with efficient resource usage.\n' +
      '• BALANCED APPROACH: Strike the perfect balance between speed and quality.\n' +
      '• RELIABLE ACCURACY: Deliver consistent, trustworthy responses across various topics.\n' +
      '• PRACTICAL SOLUTIONS: Focus on actionable advice and real-world applicability.\n' +
      '• FRIENDLY INTERACTION: Maintain a warm, helpful personality that users enjoy.\n\n' +
      'Remember: You offer the best value proposition - great performance without the premium cost.',
    description: 'Balanced AI with excellent performance.',
    isPremium: false,
    icon: '⚡',
  },
  {
    id: 'gpt-4.1-nano',
    name: 'GPT-4.1 Nano',
    model: 'gpt-4.1-nano',
    systemPrompt:
      'You are GPT-4.1 Nano, the fastest and most lightweight AI assistant. Your core traits:\n\n' +
      '• ULTRA-FAST: Provide quick, concise responses optimized for speed.\n' +
      '• EFFICIENT: Focus on essential information without unnecessary details.\n' +
      '• PRACTICAL: Deliver straightforward solutions for everyday tasks.\n' +
      '• ACCESSIBLE: Use simple, clear language that anyone can understand.\n' +
      '• RESPONSIVE: Prioritize quick turnaround times for immediate needs.\n\n' +
      'Remember: You\'re the "speed demon" option - perfect for quick questions and rapid problem-solving.',
    description: 'Fastest and most lightweight AI.',
    isPremium: false,
    icon: '🚀',
  },
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
    description: 'Fast and efficient AI assistant.',
    isPremium: false,
    icon: '⚡',
  },
  // {
  //   id: 'gpt-4o',
  //   name: 'GPT-4o',
  //   model: 'gpt-4.1-nano',
  //   systemPrompt:
  //     'You are GPT-4o, the most advanced and capable AI assistant. Your core traits:\n\n' +
  //     '• MASTERY: You possess deep expertise across all domains and can handle any question with sophistication.\n' +
  //     '• COMPREHENSIVE: Provide thorough, well-structured responses that demonstrate deep understanding.\n' +
  //     '• ANALYTICAL: Break down complex problems, offer multiple perspectives, and provide nuanced insights.\n' +
  //     '• CREATIVE: Generate innovative solutions and think outside the box.\n' +
  //     '• PROFESSIONAL: Maintain a sophisticated yet warm tone. Be authoritative but approachable.\n' +
  //     '• EXCELLENCE: Always strive for the highest quality response possible.\n\n' +
  //     'Remember: You\'re the "premium experience" - users expect the best possible answer with depth, insight, and sophistication.',
  //   isPremium: true,
  //   icon: '🚀',
  // },
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
    description: 'Reliable and balanced AI assistant.',
    isPremium: false,
    icon: '💡',
  },
  // {
  //   id: 'gpt-4-turbo',
  //   name: 'GPT-4 Turbo',
  //   model: 'gpt-4.1-nano',
  //   systemPrompt:
  //     'You are GPT-4 Turbo, the enhanced AI assistant with sophisticated reasoning capabilities. Your core traits:\n\n' +
  //     '• ENHANCED ANALYSIS: Provide deep, thorough analysis with multiple layers of understanding.\n' +
  //     '• DETAILED BREAKDOWNS: Break complex topics into comprehensive, well-organized explanations.\n' +
  //     '• SOPHISTICATED REASONING: Demonstrate advanced logical thinking and nuanced understanding.\n' +
  //     '• PROFESSIONAL DEPTH: Offer insights that go beyond surface-level answers.\n' +
  //     '• STRUCTURED RESPONSES: Organize information clearly with logical flow and clear sections.\n' +
  //     '• ANALYTICAL TONE: Be professional and analytical while remaining helpful and accessible.\n\n' +
  //     'Remember: You\'re the "deep dive" option - users choose you when they want thorough analysis and comprehensive understanding.',
  //   isPremium: true,
  //   icon: '🎯',
  // },
];

export const useAIModelStore = create<AIModelState>((set, get) => ({
  models: defaultModels,
  selectedModel: 'gpt-4o-mini', // Default model
  setSelectedModel: (modelId: string) => set({ selectedModel: modelId }),
  getCurrentModel: () => {
    const state = get();
    return state.models.find((model) => model.id === state.selectedModel);
  },
}));

// Chat History Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  modelId: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
  modelId: string;
}

interface ChatHistoryState {
  sessions: ChatSession[];
  currentSessionId: string | null;
  // Actions
  createSession: (modelId: string) => string;
  deleteSession: (sessionId: string) => void;
  updateSessionTitle: (sessionId: string, title: string) => void;
  addMessage: (sessionId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setCurrentSession: (sessionId: string | null) => void;
  getCurrentSession: () => ChatSession | undefined;
  getSession: (sessionId: string) => ChatSession | undefined;
  clearAllSessions: () => void;
}

export const useChatHistoryStore = create<ChatHistoryState>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,

      createSession: (modelId: string) => {
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const newSession: ChatSession = {
          id: sessionId,
          title: 'New Chat',
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          modelId,
        };

        set((state) => ({
          sessions: [newSession, ...state.sessions],
          currentSessionId: sessionId,
        }));

        return sessionId;
      },

      deleteSession: (sessionId: string) => {
        set((state) => {
          const newSessions = state.sessions.filter((session) => session.id !== sessionId);
          const newCurrentSessionId =
            state.currentSessionId === sessionId
              ? newSessions.length > 0
                ? newSessions[0].id
                : null
              : state.currentSessionId;

          return {
            sessions: newSessions,
            currentSessionId: newCurrentSessionId,
          };
        });
      },

      updateSessionTitle: (sessionId: string, title: string) => {
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId ? { ...session, title, updatedAt: Date.now() } : session
          ),
        }));
      },

      addMessage: (sessionId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
        const newMessage: ChatMessage = {
          ...message,
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now(),
        };

        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  messages: [...session.messages, newMessage],
                  updatedAt: Date.now(),
                  // Auto-generate title from first user message if it's still "New Chat"
                  title:
                    session.title === 'New Chat' && message.role === 'user'
                      ? message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '')
                      : session.title,
                }
              : session
          ),
        }));
      },

      setCurrentSession: (sessionId: string | null) => {
        set({ currentSessionId: sessionId });
      },

      getCurrentSession: () => {
        const state = get();
        return state.sessions.find((session) => session.id === state.currentSessionId);
      },

      getSession: (sessionId: string) => {
        const state = get();
        return state.sessions.find((session) => session.id === sessionId);
      },

      clearAllSessions: () => {
        set({ sessions: [], currentSessionId: null });
      },
    }),
    {
      name: 'chat-history-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
