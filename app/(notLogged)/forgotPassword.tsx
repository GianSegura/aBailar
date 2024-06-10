import { StyleSheet, Image } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { router } from 'expo-router';
import React from 'react';

export default function ForgotPasswordScreen() {
  const [text, setText] = React.useState("");
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <Text variant="headlineLarge" onPress={() => router.replace('login')}>Bienvenido a aBailar</Text>
      <TextInput
        label="Email"
        value={text}
        onChangeText={text => setText(text)}
      />
      <Button icon="camera" mode="contained" onPress={() => router.replace('(logged)')}>
        Inicia sesión
      </Button>
      <Text variant="bodySmall" onPress={() => router.replace('register')}>Regístrate</Text>
      <Text variant="bodySmall" onPress={() => router.replace('login')}>¿Has olvidado tu contraseña?</Text>
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
