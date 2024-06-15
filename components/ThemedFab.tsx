import { StyleSheet } from "react-native";
import { FAB, FABProps, useTheme } from "react-native-paper";

export function ThemedFab({ ...otherProps }: FABProps) {
  return <FAB theme={useTheme()} style={styles.fab} {...otherProps} />;
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
