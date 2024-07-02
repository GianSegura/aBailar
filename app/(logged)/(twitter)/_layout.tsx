import { router, Stack } from "expo-router";
import React from "react";
import { Button } from "react-native-paper";

import { useColor } from "@/hooks/useColor";

export default function ListsLayout() {
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
          headerRight: () => (
            <Button
              icon="plus"
              children={"Enviar un mensaje"}
              onPress={() => router.navigate("createTweet")}
            />
          ),
        }}
      />
      <Stack.Screen name="createTweet" options={{ headerTitle: "" }} />
    </Stack>
  );
}
