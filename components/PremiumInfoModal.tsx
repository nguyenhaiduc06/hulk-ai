import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

interface PremiumInfoModalProps {
  visible: boolean;
  onClose: () => void;
}

export function PremiumInfoModal({ visible, onClose }: PremiumInfoModalProps) {
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
          <View className="bg-primary mb-6 h-20 w-20 items-center justify-center rounded-3xl">
            <Ionicons name="diamond" size={36} color="white" />
          </View>
          <Text className="font-clash-bold text-text-primary text-center text-3xl">
            Premium Active
          </Text>
          <Text className="font-inter text-text-tertiary text-center text-lg">
            You have unlimited access to all premium features
          </Text>
        </View>

        {/* Premium Features */}
        <View className="mb-8">
          <Text className="font-clash-semibold text-text-primary mb-2 text-xl">
            Your Premium Benefits
          </Text>
          <View className="rounded-3xl bg-gray-50 p-6">
            {[
              { icon: 'infinite', title: 'Unlimited Messages', description: 'No daily limits' },
              { icon: 'flash', title: 'Priority Processing', description: 'Faster responses' },
              { icon: 'star', title: 'Advanced AI Models', description: 'GPT-4 and beyond' },
              {
                icon: 'document-text',
                title: 'File Processing',
                description: 'Upload and analyze files',
              },
              {
                icon: 'color-palette',
                title: 'Custom Themes',
                description: 'Personalize your experience',
              },
              {
                icon: 'shield-checkmark',
                title: 'Priority Support',
                description: '24/7 customer service',
              },
            ].map((feature, index) => (
              <View key={index} className={`flex-row items-center ${index !== 0 ? 'mt-4' : ''}`}>
                <View className="bg-primary-light mr-4 h-12 w-12 items-center justify-center rounded-2xl">
                  <Ionicons name={feature.icon as any} size={24} color="#50b800" />
                </View>
                <View className="flex-1">
                  <Text className="font-clash-medium text-text-primary text-lg">
                    {feature.title}
                  </Text>
                  <Text className="font-inter text-text-tertiary text-sm">
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Action Button */}
        <View className="mt-8">
          <TouchableOpacity
            onPress={handleClose}
            className="bg-primary h-14 items-center justify-center rounded-2xl">
            <Text className="font-clash-medium text-center text-white">Got it!</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
