import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { PurchasesPackage } from 'react-native-purchases';
import { useSubscriptionStore } from '~/store/store';

export default function Paywall() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    isPremium,
    offerings,
    isLoading,
    getOfferings,
    purchasePackage,
    checkSubscriptionStatus,
  } = useSubscriptionStore();

  useEffect(() => {
    // Check subscription status when component mounts
    checkSubscriptionStatus();
    getOfferings();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handlePurchase = async (packageToPurchase: PurchasesPackage) => {
    setIsProcessing(true);

    try {
      const success = await purchasePackage(packageToPurchase);

      if (success) {
        Alert.alert(
          'Payment Successful! 🎉',
          'Your subscription has been activated. You now have unlimited messages!',
          [
            {
              text: 'Start Using Premium',
              onPress: () => {
                router.back();
              },
            },
          ]
        );
      } else {
        Alert.alert(
          'Purchase Failed',
          'Something went wrong with your purchase. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Purchase error:', error);
      Alert.alert(
        'Purchase Error',
        'There was an error processing your purchase. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // If user is already premium, show different content
  if (isPremium) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="pt-safe flex-1 bg-gray-100">
          <View className="flex-row items-center justify-between px-6 py-4">
            <TouchableOpacity
              onPress={handleBack}
              className="rounded-2xl bg-white/80 p-2 backdrop-blur-sm">
              <Ionicons name="arrow-back" size={24} color="#374151" />
            </TouchableOpacity>
            <Text className="font-clash-semibold text-xl text-text-primary">Premium</Text>
            <View className="w-10" />
          </View>

          <View className="flex-1 items-center justify-center px-6">
            <View className="mb-6 h-24 w-24 items-center justify-center rounded-3xl bg-primary">
              <Ionicons name="checkmark-circle" size={48} color="white" />
            </View>
            <Text className="text-center font-clash-bold text-3xl text-text-primary">
              You're Premium! 🎉
            </Text>
            <Text className="text-center font-inter text-lg text-text-secondary">
              Enjoy unlimited access to all premium features
            </Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View className="pt-safe flex-1 bg-gray-100">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity
            onPress={handleBack}
            className="rounded-2xl bg-white/80 p-2 backdrop-blur-sm">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="font-clash-semibold text-xl text-text-primary">Premium</Text>
          <View className="w-10" />
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View className="mb-12 items-center">
            <View className="mb-6 h-24 w-24 items-center justify-center rounded-3xl bg-primary">
              <Ionicons name="diamond" size={48} color="white" />
            </View>
            <Text className="text-center font-clash-bold text-3xl text-text-primary">
              Unlock Premium Features
            </Text>
            <Text className="text-center font-inter text-lg text-text-secondary">
              Get unlimited access to advanced AI capabilities
            </Text>
          </View>

          {/* Features */}
          <View className="mb-12">
            <Text className="mb-2 font-clash-semibold text-xl text-text-primary">
              What's Included
            </Text>
            <View className="rounded-3xl bg-white p-6 shadow-lg">
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
                  <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-primary-light">
                    <Ionicons name={feature.icon as any} size={24} color="#50b800" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-clash-medium text-lg text-text-primary">
                      {feature.title}
                    </Text>
                    <Text className="font-inter text-sm text-text-tertiary">
                      {feature.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Pricing */}
          <View className="mb-12">
            <Text className="mb-2 font-clash-semibold text-xl text-text-primary">
              Choose Your Plan
            </Text>

            {isLoading ? (
              <View className="items-center rounded-3xl bg-white p-6 shadow-lg">
                <Text className="font-inter text-base text-text-secondary">
                  Loading subscription options...
                </Text>
              </View>
            ) : offerings && offerings.length > 0 ? (
              <View className="gap-4">
                {offerings[0]?.availablePackages.map((pkg: PurchasesPackage) => (
                  <View key={pkg.identifier} className="rounded-3xl bg-white p-6 shadow-lg">
                    <View className="mb-4 flex-row items-center justify-between">
                      <View>
                        <Text className="font-clash-semibold text-xl text-text-primary">
                          {pkg.product.title}
                        </Text>
                        <Text className="font-inter text-sm text-text-secondary">
                          {pkg.product.description}
                        </Text>
                      </View>
                      <View className="items-end">
                        <Text className="font-clash-bold text-2xl text-primary">
                          {pkg.product.priceString}
                        </Text>
                        <Text className="font-inter text-xs text-text-tertiary">
                          {pkg.product.subscriptionPeriod}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={() => handlePurchase(pkg)}
                      disabled={isProcessing}
                      className={`rounded-2xl bg-primary px-6 py-4 ${isProcessing ? 'opacity-50' : ''}`}>
                      <Text className="text-center font-clash-semibold text-lg text-white">
                        {isProcessing ? 'Processing...' : 'Subscribe Now'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : (
              <View className="items-center rounded-3xl bg-white p-6 shadow-lg">
                <Text className="mb-2 font-clash-medium text-lg text-text-primary">
                  No subscription options available
                </Text>
                <Text className="text-center font-inter text-base text-text-secondary">
                  Please check your internet connection and try again.
                </Text>
              </View>
            )}
          </View>

          {/* Bottom spacing */}
          <View className="h-8" />
        </ScrollView>
      </View>
    </>
  );
}
