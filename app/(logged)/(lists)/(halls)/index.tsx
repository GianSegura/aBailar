import React from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HallsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>HallsScreen</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
});
