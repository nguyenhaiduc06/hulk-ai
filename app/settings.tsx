import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Linking, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { CustomHeader } from '~/components/CustomHeader';
import { ModelSelectionModal } from '~/components/ModelSelectionModal';
import { useAIModelStore, useSubscriptionStore } from '~/store/store';
import { DAILY_MESSAGE_LIMIT, getMessageLimitState } from '~/utils/messageLimit';

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

  const handleDeleteAccountPress = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Delete account') },
      ]
    );
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
              {/* <SettingsItem
                icon="person-circle-outline"
                title="Subscription"
                subtitle={isPremium ? 'Premium Active' : 'Free Plan'}
                onPress={handleSubscriptionPress}
                isPremium={isPremium}
              /> */}
              <SettingsItem
                icon="chatbubble-ellipses-outline"
                title="AI Model"
                subtitle={`Current: ${currentModel?.name || 'GPT-4o Mini'}`}
                onPress={handleModelSelectionPress}
              />
              {/* <SettingsItem
                icon="download-outline"
                title="Export Data"
                subtitle="Download your conversations and data"
                onPress={handleExportDataPress}
              /> */}
              <SettingsItem
                icon="trash-outline"
                title="Delete Chat History"
                subtitle="Permanently delete your chat history"
                onPress={handleDeleteAccountPress}
                showArrow={false}
              />
            </View>
          </View>

          {/* App Preferences Section */}
          {/* <View className="mb-8">
            <Text className="mb-2 font-clash-semibold text-xl text-text-primary">
              App Preferences
            </Text>
            <View className="gap-3">
              <SettingsItem
                icon="notifications-outline"
                title="Notifications"
                subtitle="Get notified about new features and updates"
                onPress={() => {}}
                showSwitch={true}
                switchValue={notificationsEnabled}
                onSwitchChange={setNotificationsEnabled}
              />
              <SettingsItem
                icon="phone-portrait-outline"
                title="Haptic Feedback"
                subtitle="Vibrate on interactions"
                onPress={() => {}}
                showSwitch={true}
                switchValue={hapticFeedbackEnabled}
                onSwitchChange={setHapticFeedbackEnabled}
              />
            </View>
          </View> */}

          {/* Privacy & Legal Section */}
          <View className="mb-8">
            <Text className="mb-2 font-clash-semibold text-xl text-text-primary">
              Privacy & Legal
            </Text>
            <View className="gap-3">
              <SettingsItem
                icon="shield-checkmark-outline"
                title="Privacy Policy"
                subtitle="How we protect your data"
                onPress={handlePrivacyPolicyPress}
              />
              <SettingsItem
                icon="document-text-outline"
                title="Terms of Service"
                subtitle="Our terms and conditions"
                onPress={handleTermsPress}
              />
            </View>
          </View>

          {/* Support & About Section */}
          <View className="mb-8">
            <Text className="mb-2 font-clash-semibold text-xl text-text-primary">
              Support & About
            </Text>
            <View className="gap-3">
              <SettingsItem
                icon="help-circle-outline"
                title="Help & Support"
                subtitle="Get help and contact support"
                onPress={handleSupportPress}
              />
              {/* <SettingsItem
                icon="star-outline"
                title="Rate App"
                subtitle="Rate us on the App Store"
                onPress={handleRateAppPress}
              />
              <SettingsItem
                icon="share-outline"
                title="Share App"
                subtitle="Share with friends and family"
                onPress={handleShareAppPress}
              /> */}
              <SettingsItem
                icon="information-circle-outline"
                title="About"
                subtitle="Version 1.0.0"
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
        onUpgradePress={handleSubscriptionPress}
      />
    </>
  );
}
