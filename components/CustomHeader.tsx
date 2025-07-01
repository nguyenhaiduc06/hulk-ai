import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MessageLimitModal } from './MessageLimitModal';
import { PremiumInfoModal } from './PremiumInfoModal';
import { ModelSelectionModal } from './ModelSelectionModal';
import { useSubscriptionStore, useAIModelStore } from '~/store/store';

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
    if (isPremium) return '#8ee04e'; // Green for premium users
    if (messagesLeft === 0) return '#ef4444'; // Red
    if (messagesLeft <= 1) return '#f59e0b'; // Amber
    return '#8ee04e'; // Green (primary)
  };

  const getMessageIcon = () => {
    if (isPremium) return 'diamond';
    return 'chatbubble';
  };

  const getMessageText = () => {
    if (isPremium) return 'Premium';
    return `${messagesLeft}/${maxMessages}`;
  };

  const handleMessageIndicatorPress = () => {
    if (isPremium) {
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
              className="mr-4 rounded-2xl bg-gray-100 p-2"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
          )}
          {showModelSelector ? (
            <TouchableOpacity
              onPress={handleModelSelectorPress}
              className="flex-1 flex-row items-center rounded-2xl bg-gray-100 px-4 py-3"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="settings-outline" size={20} color="#374151" />
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
          <TouchableOpacity
            onPress={handleMessageIndicatorPress}
            className={`flex-row items-center rounded-2xl border-2 px-4 py-2 ${
              isPremium ? 'border-primary bg-primary' : 'border-gray-200 bg-gray-100'
            }`}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons
              name={getMessageIcon() as any}
              size={18}
              color={isPremium ? 'white' : getMessageColor()}
            />
            <Text
              className="ml-2 font-clash-medium text-base"
              style={{ color: isPremium ? 'white' : getMessageColor() }}>
              {getMessageText()}
            </Text>
          </TouchableOpacity>

          {/* Settings Button */}
          {showSettingsButton && (
            <TouchableOpacity
              onPress={onSettingsPress}
              className="rounded-2xl bg-gray-100 p-2"
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
