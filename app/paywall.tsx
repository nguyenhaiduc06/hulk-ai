import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Paywall() {
  const router = useRouter();

  const features = [
    {
      icon: 'infinite',
      title: 'Unlimited Messages',
      description: 'Send as many messages as you want, anytime',
    },
    {
      icon: 'flash',
      title: 'Priority Processing',
      description: 'Get faster responses with priority queue',
    },
    {
      icon: 'star',
      title: 'Advanced AI Models',
      description: 'Access to GPT-4 and other premium models',
    },
    {
      icon: 'cloud',
      title: 'Cloud Sync',
      description: 'Sync your conversations across devices',
    },
    {
      icon: 'shield-checkmark',
      title: 'Enhanced Security',
      description: 'End-to-end encryption for all conversations',
    },
    {
      icon: 'analytics',
      title: 'Usage Analytics',
      description: 'Track your AI usage and insights',
    },
  ];

  const plans = [
    {
      id: 'monthly',
      title: 'Monthly',
      price: '$9.99',
      period: 'month',
      popular: false,
      savings: null,
    },
    {
      id: 'yearly',
      title: 'Yearly',
      price: '$99.99',
      period: 'year',
      popular: true,
      savings: 'Save 17%',
    },
  ];

  const handleClose = () => {
    router.back();
  };

  const handleSubscribe = (planId: string) => {
    // TODO: Implement subscription logic
    console.log('Subscribe to plan:', planId);
    // For now, just close the screen
    router.back();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View className="flex-1 bg-gradient-to-b from-indigo-50 to-white">
        {/* Header */}
        <View className="pt-safe px-4 pb-6">
          <View className="mb-6 flex-row items-center justify-between">
            <TouchableOpacity onPress={handleClose} className="rounded-full bg-white p-2 shadow-sm">
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>
            <View className="flex-row items-center">
              <Ionicons name="diamond" size={20} color="#6366f1" />
              <Text className="ml-2 text-lg font-semibold text-gray-900">Premium</Text>
            </View>
            <View className="w-10" />
          </View>

          <View className="items-center">
            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
              <Ionicons name="rocket" size={40} color="#6366f1" />
            </View>
            <Text className="mb-2 text-center text-2xl font-bold text-gray-900">
              Unlock Unlimited AI Power
            </Text>
            <Text className="text-center text-base leading-6 text-gray-600">
              Get unlimited messages, faster responses, and access to advanced AI models
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
          {/* Features */}
          <View className="mb-8">
            <Text className="mb-4 text-lg font-semibold text-gray-900">What's included:</Text>
            <View className="space-y-4">
              {features.map((feature, index) => (
                <View key={index} className="flex-row items-start">
                  <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                    <Ionicons name={feature.icon as any} size={20} color="#6366f1" />
                  </View>
                  <View className="flex-1">
                    <Text className="mb-1 text-base font-semibold text-gray-900">
                      {feature.title}
                    </Text>
                    <Text className="text-sm text-gray-600">{feature.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Pricing Plans */}
          <View className="mb-8">
            <Text className="mb-4 text-lg font-semibold text-gray-900">Choose your plan:</Text>
            <View className="space-y-3">
              {plans.map((plan) => (
                <TouchableOpacity
                  key={plan.id}
                  onPress={() => handleSubscribe(plan.id)}
                  className={`rounded-xl border-2 p-4 ${
                    plan.popular ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white'
                  }`}>
                  <View className="mb-2 flex-row items-center justify-between">
                    <Text className="text-lg font-semibold text-gray-900">{plan.title}</Text>
                    {plan.popular && (
                      <View className="rounded-full bg-indigo-500 px-2 py-1">
                        <Text className="text-xs font-medium text-white">Most Popular</Text>
                      </View>
                    )}
                  </View>
                  <View className="flex-row items-baseline">
                    <Text className="text-3xl font-bold text-gray-900">{plan.price}</Text>
                    <Text className="ml-1 text-gray-600">/{plan.period}</Text>
                  </View>
                  {plan.savings && (
                    <Text className="mt-1 text-sm font-medium text-indigo-600">{plan.savings}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Testimonials */}
          <View className="mb-8">
            <Text className="mb-4 text-lg font-semibold text-gray-900">What users say:</Text>
            <View className="rounded-xl bg-white p-4 shadow-sm">
              <View className="mb-3 flex-row items-center">
                <View className="mr-3 h-10 w-10 rounded-full bg-gray-200" />
                <View>
                  <Text className="font-semibold text-gray-900">Sarah M.</Text>
                  <Text className="text-sm text-gray-500">Product Manager</Text>
                </View>
              </View>
              <Text className="italic text-gray-700">
                "Hulk AI Premium has transformed how I work. Unlimited messages and faster responses
                have made me 3x more productive!"
              </Text>
            </View>
          </View>

          {/* Bottom spacing */}
          <View className="h-8" />
        </ScrollView>

        {/* Bottom CTA */}
        <View className="pb-safe border-t border-gray-200 bg-white px-4 pt-4">
          <TouchableOpacity
            onPress={() => handleSubscribe('yearly')}
            className="items-center rounded-xl bg-indigo-500 py-4">
            <Text className="text-lg font-semibold text-white">Start Free Trial</Text>
            <Text className="mt-1 text-sm text-indigo-100">7-day free trial, then $99.99/year</Text>
          </TouchableOpacity>
          <Text className="mt-3 text-center text-xs text-gray-500">
            Cancel anytime. Terms and conditions apply.
          </Text>
        </View>
      </View>
    </>
  );
}
