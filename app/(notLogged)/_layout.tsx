import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/native-stack/types';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="login" options={{ headerBackTitleVisible: false, headerTitle: ''}}/>
      <Stack.Screen name="register" options={{ headerBackTitleVisible: false, headerTitle: ''}}/>
      <Stack.Screen name="forgotPassword" options={{ headerBackTitleVisible: false, headerTitle: ''}}/>
    </Stack>
  );
}
