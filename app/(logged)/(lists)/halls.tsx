import { router } from "expo-router";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { UserContext } from "@/utils/context";
import { db } from "@/utils/firebase";

export default function HallsScreen({ route }) {
  const context = useContext(UserContext);
  const isAdmin = context?.userData?.isAdmin;

  // const { filter } = route?.params;
  const [halls, setHalls] = useState<any>(null);

  useEffect(() => {
    const q = query(collection(db, "halls"), orderBy("name"));
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((el) => el.data()).filter((n) => n);
      setHalls(data);
    });
  }, []); // TODO: Añadir filter a la dependencia

  const goToAddHallScreen = () => {
    router.navigate("createHall");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText>HallsScreen</ThemedText>
      {isAdmin && (
        <FAB icon="plus" style={styles.fab} onPress={goToAddHallScreen} />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: "hidden",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
