import { Stack } from "expo-router";
import React from "react";

import { useColor } from "@/hooks/useColor";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: useColor("text"),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{ headerBackTitleVisible: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="register"
        options={{ headerBackTitleVisible: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="forgotPassword"
        options={{ headerBackTitleVisible: false, headerTitle: "" }}
      />
    </Stack>
  );
}
