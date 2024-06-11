import { StyleSheet } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { useFormik } from 'formik';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signOut } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import * as Yup from "yup";
import { ThemedView } from '@/components/ThemedView';
import { db } from '@/utils/firebase';

interface RegisterFormValues {
  email: string;
  password: string;
  repeatPassword: string;
}

const initialValues: RegisterFormValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
      .email("El email no es correcto")
      .required("El email es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
  repeatPassword: Yup.string()
      .required("La contraseña es obligatoria")
      .oneOf(
          [Yup.ref("password")],
          "Las contraseñas tienen que coincidir",
      ),
});

export default function RegisterScreen() {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const credentials = await createUserWithEmailAndPassword(
            auth,
            formValue.email,
            formValue.password,
        );
        await setDoc(doc(db, "users", credentials.user.uid), {
            email: formValue.email,
            uid: credentials.user.uid,
            isAdmin: false,
        });
        await sendEmailVerification(credentials.user);
        signOut(auth);
        router.replace('login');
        console.log('Se le ha enviado un email, confirme y vuelva a entrar')
      } catch (error) {
          console.log('Error al registrarse, inténtelo más tarde');
      }
    },
});

  return (
    <ThemedView style={styles.container}>
      <ThemedTextInput
        label="Email"
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue("email", text)}
      />
      <ThemedTextInput
        label="Contraseña"
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <ThemedTextInput
        label="Repetir Contraseña"
        value={formik.values.repeatPassword}
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
      />
      <ThemedButton onPress={() => formik.handleSubmit()}>
        Siguiente
      </ThemedButton>
      <ThemedText onPress={() => router.replace('login')}>Ya soy miembro. Iniciar sesión</ThemedText>
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

