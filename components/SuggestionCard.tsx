import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SuggestionCard as SuggestionCardType } from '~/utils/mockData';

interface SuggestionCardProps {
  suggestion: SuggestionCardType;
}

export function SuggestionCard({ suggestion }: SuggestionCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/chat',
      params: {
        initialPrompt: suggestion.title,
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="mr-4 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <View className="mb-3 flex-row items-start">
        <Text className="mr-3 text-2xl">{suggestion.emoji}</Text>
        <View className="flex-1">
          <Text className="mb-1 text-sm font-semibold text-gray-900" numberOfLines={2}>
            {suggestion.title}
          </Text>
          <Text className="text-xs text-gray-500" numberOfLines={3}>
            {suggestion.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
