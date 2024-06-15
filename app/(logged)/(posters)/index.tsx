import { useContext } from "react";
import { StyleSheet, useColorScheme } from "react-native";

import { ThemedFab } from "@/components/ThemedFab";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { UserContext } from "@/utils/context";

export default function HomeScreen() {
  const context = useContext(UserContext);
  const isAdmin = context?.userData?.isAdmin;
  console.log("userData: ", context?.userData);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">¡POSTERS!</ThemedText>
      <ThemedText>{useColorScheme()}</ThemedText>
      {isAdmin && (
        <ThemedFab icon="plus" onPress={() => console.log("Pressed")} />
      )}
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
