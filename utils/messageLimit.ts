import AsyncStorage from '@react-native-async-storage/async-storage';

const MESSAGE_LIMIT_KEY = 'daily_message_limit';
const MESSAGE_COUNT_KEY = 'daily_message_count';
const LAST_RESET_DATE_KEY = 'last_reset_date';

export const DAILY_MESSAGE_LIMIT = 5;

export interface MessageLimitState {
  messagesLeft: number;
  maxMessages: number;
  lastResetDate: string;
}

export async function getMessageLimitState(): Promise<MessageLimitState> {
  try {
    const [messageCount, lastResetDate] = await Promise.all([
      AsyncStorage.getItem(MESSAGE_COUNT_KEY),
      AsyncStorage.getItem(LAST_RESET_DATE_KEY),
    ]);

    const today = new Date().toDateString();
    const storedDate = lastResetDate || today;

    // Reset count if it's a new day
    if (storedDate !== today) {
      await resetDailyMessageCount();
      return {
        messagesLeft: DAILY_MESSAGE_LIMIT,
        maxMessages: DAILY_MESSAGE_LIMIT,
        lastResetDate: today,
      };
    }

    const count = parseInt(messageCount || '0', 10);
    const messagesLeft = Math.max(0, DAILY_MESSAGE_LIMIT - count);

    return {
      messagesLeft,
      maxMessages: DAILY_MESSAGE_LIMIT,
      lastResetDate: storedDate,
    };
  } catch (error) {
    console.error('Error getting message limit state:', error);
    return {
      messagesLeft: DAILY_MESSAGE_LIMIT,
      maxMessages: DAILY_MESSAGE_LIMIT,
      lastResetDate: new Date().toDateString(),
    };
  }
}

export async function incrementMessageCount(): Promise<MessageLimitState> {
  try {
    const currentState = await getMessageLimitState();

    if (currentState.messagesLeft <= 0) {
      return currentState; // Already at limit
    }

    const newCount = DAILY_MESSAGE_LIMIT - currentState.messagesLeft + 1;
    await AsyncStorage.setItem(MESSAGE_COUNT_KEY, newCount.toString());

    return {
      messagesLeft: Math.max(0, DAILY_MESSAGE_LIMIT - newCount),
      maxMessages: DAILY_MESSAGE_LIMIT,
      lastResetDate: currentState.lastResetDate,
    };
  } catch (error) {
    console.error('Error incrementing message count:', error);
    return await getMessageLimitState();
  }
}

export async function resetDailyMessageCount(): Promise<void> {
  try {
    const today = new Date().toDateString();
    await Promise.all([
      AsyncStorage.setItem(MESSAGE_COUNT_KEY, '0'),
      AsyncStorage.setItem(LAST_RESET_DATE_KEY, today),
    ]);
  } catch (error) {
    console.error('Error resetting daily message count:', error);
  }
}

export async function canSendMessage(): Promise<boolean> {
  const state = await getMessageLimitState();
  return state.messagesLeft > 0;
}
