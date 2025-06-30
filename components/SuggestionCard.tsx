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
      className="mr-6 w-72 rounded-3xl border-2 border-gray-100 bg-white p-6 shadow-lg">
      <View className="mb-3 flex-row items-center">
        <Text className="mr-4 text-3xl">{suggestion.emoji}</Text>
        <View className="flex-1">
          <Text
            className="font-clash-medium text-text-primary text-lg leading-tight"
            numberOfLines={2}>
            {suggestion.title}
          </Text>
        </View>
      </View>
      <Text className="font-inter text-text-secondary text-sm" numberOfLines={3}>
        {suggestion.description}
      </Text>
    </TouchableOpacity>
  );
}
