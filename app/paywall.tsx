import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSubscriptionStore } from '~/store/store';

export default function Paywall() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const setPremium = useSubscriptionStore((state) => state.setPremium);

  const handleBack = () => {
    router.back();
  };

  const handleSubscribe = async (plan: 'monthly' | 'yearly') => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);

      // Mock successful payment
      Alert.alert(
        'Payment Successful! 🎉',
        `Your ${plan} subscription has been activated. You now have unlimited messages!`,
        [
          {
            text: 'Start Using Premium',
            onPress: () => {
              // Update subscription status
              setPremium(plan);
              router.back();
            },
          },
        ]
      );
    }, 2000); // 2 second delay to simulate processing
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

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

          {/* Testimonials */}
          <View className="mb-12">
            <Text className="mb-2 font-clash-semibold text-xl text-text-primary">
              What Users Say
            </Text>
            <View className="gap-2">
              {[
                {
                  name: 'Sarah M.',
                  text: 'Premium features have transformed how I work. The unlimited messages are a game-changer!',
                },
                {
                  name: 'Alex K.',
                  text: 'Worth every penny. The advanced AI models provide incredible insights.',
                },
                {
                  name: 'Maria L.',
                  text: 'Customer support is amazing. They helped me get the most out of the platform.',
                },
              ].map((testimonial, index) => (
                <View key={index} className="rounded-3xl bg-white p-6 shadow-lg">
                  <Text className="mb-3 font-inter text-base text-text-secondary">
                    "{testimonial.text}"
                  </Text>
                  <Text className="font-clash-medium text-sm text-text-primary">
                    — {testimonial.name}
                  </Text>
                </View>
              ))}
            </View>
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

            <View className="items-center rounded-3xl bg-white p-6 shadow-lg">
              <Text className="mb-2 font-clash-medium text-lg text-text-primary">
                Premium plans are coming soon!
              </Text>
              <Text className="text-center font-inter text-base text-text-secondary">
                We will add subscription options in our next updates. Stay tuned for more features
                and ways to unlock unlimited access.
              </Text>
            </View>
          </View>

          {/* Bottom spacing */}
          <View className="h-8" />
        </ScrollView>
      </View>
    </>
  );
}
