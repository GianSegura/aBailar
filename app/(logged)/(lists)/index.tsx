import { router } from "expo-router";
import React from "react";
import { List } from "react-native-paper";

import { ThemedView } from "@/components/ThemedView";

export default function ListsScreen() {
  return (
    <ThemedView>
      <List.Item
        title="Sesiones / Salas"
        left={(props) => <List.Icon {...props} icon="office-building" />}
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
        onPress={() => router.navigate("(halls)")}
      />
      <List.Item
        title="Escuelas"
        left={(props) => <List.Icon {...props} icon="school" />}
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
        onPress={() => null}
      />
      <List.Item
        title="Profesores / Profesoras"
        left={(props) => <List.Icon {...props} icon="account-group" />}
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
        onPress={() => null}
      />
      <List.Item
        title="RRPPs"
        left={(props) => <List.Icon {...props} icon="account-multiple" />}
        right={(props) => <List.Icon {...props} icon="arrow-right" />}
        onPress={() => null}
      />
    </ThemedView>
  );
}
