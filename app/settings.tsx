import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Linking, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { CustomHeader } from '~/components/CustomHeader';
import { ModelSelectionModal } from '~/components/ModelSelectionModal';
import { useAIModelStore, useChatHistoryStore, useSubscriptionStore } from '~/store/store';
import { DAILY_MESSAGE_LIMIT, getMessageLimitState } from '~/utils/messageLimit';
import {
  checkPremiumStatus,
  logAvailableOfferings,
  logCustomerInfo,
  testRevenueCatConnection,
} from '~/utils/revenuecat';

interface SettingsItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  isPremium?: boolean;
}

function SettingsItem({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  showSwitch = false,
  switchValue = false,
  onSwitchChange,
  isPremium = false,
}: SettingsItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center rounded-2xl bg-white p-4 shadow-sm"
      disabled={showSwitch}>
      <View className="mr-4 h-10 w-10 items-center justify-center rounded-2xl bg-primary-light">
        <Ionicons name={icon as any} size={20} color="#50b800" />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center">
          <Text className="font-clash-medium text-lg text-text-primary">{title}</Text>
          {isPremium && (
            <View className="ml-2 rounded-full bg-primary px-2 py-1">
              <Text className="font-clash-medium text-xs text-white">Premium</Text>
            </View>
          )}
        </View>
        {subtitle && <Text className="font-inter text-sm text-text-tertiary">{subtitle}</Text>}
      </View>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#e5e7eb', true: '#8ee04e' }}
          thumbColor={switchValue ? '#ffffff' : '#ffffff'}
        />
      ) : (
        showArrow && <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      )}
    </TouchableOpacity>
  );
}

