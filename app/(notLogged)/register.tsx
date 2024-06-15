import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useFormik } from "formik";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import * as Yup from "yup";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { db } from "@/utils/firebase";

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
    .oneOf([Yup.ref("password")], "Las contraseñas tienen que coincidir"),
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
          formValue.password
        );
        await setDoc(doc(db, "users", credentials.user.uid), {
          email: formValue.email,
          uid: credentials.user.uid,
          isAdmin: false,
          isSuperAdmin: false,
        });
        await sendEmailVerification(credentials.user);
        await signOut(auth);
        router.replace("login");
        console.log("Se le ha enviado un email, confirme y vuelva a entrar");
      } catch (error) {
        console.log("Error al registrarse, inténtelo más tarde");
        console.log(JSON.stringify(error));
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
            icon={showPassword ? "eye" : "eye-off"}
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
            icon={showRepeatPassword ? "eye" : "eye-off"}
            onPress={toggleShowRepeatPassword}
          />
        }
      />
      <ThemedButton
        loading={formik.isSubmitting}
        onPress={() => formik.handleSubmit()}
      >
        Siguiente
      </ThemedButton>
      <ThemedText onPress={() => router.replace("login")}>
        Ya soy miembro. Iniciar sesión
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
