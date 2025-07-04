import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface MessageLimitModalProps {
  visible: boolean;
  onClose: () => void;
  messagesLeft: number;
  maxMessages: number;
  isPremium?: boolean;
}

export function MessageLimitModal({
  visible,
  onClose,
  messagesLeft,
  maxMessages,
  isPremium = false,
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

  // Don't show modal for premium users
  if (isPremium) {
    return null;
  }

  const getMessageText = () => {
    if (messagesLeft === -1) {
      return 'unlimited messages';
    }
    return `${messagesLeft} of ${maxMessages} free messages remaining today`;
  };

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
          <View className="mb-6 h-20 w-20 items-center justify-center rounded-3xl bg-primary-light">
            <Ionicons name="chatbubble" size={36} color="#8ee04e" />
          </View>
          <Text className="text-center font-clash-bold text-3xl text-text-primary">
            Daily Message Limit
          </Text>
          <Text className="text-center font-inter text-lg text-text-secondary">
            You have {getMessageText()}
          </Text>
        </View>

        {/* Message Limit Info */}
        <View className="mb-8 rounded-3xl bg-gray-50 p-6">
          <Text className="font-clash-semibold text-lg text-text-primary">Free Plan Includes:</Text>
          <View className="space-y-3">
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={20} color="#6b7280" />
              <Text className="ml-1 font-inter text-base text-text-secondary">
                {maxMessages === -1 ? 'Unlimited' : maxMessages} messages per day
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={20} color="#6b7280" />
              <Text className="ml-1 font-inter text-base text-text-secondary">Basic AI models</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="checkmark-circle" size={20} color="#6b7280" />
              <Text className="ml-1 font-inter text-base text-text-secondary">
                Standard response times
              </Text>
            </View>
          </View>
        </View>

        {/* Premium CTA */}
        <View className="rounded-3xl border-2 border-primary bg-white p-6">
          <View className="flex-row items-center">
            <Ionicons name="diamond" size={20} color="#8ee04e" />
            <Text className="ml-3 font-clash-semibold text-lg text-text-primary">
              Upgrade to Premium
            </Text>
          </View>
          <Text className="mb-6 font-inter text-base text-text-secondary">
            Get unlimited messages, faster responses, and access to advanced AI models
          </Text>
          <View className="space-y-3">
            <View className="flex-row items-center">
              <Ionicons name="infinite" size={20} color="#8ee04e" />
              <Text className="ml-3 font-inter text-base text-text-primary">
                Unlimited messages
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="flash" size={20} color="#8ee04e" />
              <Text className="ml-3 font-inter text-base text-text-primary">
                Priority processing
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="star" size={20} color="#8ee04e" />
              <Text className="ml-3 font-inter text-base text-text-primary">
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
            <Text className="text-center font-clash-medium text-text-secondary">Maybe Later</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleUpgrade}
            className="h-14 flex-1 items-center justify-center rounded-2xl bg-primary">
            <Text className="text-center font-clash-medium text-white">Upgrade Now</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
