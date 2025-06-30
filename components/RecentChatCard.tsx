import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { RecentChatCard as RecentChatCardType } from '~/utils/mockData';

interface RecentChatCardProps {
  chat: RecentChatCardType;
}

export function RecentChatCard({ chat }: RecentChatCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/chat',
      params: {
        initialPrompt: chat.title,
      },
    });
  };

  const getTaskTypeColor = (taskType?: string) => {
    switch (taskType) {
      case 'Work':
        return 'bg-red-100 text-red-700';
      case 'Learning':
        return 'bg-blue-100 text-blue-700';
      case 'Finance':
        return 'bg-green-100 text-green-700';
      case 'Code Review':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="mr-6 w-80 rounded-3xl border-2 border-gray-100 bg-white p-6 shadow-lg">
      <View className="mb-3 flex-row items-start justify-between">
        <Text
          className="font-clash-semibold text-text-primary flex-1 text-lg leading-tight"
          numberOfLines={2}>
          {chat.title}
        </Text>
        {chat.taskType && (
          <View className={`rounded-2xl px-3 py-1 ${getTaskTypeColor(chat.taskType)}`}>
            <Text className="font-clash-medium text-xs">{chat.taskType}</Text>
          </View>
        )}
      </View>
      <Text className="font-inter text-text-secondary mb-4 text-sm" numberOfLines={2}>
        {chat.description}
      </Text>
      <Text className="font-inter text-text-tertiary text-xs">{chat.timestamp}</Text>
    </TouchableOpacity>
  );
}
