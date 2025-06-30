import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChatInputButton } from '~/components/ChatInputButton';
import { SuggestionCard } from '~/components/SuggestionCard';
import { RecentChatCard } from '~/components/RecentChatCard';
import { suggestionCards, recentChats } from '~/utils/mockData';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
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
    </SafeAreaView>
  );
}
