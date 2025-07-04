import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSubscriptionStore } from '../store/store';

const MESSAGE_LIMIT_KEY = 'daily_message_limit';
const MESSAGE_COUNT_KEY = 'daily_message_count';
const LAST_RESET_DATE_KEY = 'last_reset_date';

export const DAILY_MESSAGE_LIMIT = 5;

export interface MessageLimitState {
  messagesLeft: number;
  maxMessages: number;
  lastResetDate: string;
  isPremium: boolean;
}

// Check if user is premium using the subscription store
export function isPremiumUser(): boolean {
  const state = useSubscriptionStore.getState();
  return state.isPremium;
}

export async function getMessageLimitState(): Promise<MessageLimitState> {
  try {
    const isPremium = isPremiumUser();

    // Premium users have unlimited messages
    if (isPremium) {
      return {
        messagesLeft: -1, // -1 indicates unlimited
        maxMessages: -1,
        lastResetDate: new Date().toDateString(),
        isPremium: true,
      };
    }

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
        isPremium: false,
      };
    }

    const count = parseInt(messageCount || '0', 10);
    const messagesLeft = Math.max(0, DAILY_MESSAGE_LIMIT - count);

    return {
      messagesLeft,
      maxMessages: DAILY_MESSAGE_LIMIT,
      lastResetDate: storedDate,
      isPremium: false,
    };
  } catch (error) {
    console.error('Error getting message limit state:', error);
    return {
      messagesLeft: DAILY_MESSAGE_LIMIT,
      maxMessages: DAILY_MESSAGE_LIMIT,
      lastResetDate: new Date().toDateString(),
      isPremium: false,
    };
  }
}

export async function incrementMessageCount(): Promise<MessageLimitState> {
  try {
    const isPremium = isPremiumUser();

    // Premium users don't have message limits
    if (isPremium) {
      return {
        messagesLeft: -1,
        maxMessages: -1,
        lastResetDate: new Date().toDateString(),
        isPremium: true,
      };
    }

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
      isPremium: false,
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
  const isPremium = isPremiumUser();

  // Premium users can always send messages
  if (isPremium) {
    return true;
  }

  const state = await getMessageLimitState();
  return state.messagesLeft > 0;
}
