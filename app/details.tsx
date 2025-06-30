import { Stack, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { CustomHeader } from '~/components/CustomHeader';
import { getMessageLimitState, DAILY_MESSAGE_LIMIT } from '~/utils/messageLimit';

export default function Details() {
  const { name } = useLocalSearchParams();
  const [messageLimitState, setMessageLimitState] = useState({
    messagesLeft: DAILY_MESSAGE_LIMIT,
    maxMessages: DAILY_MESSAGE_LIMIT,
    lastResetDate: new Date().toDateString(),
  });

  // Load message limit state on component mount
  useEffect(() => {
    const loadMessageLimitState = async () => {
      const state = await getMessageLimitState();
      setMessageLimitState(state);
    };
    loadMessageLimitState();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false, // Hide default header to use custom header
        }}
      />

      {/* Custom Header */}
      <CustomHeader
        title="Details"
        messagesLeft={messageLimitState.messagesLeft}
        maxMessages={messageLimitState.maxMessages}
      />

      <Container>
        <ScreenContent path="screens/details.tsx" title={`Showing details for user ${name}`} />
      </Container>
    </>
  );
}
