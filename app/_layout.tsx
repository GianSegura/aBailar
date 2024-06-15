import "react-native-reanimated";

import { useFonts } from "expo-font";
import { Slot, Stack, useRootNavigationState } from "expo-router";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

import { useColorScheme } from "@/hooks/useColorScheme";
import { UserContext } from "@/utils/context";
import { db, getAuth } from "@/utils/firebase";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const rootNavigationState = useRootNavigationState();

  const [userData, setUserData] = useState<any>(null);
  const [userLoaded, setUserLoaded] = useState(false);

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged: ", user);
      if (user) {
        onSnapshot(doc(db, "users", user.uid), (doc) => {
          setUserData(doc.data());
          setUserLoaded(true);
        });
      } else {
        setUserData(null);
        setUserLoaded(true);
        console.log("User NOT LOGGED");
        router.replace("(notLogged)");
      }
    });
  }, []);

  useEffect(() => {
    if (loaded && userLoaded) {
      SplashScreen.hideAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  if (!loaded && !rootNavigationState?.key) {
    return <Slot />;
  }

  return (
    <UserContext.Provider value={{ userData }}>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="(notLogged)" options={{ headerShown: false }} />
          <Stack.Screen name="(logged)" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </UserContext.Provider>
  );
}
