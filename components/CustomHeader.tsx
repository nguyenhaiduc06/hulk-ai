import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MessageLimitModal } from './MessageLimitModal';

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
  const [showModal, setShowModal] = useState(false);

  const getMessageColor = () => {
    if (messagesLeft === 0) return '#ef4444'; // Red
    if (messagesLeft <= 1) return '#f59e0b'; // Amber
    return '#8ee04e'; // Green (primary)
  };

  const getMessageIcon = () => {
    return 'chatbubble';
  };

  const handleMessageIndicatorPress = () => {
    setShowModal(true);
  };

  return (
    <>
      <View className="pt-safe flex-row items-center justify-between border-b-2 border-gray-100 bg-white px-6 py-4">
        <View className="flex-1 flex-row items-center">
          {showBackButton && (
            <TouchableOpacity
              onPress={() => router.back()}
              className="mr-4 rounded-2xl bg-gray-100 p-2"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
          )}
          <Text className="font-clash-semibold text-text-primary flex-1 text-2xl" numberOfLines={1}>
            {title}
          </Text>
        </View>

        {/* Messages Left Indicator */}
        <TouchableOpacity
          onPress={handleMessageIndicatorPress}
          className="flex-row items-center rounded-2xl border-2 border-gray-200 bg-gray-100 px-4 py-3"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name={getMessageIcon() as any} size={18} color={getMessageColor()} />
          <Text className="font-clash-medium ml-2 text-sm" style={{ color: getMessageColor() }}>
            {messagesLeft}/{maxMessages}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Message Limit Modal */}
      <MessageLimitModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        messagesLeft={messagesLeft}
        maxMessages={maxMessages}
      />
    </>
  );
}
