import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Tweet } from "@/components/Tweet";
import { db } from "@/utils/firebase";

export default function TwitterScreen() {
  const [tweets, setTweets] = useState<any>([]);

  useEffect(() => {
    const q = query(collection(db, "tweets"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((el) => el.data()).filter((n) => n);
      setTweets(data);
    });
  }, []);

  return (
    <ThemedView style={styles.container}>
      {tweets && tweets.length ? (
        <ScrollView
          // TODO: Inicializar el ScrollView in the Bottom
          contentContainerStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {tweets.reverse().map((tweet: any) => (
            <Tweet key={tweet.id} {...tweet} />
          ))}
        </ScrollView>
      ) : (
        <ThemedText>Cargando...</ThemedText>
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
});
