import '../global.css';

import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
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
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-600">Loading...</Text>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ title: 'Details' }} />
      <Stack.Screen name="chat" options={{ title: 'Chat', headerShown: false }} />
      <Stack.Screen name="paywall" options={{ title: 'Premium', headerShown: false }} />
    </Stack>
  );
}
