import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Callbacks
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  const handleUpgrade = () => {
    bottomSheetModalRef.current?.dismiss();
    router.push('/paywall');
  };

  const handleClose = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
    ),
    []
  );

  // Show/hide bottom sheet based on visible prop
  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
      handleIndicatorStyle={{
        backgroundColor: '#d1d5db',
        width: 64,
        height: 4,
      }}>
      <BottomSheetView className="pb-safe flex-1 px-8">
        {/* Header */}
        <View className="mb-8 items-center">
          <View className="bg-primary-light mb-6 h-20 w-20 items-center justify-center rounded-3xl">
            <Ionicons name="chatbubble" size={36} color="#8ee04e" />
          </View>
          <Text className="font-clash-bold text-text-primary text-center text-3xl">
            Daily Message Limit
          </Text>
          <Text className="font-inter text-text-secondary text-center text-lg">
            You have {messagesLeft} of {maxMessages} free messages remaining today
          </Text>
        </View>

        {/* Message Limit Info */}
        <View className="mb-8 rounded-3xl bg-gray-50 p-6">
          <Text className="font-clash-semibold text-text-primary text-lg">Free Plan Includes:</Text>
          <View className="space-y-3">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={20} color="#6b7280" />
              <Text className="font-inter text-text-secondary ml-1 text-base">
                {maxMessages} messages per day
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={20} color="#6b7280" />
              <Text className="font-inter text-text-secondary ml-1 text-base">Basic AI models</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={20} color="#6b7280" />
              <Text className="font-inter text-text-secondary ml-1 text-base">
                Standard response times
              </Text>
            </View>
          </View>
        </View>

        {/* Premium CTA */}
        <View className="border-primary rounded-3xl border-2 bg-white p-6">
          <View className="flex-row items-center">
            <Ionicons name="diamond" size={20} color="#8ee04e" />
            <Text className="font-clash-semibold text-text-primary ml-3 text-lg">
              Upgrade to Premium
            </Text>
          </View>
          <Text className="text-text-secondary font-inter mb-6 text-base">
            Get unlimited messages, faster responses, and access to advanced AI models
          </Text>
          <View className="space-y-3">
            <View className="flex-row items-center">
              <Ionicons name="infinite" size={20} color="#8ee04e" />
              <Text className="font-inter text-text-primary ml-3 text-base">
                Unlimited messages
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="flash" size={20} color="#8ee04e" />
              <Text className="font-inter text-text-primary ml-3 text-base">
                Priority processing
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="star" size={20} color="#8ee04e" />
              <Text className="font-inter text-text-primary ml-3 text-base">
                Advanced AI models
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mt-8 flex-row gap-2">
          <TouchableOpacity
            onPress={handleClose}
            className="h-14 flex-1 items-center justify-center rounded-2xl border-2 border-gray-300">
            <Text className="font-clash-medium text-text-secondary text-center">Maybe Later</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleUpgrade}
            className="bg-primary h-14 flex-1 items-center justify-center rounded-2xl">
            <Text className="font-clash-medium text-center text-white">Upgrade Now</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
