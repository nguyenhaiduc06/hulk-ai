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

        <View className="rounded-t-3xl bg-white p-8">
          {/* Handle */}
          <View className="mb-8 h-1 w-16 self-center rounded-full bg-gray-300" />

          {/* Header */}
          <View className="mb-8 items-center">
            <View className="bg-primary-light mb-6 h-20 w-20 items-center justify-center rounded-3xl">
              <Ionicons name="chatbubble" size={36} color="#8ee04e" />
            </View>
            <Text className="font-clash-bold text-text-primary mb-3 text-center text-2xl">
              Daily Message Limit
            </Text>
            <Text className="font-inter text-text-secondary text-center text-lg">
              You have {messagesLeft} of {maxMessages} free messages remaining today
            </Text>
          </View>

          {/* Message Limit Info */}
          <View className="mb-8 rounded-3xl bg-gray-50 p-6">
            <View className="mb-4 flex-row items-center">
              <Ionicons name="information-circle" size={24} color="#8ee04e" />
              <Text className="font-clash-semibold text-text-primary ml-3 text-lg">
                Free Plan Includes:
              </Text>
            </View>
            <View className="space-y-3">
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text className="font-inter text-text-secondary ml-3 text-base">
                  {maxMessages} messages per day
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text className="font-inter text-text-secondary ml-3 text-base">
                  Basic AI models
                </Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text className="font-inter text-text-secondary ml-3 text-base">
                  Standard response times
                </Text>
              </View>
            </View>
          </View>

          {/* Premium CTA */}
          <View className="from-primary to-primary-light mb-8 rounded-3xl bg-gradient-to-r p-6">
            <View className="mb-3 flex-row items-center">
              <Ionicons name="diamond" size={24} color="white" />
              <Text className="font-clash-semibold ml-3 text-xl text-white">
                Upgrade to Premium
              </Text>
            </View>
            <Text className="font-inter mb-6 text-base text-white">
              Get unlimited messages, faster responses, and access to advanced AI models
            </Text>
            <View className="space-y-2">
              <View className="flex-row items-center">
                <Ionicons name="infinite" size={18} color="white" />
                <Text className="font-inter ml-3 text-sm text-white">Unlimited messages</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="flash" size={18} color="white" />
                <Text className="font-inter ml-3 text-sm text-white">Priority processing</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="star" size={18} color="white" />
                <Text className="font-inter ml-3 text-sm text-white">Advanced AI models</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row space-x-4">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 rounded-2xl border-2 border-gray-300 px-6 py-4">
              <Text className="font-clash-medium text-text-secondary text-center">Maybe Later</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleUpgrade}
              className="bg-primary flex-1 rounded-2xl px-6 py-4">
              <Text className="font-clash-medium text-center text-white">Upgrade Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
