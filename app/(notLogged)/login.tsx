import { HelperText  } from 'react-native-paper';
import { router } from 'expo-router';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { auth } from '@/utils/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = { 
  email: '',
  password: ''
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("El email no es correcto")
    .required("El email es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria").min(6, 'minimo 6'),
});

export default function LoginScreen() {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        console.log('formValue: ', JSON.stringify(formValue, null, 2));
        await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password,
        ).then((credentials) => {
          const isEmailVerified = credentials.user.emailVerified;
          if (!isEmailVerified) {
              signOut(auth);
              throw "emailNotVerified";
          }
          // SignIn Successfull
          console.log('credentials: ', credentials);
          router.replace('(logged)')
      });
      } catch (err) {
        if (err === "emailNotVerified") {
          console.log('Email no verificado')
        } else {
          console.log('Usuario o contraseña incorrecta')
        }
    }
    },
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Bienvenido a aBailar</ThemedText>
      <ThemedTextInput
        label="Email"
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue("email", text)}
      />
      {!!formik.errors.email && (
        <HelperText type="error">
          {formik.errors.email}
        </HelperText>
      )}
      <ThemedTextInput
        label="Contraseña"
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      {!!formik.errors.password && (
        <HelperText type="error">
          {formik.errors.password}
        </HelperText>
      )}
      <ThemedButton onPress={() => formik.handleSubmit()}>
        Inicia sesión
      </ThemedButton>
      <ThemedText onPress={() => router.replace('register')}>Regístrate</ThemedText>
      <ThemedText onPress={() => router.navigate('forgotPassword')}>¿Has olvidado tu contraseña?</ThemedText>
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
  // content: {
  //   flex: 1,
  //   padding: 32,
  //   gap: 16,
  //   overflow: 'hidden',
  // },
});