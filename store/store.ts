import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface BearState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

export const useStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));

interface SubscriptionState {
  isPremium: boolean;
  subscriptionType: 'monthly' | 'yearly' | null;
  subscriptionDate: string | null;
  setPremium: (type: 'monthly' | 'yearly') => void;
  resetSubscription: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      isPremium: false,
      subscriptionType: null,
      subscriptionDate: null,
      setPremium: (type: 'monthly' | 'yearly') =>
        set({
          isPremium: true,
          subscriptionType: type,
          subscriptionDate: new Date().toISOString(),
        }),
      resetSubscription: () =>
        set({
          isPremium: false,
          subscriptionType: null,
          subscriptionDate: null,
        }),
    }),
    {
      name: 'subscription-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
