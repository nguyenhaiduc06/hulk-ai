import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'ClashGrotesk-Extralight': require('../assets/fonts/ClashGrotesk-Extralight.otf'),
    'ClashGrotesk-Light': require('../assets/fonts/ClashGrotesk-Light.otf'),
    'ClashGrotesk-Regular': require('../assets/fonts/ClashGrotesk-Regular.otf'),
    'ClashGrotesk-Medium': require('../assets/fonts/ClashGrotesk-Medium.otf'),
    'ClashGrotesk-Semibold': require('../assets/fonts/ClashGrotesk-Semibold.otf'),
    'ClashGrotesk-Bold': require('../assets/fonts/ClashGrotesk-Bold.otf'),
  });
};

export const fontFamily = {
  clashExtralight: 'ClashGrotesk-Extralight',
  clashLight: 'ClashGrotesk-Light',
  clashRegular: 'ClashGrotesk-Regular',
  clashMedium: 'ClashGrotesk-Medium',
  clashSemibold: 'ClashGrotesk-Semibold',
  clashBold: 'ClashGrotesk-Bold',
  inter: 'Inter',
};
