import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface CustomHeaderProps {
  title: string;
  messagesLeft: number;
  maxMessages: number;
  showBackButton?: boolean;
}

export function CustomHeader({
  title,
  messagesLeft,
  maxMessages,
  showBackButton = true,
}: CustomHeaderProps) {
  const router = useRouter();

  const getMessageColor = () => {
    if (messagesLeft === 0) return '#ef4444'; // Red
    if (messagesLeft <= 1) return '#f59e0b'; // Amber
    return '#10b981'; // Green
  };

  const getMessageIcon = () => {
    if (messagesLeft === 0) return 'close-circle';
    if (messagesLeft <= 1) return 'warning';
    return 'chatbubble';
  };

  return (
    <View className="pt-safe flex-row items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
      <View className="flex-1 flex-row items-center">
        {showBackButton && (
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-3 p-1"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
        )}
        <Text className="flex-1 text-lg font-semibold text-gray-900" numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* Messages Left Indicator */}
      <View className="flex-row items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-2">
        <Ionicons name={getMessageIcon() as any} size={16} color={getMessageColor()} />
        <Text className="ml-2 text-sm font-medium" style={{ color: getMessageColor() }}>
          {messagesLeft}/{maxMessages}
        </Text>
      </View>
    </View>
  );
}
