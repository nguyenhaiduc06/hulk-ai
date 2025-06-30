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
      className="w-full flex-row items-center rounded-3xl border-2 border-gray-200 bg-white px-6 py-4 shadow-lg">
      <View className="bg-primary mr-4 h-8 w-8 items-center justify-center rounded-full">
        <Ionicons name="chatbubble" size={18} color="white" />
      </View>
      <Text className="text-text-secondary font-inter flex-1 text-lg">{placeholder}</Text>
      <View className="bg-primary h-8 w-8 items-center justify-center rounded-full">
        <Ionicons name="arrow-forward" size={18} color="white" />
      </View>
    </TouchableOpacity>
  );
}
