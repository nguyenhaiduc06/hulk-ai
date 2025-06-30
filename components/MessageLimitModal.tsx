import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface MessageLimitModalProps {
  visible: boolean;
  onClose: () => void;
  messagesLeft: number;
  maxMessages: number;
}

export function MessageLimitModal({
  visible,
  onClose,
  messagesLeft,
  maxMessages,
}: MessageLimitModalProps) {
  const router = useRouter();

  const handleUpgrade = () => {
    onClose();
    router.push('/paywall');
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/50">
        <TouchableOpacity className="flex-1" onPress={onClose} activeOpacity={1} />

        <View className="rounded-t-3xl bg-white p-6">
          {/* Handle */}
          <View className="mb-6 h-1 w-12 self-center rounded-full bg-gray-300" />

          {/* Header */}
          <View className="mb-6 items-center">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
              <Ionicons name="chatbubble" size={32} color="#6366f1" />
            </View>
            <Text className="mb-2 text-center text-xl font-bold text-gray-900">
              Daily Message Limit
            </Text>
            <Text className="text-center text-gray-600">
              You have {messagesLeft} of {maxMessages} free messages remaining today
            </Text>
          </View>

          {/* Message Limit Info */}
          <View className="mb-6 rounded-xl bg-gray-50 p-4">
            <View className="mb-3 flex-row items-center">
              <Ionicons name="information-circle" size={20} color="#6366f1" />
              <Text className="ml-2 text-base font-semibold text-gray-900">
                Free Plan Includes:
              </Text>
            </View>
            <View className="space-y-2">
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                <Text className="ml-2 text-sm text-gray-700">{maxMessages} messages per day</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                <Text className="ml-2 text-sm text-gray-700">Basic AI models</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                <Text className="ml-2 text-sm text-gray-700">Standard response times</Text>
              </View>
            </View>
          </View>

          {/* Premium CTA */}
          <View className="mb-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
            <View className="mb-2 flex-row items-center">
              <Ionicons name="diamond" size={20} color="white" />
              <Text className="ml-2 text-lg font-semibold text-white">Upgrade to Premium</Text>
            </View>
            <Text className="mb-4 text-sm text-indigo-100">
              Get unlimited messages, faster responses, and access to advanced AI models
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="infinite" size={16} color="white" />
              <Text className="ml-2 text-sm text-white">Unlimited messages</Text>
            </View>
            <View className="mt-1 flex-row items-center">
              <Ionicons name="flash" size={16} color="white" />
              <Text className="ml-2 text-sm text-white">Priority processing</Text>
            </View>
            <View className="mt-1 flex-row items-center">
              <Ionicons name="star" size={16} color="white" />
              <Text className="ml-2 text-sm text-white">Advanced AI models</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3">
              <Text className="text-center font-semibold text-gray-700">Maybe Later</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUpgrade}
              className="flex-1 rounded-xl bg-indigo-500 px-4 py-3">
              <Text className="text-center font-semibold text-white">Upgrade Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
