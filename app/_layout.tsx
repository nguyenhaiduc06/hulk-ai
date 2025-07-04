import '../global.css';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { useSubscriptionStore } from '../store/store';
import { loadFonts } from '../utils/fonts';

export default function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const checkSubscriptionStatus = useSubscriptionStore((state) => state.checkSubscriptionStatus);

  useEffect(() => {
    const loadAppFonts = async () => {
      try {
        await loadFonts();
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true); // Continue without custom fonts
      }
    };

    loadAppFonts();
  }, []);

  useEffect(() => {
    // Initialize RevenueCat
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: 'appl_jjkqwhlOwQIRIHMEDRXAQxVmZNn' });
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: 'your_android_api_key' });
      // OR: if building for Amazon, be sure to follow the installation instructions then:
      // Purchases.configure({ apiKey: 'your_amazon_api_key', useAmazon: true });
    }

    // Check subscription status after RevenueCat is configured
    checkSubscriptionStatus();
  }, [checkSubscriptionStatus]);

  if (!fontsLoaded) {
    return (
      <GestureHandlerRootView className="flex-1">
        <BottomSheetModalProvider>
          <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-gray-600">Loading...</Text>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="details" options={{ title: 'Details' }} />
          <Stack.Screen name="chat" options={{ title: 'Chat', headerShown: false }} />
          <Stack.Screen name="paywall" options={{ title: 'Premium', headerShown: false }} />
          <Stack.Screen name="settings" options={{ title: 'Settings', headerShown: false }} />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
