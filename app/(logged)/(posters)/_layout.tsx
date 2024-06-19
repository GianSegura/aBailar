import { Stack } from "expo-router";
import React from "react";

import { useColor } from "@/hooks/useColor";

export default function PostersLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: useColor("text"),
        headerStyle: {
          backgroundColor: useColor("background"),
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
        }}
      />
    </Stack>
  );
}
