import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Paywall() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    // TODO: Implement subscription logic
    console.log(`Subscribing to ${plan} plan`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SafeAreaView className="flex-1 bg-gray-100">
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity
            onPress={handleBack}
            className="rounded-2xl bg-white/80 p-2 backdrop-blur-sm">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="font-clash-semibold text-text-primary text-xl">Premium</Text>
          <View className="w-10" />
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Hero Section */}
          <View className="mb-12 items-center">
            <View className="bg-primary mb-6 h-24 w-24 items-center justify-center rounded-3xl">
              <Ionicons name="diamond" size={48} color="white" />
            </View>
            <Text className="font-clash-bold text-text-primary text-center text-3xl">
              Unlock Premium Features
            </Text>
            <Text className="font-inter text-text-secondary text-center text-lg">
              Get unlimited access to advanced AI capabilities
            </Text>
          </View>

          {/* Testimonials */}
          <View className="mb-12">
            <Text className="font-clash-semibold text-text-primary mb-2 text-xl">
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
                  <Text className="font-inter text-text-secondary mb-3 text-base">
                    "{testimonial.text}"
                  </Text>
                  <Text className="font-clash-medium text-text-primary text-sm">
                    — {testimonial.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Features */}
          <View className="mb-12">
            <Text className="font-clash-semibold text-text-primary mb-2 text-xl">
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

          {/* Pricing */}
          <View className="mb-12">
            <Text className="font-clash-semibold text-text-primary mb-2 text-xl">
              Choose Your Plan
            </Text>

            {/* Monthly Plan */}
            <TouchableOpacity
              onPress={() => handleSubscribe('monthly')}
              className="border-primary mb-4 rounded-3xl border-2 bg-white p-6 shadow-lg">
              <View className="mb-4 flex-row items-center justify-between">
                <View>
                  <Text className="font-clash-semibold text-text-primary text-lg">Monthly</Text>
                  <Text className="font-inter text-text-secondary text-sm">
                    Perfect for trying out
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="font-clash-bold text-primary text-2xl">$9.99</Text>
                  <Text className="font-inter text-text-secondary text-sm">per month</Text>
                </View>
              </View>
              <View className="bg-primary rounded-2xl p-3">
                <Text className="font-clash-medium text-center text-white">Start Free Trial</Text>
              </View>
            </TouchableOpacity>

            {/* Yearly Plan */}
            <TouchableOpacity
              onPress={() => handleSubscribe('yearly')}
              className="bg-primary rounded-3xl p-6 shadow-lg">
              <View className="mb-4 flex-row items-center justify-between">
                <View>
                  <Text className="font-clash-semibold text-lg text-white">Yearly</Text>
                  <Text className="font-inter text-sm text-white/80">Best value - Save 17%</Text>
                </View>
                <View className="items-end">
                  <Text className="font-clash-bold text-2xl text-white">$99.99</Text>
                  <Text className="font-inter text-sm text-white/80">per year</Text>
                </View>
              </View>
              <View className="rounded-2xl bg-white/20 p-3">
                <Text className="font-clash-medium text-center text-black/40">Most Popular</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Bottom spacing */}
          <View className="h-8" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
