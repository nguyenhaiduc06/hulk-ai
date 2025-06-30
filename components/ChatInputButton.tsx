import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface ChatInputButtonProps {
  placeholder?: string;
}

export function ChatInputButton({ placeholder = 'Ask me anything...' }: ChatInputButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push('/chat');
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="w-full flex-row items-center rounded-full border border-gray-300 bg-white px-4 py-3 shadow-sm">
      <Ionicons name="chatbubble-outline" size={20} color="#6b7280" />
      <Text className="ml-3 flex-1 text-base text-gray-500">{placeholder}</Text>
      <Ionicons name="arrow-forward" size={20} color="#6b7280" />
    </TouchableOpacity>
  );
}
