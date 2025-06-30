import '../global.css';

import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { loadFonts } from '../utils/fonts';

export default function Layout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
