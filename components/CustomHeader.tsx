import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useAIModelStore, useSubscriptionStore } from '~/store/store';
import { MessageLimitModal } from './MessageLimitModal';
import { ModelSelectionModal } from './ModelSelectionModal';
import { PremiumInfoModal } from './PremiumInfoModal';

interface CustomHeaderProps {
  title: string;
  messagesLeft: number;
  maxMessages: number;
  showBackButton?: boolean;
  showModelSelector?: boolean;
  showSettingsButton?: boolean;
  onUpgradePress?: () => void;
  onSettingsPress?: () => void;
}

export function CustomHeader({
  title,
  messagesLeft,
  maxMessages,
  showBackButton = true,
  showModelSelector = false,
  showSettingsButton = false,
  onUpgradePress,
  onSettingsPress,
}: CustomHeaderProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showModelModal, setShowModelModal] = useState(false);
  const isPremium = useSubscriptionStore((state) => state.isPremium);
  const { selectedModel, setSelectedModel, models } = useAIModelStore();

  const getMessageColor = () => {
    if (isPremium || messagesLeft === -1) return '#8ee04e'; // Green for premium users or unlimited
    if (messagesLeft === 0) return '#ef4444'; // Red
    if (messagesLeft <= 1) return '#f59e0b'; // Amber
    return '#8ee04e'; // Green (primary)
  };

  const getMessageIcon = () => {
    if (isPremium || messagesLeft === -1) return 'diamond';
    return 'chatbubble';
  };

  const getMessageText = () => {
    if (isPremium || messagesLeft === -1) return 'Premium';
    return `${messagesLeft}/${maxMessages}`;
  };

  const handleMessageIndicatorPress = () => {
    if (isPremium || messagesLeft === -1) {
      setShowPremiumModal(true);
    } else {
      setShowModal(true);
    }
  };

  const handleModelSelectorPress = () => {
    setShowModelModal(true);
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    setShowModelModal(false);
  };

  const getSelectedModelName = () => {
    const model = models.find((m) => m.id === selectedModel);
    return model?.name || 'GPT-4o Mini';
  };

  return (
    <>
      <View className="pt-safe flex-row items-center justify-between border-b-2 border-gray-100 bg-white px-6 py-4">
        <View className="flex-1 flex-row items-center">
          {showBackButton && (
            <TouchableOpacity
              onPress={() => router.back()}
              className="mr-4 h-10 w-10 items-center justify-center rounded-2xl bg-gray-100"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
          )}
          {showModelSelector ? (
            <TouchableOpacity
              onPress={handleModelSelectorPress}
              className="mr-4 h-10 flex-1 flex-row items-center rounded-2xl bg-gray-100 px-4"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="sparkles" size={16} color="#374151" />
              <Text
                className="ml-2 flex-1 font-clash-medium text-lg text-text-primary"
                numberOfLines={1}>
                {getSelectedModelName()}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#374151" />
            </TouchableOpacity>
          ) : (
            <Text
              className="flex-1 font-clash-semibold text-2xl text-text-primary"
              numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>

        <View className="flex-row items-center gap-2">
          {/* Messages Left Indicator */}
          {/* <TouchableOpacity
            onPress={handleMessageIndicatorPress}
            className="h-10 flex-row items-center rounded-2xl bg-gray-100 px-4"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name={getMessageIcon() as any} size={18} color={getMessageColor()} />
            <Text className="ml-2 font-clash-medium text-base" style={{ color: getMessageColor() }}>
              {getMessageText()}
            </Text>
          </TouchableOpacity> */}

          {/* Settings Button */}
          {showSettingsButton && (
            <TouchableOpacity
              onPress={onSettingsPress}
              className="h-10 w-10 items-center justify-center rounded-2xl bg-gray-100"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="settings-outline" size={20} color="#374151" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Message Limit Modal */}
      <MessageLimitModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        messagesLeft={messagesLeft}
        maxMessages={maxMessages}
        isPremium={isPremium}
      />

      {/* Premium Info Modal */}
      <PremiumInfoModal visible={showPremiumModal} onClose={() => setShowPremiumModal(false)} />

      {/* Model Selection Modal */}
      <ModelSelectionModal
        visible={showModelModal}
        onClose={() => setShowModelModal(false)}
        selectedModel={selectedModel}
        onModelSelect={handleModelSelect}
        isPremium={isPremium}
        onUpgradePress={onUpgradePress}
      />
    </>
  );
}
