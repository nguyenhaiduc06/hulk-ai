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

      <ScrollView className="bg-surface flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pb-8 pt-6">
          <Text className="font-clash-semibold text-text-primary text-2xl leading-tight">
            Hello! ��
          </Text>
          <Text className="font-inter text-text-tertiary text-lg">How can I help you today?</Text>
        </View>

        {/* Chat Section */}
        <View className="mb-8 px-6">
          <ChatInputButton />
        </View>

        {/* Suggestions Section */}
        <View className="mb-8">
          <View className="mb-4 px-6">
            <Text className="font-clash-semibold text-text-primary text-2xl leading-tight">
              Suggestions
            </Text>
            <Text className="font-inter text-text-tertiary text-base">
              Popular ways to get started
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            className="flex-row">
            {suggestionCards.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </ScrollView>
        </View>

        {/* Recent Chats Section */}
        <View className="mb-8">
          <View className="mb-4 px-6">
            <Text className="font-clash-semibold text-text-primary text-2xl leading-tight">
              Recent Chats
            </Text>
            <Text className="font-inter text-text-tertiary text-base">
              Continue where you left off
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
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
