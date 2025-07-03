import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

import { ChatInputButton } from '~/components/ChatInputButton';
import { SuggestionCard } from '~/components/SuggestionCard';
import { RecentChatCard } from '~/components/RecentChatCard';
import { CustomHeader } from '~/components/CustomHeader';
import { suggestionCards } from '~/utils/mockData';
import { getMessageLimitState, DAILY_MESSAGE_LIMIT } from '~/utils/messageLimit';
import { useChatHistoryStore } from '~/store/store';

export default function Home() {
  const router = useRouter();
  const { sessions } = useChatHistoryStore();
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

  // Get recent sessions (last 5)
  const recentSessions = sessions.slice(0, 5);

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
        showSettingsButton={true}
        onSettingsPress={() => {
          router.push('/settings');
        }}
      />

      <ScrollView className="flex-1 bg-surface" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pb-8 pt-6">
          <Text className="font-clash-semibold text-2xl leading-tight text-text-primary">
            Welcome to Hulk AI! 👋
          </Text>
          <Text className="font-inter text-lg text-text-tertiary">How can I help you today?</Text>
        </View>

        {/* Chat Section */}
        <View className="mb-8 px-6">
          <ChatInputButton />
        </View>

        {/* Suggestions Section */}
        <View className="mb-8">
          <View className="mb-4 px-6">
            <Text className="font-clash-semibold text-2xl leading-tight text-text-primary">
              Suggestions
            </Text>
            <Text className="font-inter text-base text-text-tertiary">
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
            <Text className="font-clash-semibold text-2xl leading-tight text-text-primary">
              Recent Chats
            </Text>
            <Text className="font-inter text-base text-text-tertiary">
              Continue where you left off
            </Text>
          </View>

          {recentSessions.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
              className="flex-row">
              {recentSessions.map((session) => (
                <RecentChatCard key={session.id} session={session} />
              ))}
            </ScrollView>
          ) : (
            <View className="mx-6 rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 p-8">
              <View className="items-center">
                <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                  <Text className="text-2xl">💬</Text>
                </View>
                <Text className="mb-2 font-clash-semibold text-lg text-text-primary">
                  No conversations yet
                </Text>
                <Text className="mb-6 text-center font-inter text-sm text-text-tertiary">
                  Start your first conversation with Hulk AI to see your chat history here
                </Text>
                <TouchableOpacity
                  onPress={() => router.push('/chat')}
                  className="items-center rounded-2xl bg-primary px-6 py-3">
                  <Text className="font-clash-medium text-base text-white">Start Chatting</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </>
  );
}
