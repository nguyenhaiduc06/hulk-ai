import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Details() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SafeAreaView className="bg-surface flex-1">
        {/* Custom Header */}
        <View className="flex-row items-center justify-between border-b-2 border-gray-100 bg-white px-6 py-4">
          <TouchableOpacity onPress={handleBack} className="rounded-2xl bg-gray-100 p-2">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="font-clash-semibold text-text-primary text-xl">Details</Text>
          <View className="w-10" />
        </View>

        <View className="flex-1 px-6 py-8">
          <View className="mb-12 items-center">
            <View className="bg-primary mb-6 h-24 w-24 items-center justify-center rounded-3xl">
              <Ionicons name="information-circle" size={48} color="white" />
            </View>
            <Text className="font-clash-bold text-text-primary mb-4 text-center text-3xl">
              About Hulk AI
            </Text>
            <Text className="font-inter text-text-secondary text-center text-lg">
              Your friendly AI assistant for everyday tasks
            </Text>
          </View>

          <View className="space-y-6">
            <View className="rounded-3xl bg-white p-6 shadow-lg">
              <Text className="font-clash-semibold text-text-primary mb-3 text-lg">Features</Text>
              <Text className="font-inter text-text-secondary text-base">
                Hulk AI helps you with work, personal tasks, health, learning, and finance through
                natural conversation.
              </Text>
            </View>

            <View className="rounded-3xl bg-white p-6 shadow-lg">
              <Text className="font-clash-semibold text-text-primary mb-3 text-lg">Technology</Text>
              <Text className="font-inter text-text-secondary text-base">
                Powered by OpenAI's GPT-4.1-nano model for intelligent and helpful responses.
              </Text>
            </View>

            <View className="rounded-3xl bg-white p-6 shadow-lg">
              <Text className="font-clash-semibold text-text-primary mb-3 text-lg">Privacy</Text>
              <Text className="font-inter text-text-secondary text-base">
                Your conversations are private and secure. We don't store or share your personal
                data.
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
