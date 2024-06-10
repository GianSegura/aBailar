import { StyleSheet, Image, useColorScheme } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React from 'react';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';

export default function RegisterScreen() {
  const [text, setText] = React.useState("");
  const colorrr = useColorScheme();
  console.log('color: ', colorrr);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedTextInput
        label="Email"
        value={text}
        onChangeText={text => setText(text)}
      />
      <ThemedTextInput
        label="Contraseña"
        value={text}
        onChangeText={text => setText(text)}
      />
      <ThemedTextInput
        label="Repetir Contraseña"
        value={text}
        onChangeText={text => setText(text)}
      />
      <ThemedButton>
        Siguiente
      </ThemedButton>
      <ThemedText onPress={() => router.replace('login')}>Ya soy miembro. Iniciar sesión</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});