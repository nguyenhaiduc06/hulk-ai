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
      className="mr-4 w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <View className="mb-2 flex-row items-start justify-between">
        <Text className="flex-1 text-sm font-semibold text-gray-900" numberOfLines={2}>
          {chat.title}
        </Text>
        {chat.taskType && (
          <View className={`rounded-full px-2 py-1 ${getTaskTypeColor(chat.taskType)}`}>
            <Text className="text-xs font-medium">{chat.taskType}</Text>
          </View>
        )}
      </View>
      <Text className="mb-3 text-xs text-gray-500" numberOfLines={2}>
        {chat.description}
      </Text>
      <Text className="text-xs text-gray-400">{chat.timestamp}</Text>
    </TouchableOpacity>
  );
}
