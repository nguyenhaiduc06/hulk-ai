import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useAIModelStore, AIModel } from '~/store/store';

interface ModelSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  selectedModel: string;
  onModelSelect: (modelId: string) => void;
  isPremium: boolean;
  onUpgradePress?: () => void;
}

export function ModelSelectionModal({
  visible,
  onClose,
  selectedModel,
  onModelSelect,
  isPremium,
  onUpgradePress,
}: ModelSelectionModalProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['75%'], []);
  const { models } = useAIModelStore();

  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} />
    ),
    []
  );

  const handleModelSelect = (modelId: string) => {
    onModelSelect(modelId);
    bottomSheetModalRef.current?.dismiss();
  };

  const handleUpgradePress = () => {
    bottomSheetModalRef.current?.dismiss();
    onUpgradePress?.();
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      backdropComponent={renderBackdrop}
      onDismiss={onClose}
      backgroundStyle={{ backgroundColor: 'white' }}
      handleIndicatorStyle={{ backgroundColor: '#d1d5db' }}>
      <BottomSheetView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between border-b-2 border-gray-100 px-6 py-4">
          <Text className="font-clash-semibold text-text-primary text-2xl">AI Model</Text>
          <TouchableOpacity
            onPress={() => bottomSheetModalRef.current?.dismiss()}
            className="rounded-2xl bg-gray-100 p-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="close" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView className="flex-1" contentContainerClassName="p-4 mb-safe">
          <Text className="font-inter text-text-secondary mb-6 text-base">
            Choose the AI model that best fits your needs. Premium models offer enhanced
            capabilities and better performance.
          </Text>

          {/* Model List */}
          <View className="gap-4">
            {models.map((model: AIModel) => {
              const isSelected = selectedModel === model.id;
              const isDisabled = model.isPremium && !isPremium;

              return (
                <TouchableOpacity
                  key={model.id}
                  onPress={() => !isDisabled && onModelSelect(model.id)}
                  disabled={isDisabled}
                  className={`rounded-3xl border-2 p-6 ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : isDisabled
                        ? 'border-gray-200 bg-gray-50'
                        : 'border-gray-200 bg-white'
                  }`}>
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1">
                      <View className="mb-2 flex-row items-center">
                        <Text className="mr-3 text-3xl">{model.icon}</Text>
                        <View className="flex-1">
                          <View className="flex-row items-center">
                            <Text
                              className={`font-clash-medium text-lg ${
                                isDisabled ? 'text-gray-400' : 'text-text-primary'
                              }`}>
                              {model.name}
                            </Text>
                            {model.isPremium && (
                              <View className="bg-primary ml-2 rounded-full px-2 py-1">
                                <Text className="font-clash-medium text-xs text-white">
                                  Premium
                                </Text>
                              </View>
                            )}
                            {isSelected && (
                              <View className="bg-primary ml-2 rounded-full p-1">
                                <Ionicons name="checkmark" size={12} color="white" />
                              </View>
                            )}
                          </View>
                          <Text
                            className={`font-inter text-sm ${
                              isDisabled ? 'text-gray-400' : 'text-text-secondary'
                            }`}>
                            {model.systemPrompt.length > 80
                              ? `${model.systemPrompt.substring(0, 80)}...`
                              : model.systemPrompt}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Premium Lock Overlay */}
                  {isDisabled && (
                    <View className="absolute inset-0 items-center justify-center rounded-3xl bg-black/10">
                      <View className="rounded-2xl bg-white px-3 py-2 shadow-lg">
                        <Text className="font-clash-medium text-text-primary text-xs">
                          Premium Required
                        </Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Premium Upgrade CTA */}
          {!isPremium && (
            <View className="border-primary bg-primary/5 mt-8 rounded-3xl border-2 p-6">
              <View className="mb-3 flex-row items-center">
                <View className="bg-primary mr-3 h-10 w-10 items-center justify-center rounded-2xl">
                  <Text className="text-lg text-white">💎</Text>
                </View>
                <Text className="font-clash-semibold text-text-primary text-lg">
                  Unlock Premium Models
                </Text>
              </View>
              <Text className="font-inter text-text-secondary mb-4 text-base">
                Upgrade to Premium to access advanced AI models with enhanced capabilities, better
                reasoning, and improved performance.
              </Text>
              <TouchableOpacity
                onPress={handleUpgradePress}
                className="bg-primary items-center rounded-2xl px-6 py-4">
                <Text className="font-clash-medium text-base text-white">Upgrade to Premium</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </BottomSheetView>
    </BottomSheetModal>
  );
}
