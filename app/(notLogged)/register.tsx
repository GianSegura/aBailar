import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
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
import { TextInput } from 'react-native-paper';

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
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prevState) => !prevState);

  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const toggleShowRepeatPassword = () =>
      setShowRepeatPassword((prevState) => !prevState);

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
        await signOut(auth);
        router.replace('login')
        console.log('Se le ha enviado un email, confirme y vuelva a entrar')
      } catch (error) {
          console.log('Error al registrarse, inténtelo más tarde');
      }
    },
});

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Crea una cuenta aBailar</ThemedText>
      <ThemedTextInput
        label="Email"
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        validation={formik.errors.email}
      />
      <ThemedTextInput
        label="Contraseña"
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        secureTextEntry={showPassword ? false : true}
        validation={formik.errors.password}
        right={
          <TextInput.Icon 
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={toggleShowPassword}
          />
        }
      />
      <ThemedTextInput
        label="Repetir Contraseña"
        value={formik.values.repeatPassword}
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        secureTextEntry={showRepeatPassword ? false : true}
        validation={formik.errors.repeatPassword}
        right={
          <TextInput.Icon 
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={toggleShowRepeatPassword}
          />
        }
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
});

