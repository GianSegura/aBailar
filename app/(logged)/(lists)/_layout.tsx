import { Stack } from "expo-router";
import React from "react";

export default function ListsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "" }} />
      <Stack.Screen name="(halls)" options={{ headerTitle: "" }} />
    </Stack>
  );
}
