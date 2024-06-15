import { Stack } from "expo-router";
import React from "react";

export default function PostersLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "" }} />
    </Stack>
  );
}
