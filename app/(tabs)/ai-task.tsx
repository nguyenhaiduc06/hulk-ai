import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import { Container } from '~/components/Container';

type TaskItem = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  emoji: string;
};

type Category = {
  id: string;
  name: string;
  color: string;
};

const categories: Category[] = [
  { id: 'all', name: 'All', color: '#6366f1' },
  { id: 'work', name: 'Work', color: '#ef4444' },
  { id: 'personal', name: 'Personal', color: '#10b981' },
  { id: 'health', name: 'Health', color: '#f59e0b' },
  { id: 'learning', name: 'Learning', color: '#8b5cf6' },
  { id: 'finance', name: 'Finance', color: '#06b6d4' },
];

const taskItems: TaskItem[] = [
  {
    id: '1',
    title: 'Text Summarizer',
    subtitle: 'Extract key points from long documents',
    category: 'work',
    description: 'AI-powered text summarization for documents and articles',
    emoji: '📝',
  },
  {
    id: '2',
    title: 'Code Generator',
    subtitle: 'Generate code from natural language',
    category: 'work',
    description: 'Convert descriptions into working code snippets',
    emoji: '💻',
  },
  {
    id: '3',
    title: 'Image Analyzer',
    subtitle: 'Describe and analyze images',
    category: 'learning',
    description: 'AI vision to understand and describe visual content',
    emoji: '🖼️',
  },
  {
    id: '4',
    title: 'Language Translator',
    subtitle: 'Translate between multiple languages',
    category: 'personal',
    description: 'Real-time translation with context awareness',
    emoji: '🌐',
  },
  {
    id: '5',
    title: 'Data Analyzer',
    subtitle: 'Analyze and visualize data patterns',
    category: 'finance',
    description: 'AI-powered data insights and trend analysis',
    emoji: '📊',
  },
  {
    id: '6',
    title: 'Content Writer',
    subtitle: 'Generate articles and blog posts',
    category: 'work',
    description: 'AI writing assistant for various content types',
    emoji: '✍️',
  },
  {
    id: '7',
    title: 'Voice Assistant',
    subtitle: 'Convert speech to text and back',
    category: 'health',
    description: 'Voice interaction and transcription services',
    emoji: '🎤',
  },
  {
    id: '8',
    title: 'Code Reviewer',
    subtitle: 'Analyze and improve code quality',
    category: 'learning',
    description: 'AI-powered code review and optimization',
    emoji: '🔍',
  },
  {
    id: '9',
    title: 'Chatbot Builder',
    subtitle: 'Create conversational AI agents',
    category: 'personal',
    description: 'Design and deploy intelligent chatbots',
    emoji: '🤖',
  },
  {
    id: '10',
    title: 'Predictive Analytics',
    subtitle: 'Forecast trends and outcomes',
    category: 'finance',
    description: 'AI-powered prediction and forecasting models',
    emoji: '🔮',
  },
  {
    id: '11',
    title: 'Document Processor',
    subtitle: 'Extract and organize information',
    category: 'work',
    description: 'AI document parsing and information extraction',
    emoji: '📄',
  },
  {
    id: '12',
    title: 'Recommendation Engine',
    subtitle: 'Suggest personalized content',
    category: 'health',
    description: 'AI-powered recommendation system',
    emoji: '🎯',
  },
];

export default function AITask() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTasks =
    selectedCategory === 'all'
      ? taskItems
      : taskItems.filter((task) => task.category === selectedCategory);

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

  const renderTaskCard = ({ item, index }: { item: TaskItem; index: number }) => {
    const isLastItem = index === filteredTasks.length - 1;
    const isOddNumberOfItems = filteredTasks.length % 2 === 1;

    return (
      <View
        className={`mb-4 ${isLastItem && isOddNumberOfItems ? 'w-1/2' : 'flex-1'}`}
        style={{ marginHorizontal: 4 }}>
        <TouchableOpacity className="aspect-square rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <View className="flex-1">
            <Text className="mb-2 text-4xl">{item.emoji}</Text>
            <Text className="mb-1 text-sm font-semibold text-gray-900">{item.title}</Text>
            <Text className="text-xs text-gray-500">{item.subtitle}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item.id)}
      className={`mr-3 rounded-full border px-4 py-2 ${
        selectedCategory === item.id ? 'border-transparent' : 'border-gray-300'
      }`}
      style={{
        backgroundColor: selectedCategory === item.id ? item.color : 'transparent',
      }}>
      <Text
        className={`text-sm font-medium ${
          selectedCategory === item.id ? 'text-white' : 'text-gray-700'
        }`}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="pt-safe flex-1">
      <View className="flex-1">
        {/* Category Filter */}
        <View className="mb-6">
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </View>

        {/* Task Grid */}
        <FlatList
          data={filteredTasks}
          renderItem={renderTaskCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16 }}
        />
      </View>
    </View>
  );
}
