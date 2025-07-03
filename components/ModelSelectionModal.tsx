import { Ionicons } from '@expo/vector-icons';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AIModel, useAIModelStore } from '~/store/store';

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
  console.log(models);

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
      snapPoints={['50%']}
      backdropComponent={renderBackdrop}
      onDismiss={onClose}
      backgroundStyle={{ backgroundColor: 'white' }}
      handleIndicatorStyle={{ backgroundColor: '#d1d5db' }}>
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between border-b-2 border-gray-100 px-6 py-4">
          <Text className="font-clash-semibold text-2xl text-text-primary">AI Model</Text>
          <TouchableOpacity
            onPress={() => bottomSheetModalRef.current?.dismiss()}
            className="rounded-2xl bg-gray-100 p-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="close" size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <BottomSheetScrollView contentContainerClassName="pb-safe px-4">
          <Text className="mb-6 font-inter text-base text-text-secondary">
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
                              <View className="ml-2 rounded-full bg-primary px-2 py-1">
                                <Text className="font-clash-medium text-xs text-white">
                                  Premium
                                </Text>
                              </View>
                            )}
                            {isSelected && (
                              <View className="ml-2 rounded-full bg-primary p-1">
                                <Ionicons name="checkmark" size={12} color="white" />
                              </View>
                            )}
                          </View>
                          <Text
                            className={`font-inter text-sm ${
                              isDisabled ? 'text-gray-400' : 'text-text-secondary'
                            }`}>
                            {model.description}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Premium Lock Overlay */}
                  {isDisabled && (
                    <View className="absolute inset-0 items-center justify-center rounded-3xl bg-black/10">
                      <View className="rounded-2xl bg-white px-3 py-2 shadow-lg">
                        <Text className="font-clash-medium text-xs text-text-primary">
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
          {/* {!isPremium && (
            <View className="mt-8 rounded-3xl border-2 border-primary bg-primary/5 p-6">
              <View className="mb-3 flex-row items-center">
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-2xl bg-primary">
                  <Text className="text-lg text-white">💎</Text>
                </View>
                <Text className="font-clash-semibold text-lg text-text-primary">
                  Unlock Premium Models
                </Text>
              </View>
              <Text className="mb-4 font-inter text-base text-text-secondary">
                Upgrade to Premium to access advanced AI models with enhanced capabilities, better
                reasoning, and improved performance.
              </Text>
              <TouchableOpacity
                onPress={handleUpgradePress}
                className="items-center rounded-2xl bg-primary px-6 py-4">
                <Text className="font-clash-medium text-base text-white">Upgrade to Premium</Text>
              </TouchableOpacity>
            </View>
          )} */}
        </BottomSheetScrollView>
      </View>
    </BottomSheetModal>
  );
}