export default function Settings() {
  const router = useRouter();
  const [messageLimitState, setMessageLimitState] = useState({
    messagesLeft: DAILY_MESSAGE_LIMIT,
    maxMessages: DAILY_MESSAGE_LIMIT,
    lastResetDate: new Date().toDateString(),
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [hapticFeedbackEnabled, setHapticFeedbackEnabled] = useState(true);
  const [showModelModal, setShowModelModal] = useState(false);

  const isPremium = useSubscriptionStore((state) => state.isPremium);
  const { selectedModel, setSelectedModel, getCurrentModel } = useAIModelStore();
  const { clearAllSessions } = useChatHistoryStore();
  const { checkSubscriptionStatus } = useSubscriptionStore();
  const currentModel = getCurrentModel();

  React.useEffect(() => {
    const loadMessageLimitState = async () => {
      const state = await getMessageLimitState();
      setMessageLimitState(state);
    };
    loadMessageLimitState();
  }, []);

  const handleSubscriptionPress = () => {
    if (isPremium) {
      Alert.alert(
        'Manage Subscription',
        'Your premium subscription is active. You can manage it through your app store settings.',
        [{ text: 'OK' }]
      );
    } else {
      router.push('/paywall');
    }
  };

  const handleModelSelectionPress = () => {
    setShowModelModal(true);
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    setShowModelModal(false);
  };

  const handlePrivacyPolicyPress = () => {
    Linking.openURL(
      'https://haiduc.notion.site/Privacy-Policy-Hulk-AI-22371f945420801f8083f8693e937bea'
    );
  };

  const handleTermsPress = () => {
    Linking.openURL(
      'https://haiduc.notion.site/Terms-of-Service-Hulk-AI-22371f94542080f2a829c3a1acbff643'
    );
  };

  const handleSupportPress = () => {
    Linking.openURL(
      'https://haiduc.notion.site/Hulk-AI-Support-Center-22471f94542080c6ae99cd9c4c17e678'
    );
  };

  const handleRateAppPress = () => {
    // TODO: Open app store rating
    Alert.alert('Rate App', 'Rate app feature coming soon!');
  };

  const handleShareAppPress = () => {
    // TODO: Share app functionality
    Alert.alert('Share App', 'Share app feature coming soon!');
  };

  const handleExportDataPress = () => {
    Alert.alert('Export Data', 'Data export feature coming soon!');
  };

  const handleClearChatHistory = () => {
    Alert.alert(
      'Clear Chat History',
      'Are you sure you want to delete all your chat history? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            clearAllSessions();
            Alert.alert('Success', 'All chat history has been cleared.');
          },
        },
      ]
    );
  };

  // RevenueCat debugging functions
  const handleTestRevenueCat = async () => {
    const isConnected = await testRevenueCatConnection();
    Alert.alert(
      'RevenueCat Test',
      isConnected ? 'Connection successful!' : 'Connection failed. Check logs for details.',
      [{ text: 'OK' }]
    );
  };

  const handleLogCustomerInfo = async () => {
    await logCustomerInfo();
    Alert.alert('Customer Info', 'Customer info logged to console. Check your debug logs.', [
      { text: 'OK' },
    ]);
  };

  const handleLogOfferings = async () => {
    await logAvailableOfferings();
    Alert.alert('Offerings', 'Available offerings logged to console. Check your debug logs.', [
      { text: 'OK' },
    ]);
  };

  const handleCheckPremiumStatus = async () => {
    const isPremiumStatus = await checkPremiumStatus();
    Alert.alert('Premium Status', `Premium status: ${isPremiumStatus ? 'Active' : 'Inactive'}`, [
      { text: 'OK' },
    ]);
  };

  const handleRefreshSubscription = async () => {
    await checkSubscriptionStatus();
    Alert.alert('Subscription Refreshed', 'Subscription status has been refreshed.', [
      { text: 'OK' },
    ]);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View className="flex-1 bg-gray-50">
        {/* Custom Header */}
        <CustomHeader
          title="Settings"
          messagesLeft={messageLimitState.messagesLeft}
          maxMessages={messageLimitState.maxMessages}
          showBackButton={true}
        />

        <ScrollView className="flex-1 px-6 py-4">
          {/* Account Section */}
          <View className="mb-8">
            <Text className="mb-2 font-clash-semibold text-xl text-text-primary">Account</Text>
            <View className="gap-3">
              <SettingsItem
                icon="person-circle-outline"
                title="Subscription"
                subtitle={isPremium ? 'Premium Active' : 'Free Plan'}
                onPress={handleSubscriptionPress}
                isPremium={isPremium}
              />
              <SettingsItem
                icon="chatbubble-ellipses-outline"
                title="AI Model"
                subtitle={`Current: ${currentModel?.name || 'GPT-4o Mini'}`}
                onPress={handleModelSelectionPress}
              />
              <SettingsItem
                icon="download-outline"
                title="Export Data"
                subtitle="Download your conversations and data"
                onPress={handleExportDataPress}
              />
            </View>
          </View>

          {/* RevenueCat Debug Section - Only show in development */}
          {__DEV__ && (
            <View className="mb-8">
              <Text className="mb-2 font-clash-semibold text-xl text-text-primary">
                RevenueCat Debug
              </Text>
              <View className="gap-3">
                <SettingsItem
                  icon="bug-outline"
                  title="Test Connection"
                  subtitle="Test RevenueCat connection"
                  onPress={handleTestRevenueCat}
                />
                <SettingsItem
                  icon="person-outline"
                  title="Log Customer Info"
                  subtitle="Print customer info to console"
                  onPress={handleLogCustomerInfo}
                />
                <SettingsItem
                  icon="gift-outline"
                  title="Log Offerings"
                  subtitle="Print available offerings to console"
                  onPress={handleLogOfferings}
                />
                <SettingsItem
                  icon="diamond-outline"
                  title="Check Premium Status"
                  subtitle="Check current premium status"
                  onPress={handleCheckPremiumStatus}
                />
                <SettingsItem
                  icon="refresh-outline"
                  title="Refresh Subscription"
                  subtitle="Refresh subscription status"
                  onPress={handleRefreshSubscription}
                />
              </View>
            </View>
          )}

          {/* Preferences Section */}
          <View className="mb-8">
            <Text className="mb-2 font-clash-semibold text-xl text-text-primary">Preferences</Text>
            <View className="gap-3">
              <SettingsItem
                icon="notifications-outline"
                title="Notifications"
                subtitle="Push notifications for updates"
                onPress={() => {}}
                showArrow={false}
                showSwitch={true}
                switchValue={notificationsEnabled}
                onSwitchChange={setNotificationsEnabled}
              />
              <SettingsItem
                icon="phone-portrait-outline"
                title="Haptic Feedback"
                subtitle="Feel vibrations when interacting"
                onPress={() => {}}
                showArrow={false}
                showSwitch={true}
                switchValue={hapticFeedbackEnabled}
                onSwitchChange={setHapticFeedbackEnabled}
              />
            </View>
          </View>

          {/* Data & Privacy Section */}
          <View className="mb-8">
            <Text className="mb-2 font-clash-semibold text-xl text-text-primary">
              Data & Privacy
            </Text>
            <View className="gap-3">
              <SettingsItem
                icon="trash-outline"
                title="Clear Chat History"
                subtitle="Remove all your conversations"
                onPress={handleClearChatHistory}
              />
              <SettingsItem
                icon="shield-checkmark-outline"
                title="Privacy Policy"
                subtitle="How we protect your data"
                onPress={handlePrivacyPolicyPress}
              />
              <SettingsItem
                icon="document-text-outline"
                title="Terms of Service"
                subtitle="App usage terms and conditions"
                onPress={handleTermsPress}
              />
            </View>
          </View>

          {/* Support & Feedback Section */}
          <View className="mb-8">
            <Text className="mb-2 font-clash-semibold text-xl text-text-primary">
              Support & Feedback
            </Text>
            <View className="gap-3">
              <SettingsItem
                icon="help-circle-outline"
                title="Support Center"
                subtitle="Get help and contact us"
                onPress={handleSupportPress}
              />
              <SettingsItem
                icon="star-outline"
                title="Rate App"
                subtitle="Rate us on the App Store"
                onPress={handleRateAppPress}
              />
              <SettingsItem
                icon="share-outline"
                title="Share App"
                subtitle="Tell your friends about us"
                onPress={handleShareAppPress}
              />
            </View>
          </View>

          {/* App Info */}
          <View className="mb-8">
            <Text className="mb-2 font-clash-semibold text-xl text-text-primary">App Info</Text>
            <View className="gap-3">
              <SettingsItem
                icon="information-circle-outline"
                title="Version"
                subtitle="1.0.0"
                onPress={() => {}}
                showArrow={false}
              />
            </View>
          </View>

          {/* Bottom spacing */}
          <View className="h-8" />
        </ScrollView>
      </View>

      {/* Model Selection Modal */}
      <ModelSelectionModal
        visible={showModelModal}
        onClose={() => setShowModelModal(false)}
        selectedModel={selectedModel}
        onModelSelect={handleModelSelect}
        isPremium={isPremium}
        onUpgradePress={() => router.push('/paywall')}
      />
    </>
  );
}
