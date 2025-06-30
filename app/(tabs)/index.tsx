import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';

import { ChatInputButton } from '~/components/ChatInputButton';
import { SuggestionCard } from '~/components/SuggestionCard';
import { RecentChatCard } from '~/components/RecentChatCard';
import { CustomHeader } from '~/components/CustomHeader';
import { suggestionCards, recentChats } from '~/utils/mockData';
import { getMessageLimitState, DAILY_MESSAGE_LIMIT } from '~/utils/messageLimit';

export default function Home() {
  const [messageLimitState, setMessageLimitState] = useState({
    messagesLeft: DAILY_MESSAGE_LIMIT,
    maxMessages: DAILY_MESSAGE_LIMIT,
    lastResetDate: new Date().toDateString(),
  });

  // Load message limit state on component mount
  useEffect(() => {
    const loadMessageLimitState = async () => {
      const state = await getMessageLimitState();
      setMessageLimitState(state);
    };
    loadMessageLimitState();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false, // Hide default header to use custom header
        }}
      />

      {/* Custom Header */}
      <CustomHeader
        title="Hulk AI"
        messagesLeft={messageLimitState.messagesLeft}
        maxMessages={messageLimitState.maxMessages}
        showBackButton={false}
      />

      <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pb-6 pt-4">
          <Text className="mb-2 text-2xl font-bold text-gray-900">Hello! 👋</Text>
          <Text className="text-gray-600">How can I help you today?</Text>
        </View>

        {/* Chat Section */}
        <View className="mb-8 px-4">
          <ChatInputButton />
        </View>

        {/* Suggestions Section */}
        <View className="mb-8">
          <View className="mb-4 px-4">
            <Text className="mb-1 text-lg font-semibold text-gray-900">Suggestions</Text>
            <Text className="text-sm text-gray-500">Popular ways to get started</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            className="flex-row">
            {suggestionCards.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </ScrollView>
        </View>

        {/* Recent Chats Section */}
        <View className="mb-8">
          <View className="mb-4 px-4">
            <Text className="mb-1 text-lg font-semibold text-gray-900">Recent Chats</Text>
            <Text className="text-sm text-gray-500">Continue where you left off</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            className="flex-row">
            {recentChats.map((chat) => (
              <RecentChatCard key={chat.id} chat={chat} />
            ))}
          </ScrollView>
        </View>

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </>
  );
}
