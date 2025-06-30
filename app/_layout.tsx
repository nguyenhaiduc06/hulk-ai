import '../global.css';

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ title: 'Details' }} />
      <Stack.Screen name="chat" options={{ title: 'Chat', headerShown: false }} />
    </Stack>
  );
}
