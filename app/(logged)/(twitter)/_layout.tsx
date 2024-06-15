import { Stack } from "expo-router";
import React from "react";

export default function ListsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "" }} />
      <Stack.Screen name="create_tweet" options={{ headerTitle: "" }} />
    </Stack>
  );
}
