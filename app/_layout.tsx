import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack, useRootNavigationState } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PaperProvider } from 'react-native-paper';
import { onAuthStateChanged } from 'firebase/auth';
import { router } from 'expo-router';
import { db, getAuth } from '@/utils/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { UserContext } from '@/utils/context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const rootNavigationState = useRootNavigationState();
  const [userData, setUserData] = useState<any>(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    console.log('useEffect 1')
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged: ', user);
      if(user) {
        onSnapshot(doc(db, "users", user.uid), (doc) => {
          setUserData(doc.data());
          setUserLoaded(true);
        })
      } else {
        setUserData(null);
        setUserLoaded(true);
        console.log('User NOT LOGGED');
        router.replace('(notLogged)')
      }
    })
  }, [])

  useEffect(() => {
    console.log('useEffect 2')
    if (loaded && userLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded && !rootNavigationState?.key) {
    return <Slot />;
  }

  return (
    <UserContext.Provider value={{ userData }}>
      <ThemeProvider value={theme}>
        <PaperProvider theme={theme}>
          <Stack>
            <Stack.Screen name="(notLogged)" options={{ headerShown: false }} />
            <Stack.Screen name="(logged)" options={{ headerShown: false }} />
          </Stack>
        </PaperProvider>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

