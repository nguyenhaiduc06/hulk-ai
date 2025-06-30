export interface SuggestionCard {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

export interface RecentChatCard {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  taskType?: string;
}

export const suggestionCards: SuggestionCard[] = [
  {
    id: '1',
    title: 'Help me write a professional email',
    description: 'I can help you craft a clear, professional email for any situation.',
    emoji: '📧',
  },
  {
    id: '2',
    title: 'Explain a complex topic simply',
    description: "I'll break down any complex concept into easy-to-understand terms.",
    emoji: '🧠',
  },
  {
    id: '3',
    title: 'Create a workout plan for me',
    description: "I'll design a personalized workout routine based on your goals.",
    emoji: '💪',
  },
  {
    id: '4',
    title: 'Help me debug this code',
    description: 'I can analyze your code and help identify and fix issues.',
    emoji: '🐛',
  },
  {
    id: '5',
    title: 'Plan my weekend trip',
    description: "I'll help you plan an amazing weekend getaway with recommendations.",
    emoji: '✈️',
  },
  {
    id: '6',
    title: 'Summarize this article for me',
    description: "I'll extract the key points from any article or document.",
    emoji: '📄',
  },
];

export const recentChats: RecentChatCard[] = [
  {
    id: '1',
    title: 'Can you help me optimize my React component?',
    description: 'Here are several ways to optimize your React component for better performance...',
    timestamp: '2 hours ago',
    taskType: 'Code Review',
  },
  {
    id: '2',
    title: "What's the best way to learn TypeScript?",
    description: "TypeScript is a great choice! Here's a structured learning path...",
    timestamp: '1 day ago',
    taskType: 'Learning',
  },
  {
    id: '3',
    title: 'Help me create a budget spreadsheet',
    description: "I'll help you set up a comprehensive budget tracking system...",
    timestamp: '2 days ago',
    taskType: 'Finance',
  },
  {
    id: '4',
    title: 'Explain quantum computing in simple terms',
    description: 'Quantum computing is like having a super-powered calculator...',
    timestamp: '3 days ago',
    taskType: 'Learning',
  },
  {
    id: '5',
    title: 'Write a cover letter for a software engineer position',
    description: "Here's a professional cover letter tailored for your background...",
    timestamp: '1 week ago',
    taskType: 'Work',
  },
];
