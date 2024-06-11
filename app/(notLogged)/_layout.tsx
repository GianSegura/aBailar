import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="login" options={{ headerBackTitleVisible: false, headerTitle: ''}}/>
      <Stack.Screen name="register" options={{ headerBackTitleVisible: false, headerTitle: ''}}/>
      <Stack.Screen name="forgotPassword" options={{ headerBackTitleVisible: false, headerTitle: ''}}/>
    </Stack>
  );
}
