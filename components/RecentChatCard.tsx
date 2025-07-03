import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ChatSession, useChatHistoryStore } from '~/store/store';

interface RecentChatCardProps {
  session: ChatSession;
}

export function RecentChatCard({ session }: RecentChatCardProps) {
  const router = useRouter();
  const { deleteSession } = useChatHistoryStore();

  const handlePress = () => {
    router.push({
      pathname: '/chat',
      params: {
        sessionId: session.id,
      },
    });
  };

  const handleLongPress = () => {
    Alert.alert(
      'Delete Chat',
      `Are you sure you want to delete "${session.title}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteSession(session.id),
        },
      ]
    );
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} min ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const getLastMessagePreview = () => {
    const lastMessage = session.messages[session.messages.length - 1];
    if (!lastMessage) return 'No messages yet';
    return lastMessage.content.slice(0, 100) + (lastMessage.content.length > 100 ? '...' : '');
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onLongPress={handleLongPress}
      className="mr-6 w-80 rounded-3xl border-2 border-gray-100 bg-white p-6 shadow-lg">
      <View className="mb-3 flex-row items-start justify-between">
        <Text
          className="flex-1 font-clash-medium text-lg leading-tight text-text-primary"
          numberOfLines={2}>
          {session.title}
        </Text>
        <View className="rounded-2xl bg-gray-100 px-3 py-1">
          <Text className="font-clash-medium text-xs text-gray-700">
            {session.messages.length} msg{session.messages.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>
      <Text className="mb-4 font-inter text-sm text-text-secondary" numberOfLines={2}>
        {getLastMessagePreview()}
      </Text>
      <Text className="font-inter text-xs text-text-tertiary">
        {formatTimestamp(session.updatedAt)}
      </Text>
    </TouchableOpacity>
  );
}
