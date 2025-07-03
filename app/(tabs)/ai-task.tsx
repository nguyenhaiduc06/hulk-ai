import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { CustomHeader } from '~/components/CustomHeader';
import { getMessageLimitState, DAILY_MESSAGE_LIMIT } from '~/utils/messageLimit';

type TaskItem = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  emoji: string;
  prompt: string;
};

type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
};

const categories: Category[] = [
  { id: 'all', name: 'All', color: '#6366f1', icon: '🌟' },
  { id: 'work', name: 'Work', color: '#ef4444', icon: '💼' },
  { id: 'personal', name: 'Personal', color: '#10b981', icon: '👤' },
  { id: 'health', name: 'Health', color: '#f59e0b', icon: '🏥' },
  { id: 'learning', name: 'Learning', color: '#8b5cf6', icon: '📚' },
  { id: 'finance', name: 'Finance', color: '#06b6d4', icon: '💰' },
];

const taskItems: TaskItem[] = [
  {
    id: '1',
    title: 'Text Summarizer',
    subtitle: 'Extract key points from long documents',
    category: 'work',
    description: 'AI-powered text summarization for documents and articles',
    emoji: '📝',
    prompt: 'Please summarize the following text and extract the key points:',
  },
  {
    id: '2',
    title: 'Code Generator',
    subtitle: 'Generate code from natural language',
    category: 'work',
    description: 'Convert descriptions into working code snippets',
    emoji: '💻',
    prompt: 'Please generate code for the following requirement:',
  },
  {
    id: '3',
    title: 'Image Analyzer',
    subtitle: 'Describe and analyze images',
    category: 'learning',
    description: 'AI vision to understand and describe visual content',
    emoji: '🖼️',
    prompt: 'Please analyze and describe this image in detail:',
  },
  {
    id: '4',
    title: 'Language Translator',
    subtitle: 'Translate between multiple languages',
    category: 'personal',
    description: 'Real-time translation with context awareness',
    emoji: '🌐',
    prompt: 'Please translate the following text to English:',
  },
  {
    id: '5',
    title: 'Data Analyzer',
    subtitle: 'Analyze and visualize data patterns',
    category: 'finance',
    description: 'AI-powered data insights and trend analysis',
    emoji: '📊',
    prompt: 'Please analyze this data and provide insights:',
  },
  {
    id: '6',
    title: 'Content Writer',
    subtitle: 'Generate articles and blog posts',
    category: 'work',
    description: 'AI writing assistant for various content types',
    emoji: '✍️',
    prompt: 'Please write content about the following topic:',
  },
  {
    id: '7',
    title: 'Voice Assistant',
    subtitle: 'Convert speech to text and back',
    category: 'health',
    description: 'Voice interaction and transcription services',
    emoji: '🎤',
    prompt: 'Please help me with voice-related tasks. I can provide audio or text:',
  },
  {
    id: '8',
    title: 'Code Reviewer',
    subtitle: 'Analyze and improve code quality',
    category: 'learning',
    description: 'AI-powered code review and optimization',
    emoji: '🔍',
    prompt: 'Please review this code and suggest improvements:',
  },
  {
    id: '9',
    title: 'Chatbot Builder',
    subtitle: 'Create conversational AI agents',
    category: 'personal',
    description: 'Design and deploy intelligent chatbots',
    emoji: '🤖',
    prompt: 'Please help me design a chatbot for the following use case:',
  },
  {
    id: '10',
    title: 'Predictive Analytics',
    subtitle: 'Forecast trends and outcomes',
    category: 'finance',
    description: 'AI-powered prediction and forecasting models',
    emoji: '🔮',
    prompt: 'Please analyze trends and make predictions based on this data:',
  },
  {
    id: '11',
    title: 'Document Processor',
    subtitle: 'Extract and organize information',
    category: 'work',
    description: 'AI document parsing and information extraction',
    emoji: '📄',
    prompt: 'Please extract and organize information from this document:',
  },
  {
    id: '12',
    title: 'Recommendation Engine',
    subtitle: 'Suggest personalized content',
    category: 'health',
    description: 'AI-powered recommendation system',
    emoji: '🎯',
    prompt: 'Please provide personalized recommendations based on my preferences:',
  },
];

export default function AITask() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [messageLimitState, setMessageLimitState] = useState({
    messagesLeft: DAILY_MESSAGE_LIMIT,
    maxMessages: DAILY_MESSAGE_LIMIT,
    lastResetDate: new Date().toDateString(),
  });
  const router = useRouter();

  // Load message limit state on component mount
  useEffect(() => {
    const loadMessageLimitState = async () => {
      const state = await getMessageLimitState();
      setMessageLimitState(state);
    };
    loadMessageLimitState();
  }, []);

  const filteredTasks =
    selectedCategory === 'all'
      ? taskItems
      : taskItems.filter((task) => task.category === selectedCategory);

  const handleTaskPress = (task: TaskItem) => {
    router.push({
      pathname: '/chat',
      params: {
        initialPrompt: task.prompt,
        taskTitle: task.title,
      },
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'in-progress':
        return '#f59e0b';
      case 'pending':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const renderTaskCard = ({ item }: { item: TaskItem }) => (
    <TouchableOpacity
      onPress={() => handleTaskPress(item)}
      className="m-2 flex-1 rounded-3xl border-2 border-gray-100 bg-white p-4 shadow-lg">
      <View className="items-start">
        <Text className="mb-4 text-5xl leading-normal">{item.emoji}</Text>
        <Text
          className="font-clash-medium text-lg leading-tight text-text-primary"
          numberOfLines={2}>
          {item.title}
        </Text>
        <Text className="font-inter text-sm text-text-secondary" numberOfLines={3}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item.id)}
      className={`mr-4 rounded-2xl border-2 px-6 py-3 ${
        selectedCategory === item.id ? 'border-primary bg-primary' : 'border-gray-200 bg-white'
      }`}>
      <View className="flex-row items-center">
        <Text className="mr-2 text-lg">{item.icon}</Text>
        <Text
          className={`font-clash-semibold text-base ${
            selectedCategory === item.id ? 'text-white' : 'text-text-secondary'
          }`}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false, // Hide default header to use custom header
        }}
      />

      {/* Custom Header */}
      <CustomHeader
        title="AI Tasks"
        messagesLeft={messageLimitState.messagesLeft}
        maxMessages={messageLimitState.maxMessages}
        showBackButton={false}
        showSettingsButton={true}
        onSettingsPress={() => {
          router.push('/settings');
        }}
      />

      <View className="flex-1 bg-surface">
        <View className="flex-1">
          {/* Category Filter */}
          <View className="mb-8">
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
            />
          </View>

          {/* Task Grid */}
          <FlatList
            data={filteredTasks}
            renderItem={renderTaskCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 8 }}
          />
        </View>
      </View>
    </>
  );
}
