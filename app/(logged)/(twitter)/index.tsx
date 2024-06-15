import { StyleSheet, ScrollView } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from '@/utils/firebase';
import { ThemedText } from '@/components/ThemedText';
import { UserContext } from '@/utils/context';
import { ThemedFab } from '@/components/ThemedFab';
import { router } from 'expo-router';

export default function TwitterScreen() {
  const context = useContext(UserContext);
  const isAdmin = context?.userData.isAdmin;
  const [tuits, setTuits] = useState<any>([]);

  useEffect(() => {
    const q = query(collection(db, "tweets"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((el) => el.data()).filter((n) => n);
        setTuits(data);
    });
  }, []);

  return (
    <ThemedView style={styles.container}>
      {tuits && tuits.length ? (
          <ScrollView>
            {tuits.map(() => (
              <ThemedText>1</ThemedText>
            ))}
          </ScrollView>
        ) : (
          <ThemedText>Cargando...</ThemedText>
      )}
      {isAdmin && (
        <ThemedFab icon="plus" onPress={() => router.navigate('create_tweet')}/>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
