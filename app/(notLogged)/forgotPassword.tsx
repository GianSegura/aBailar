import { sendPasswordResetEmail } from "firebase/auth";
import { useFormik } from "formik";
import React from "react";
import { StyleSheet } from "react-native";
import { HelperText } from "react-native-paper";
import * as Yup from "yup";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { auth } from "@/utils/firebase";

interface ForgotPasswordFormValues {
  email: string;
}

const initialValues: ForgotPasswordFormValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("El email no es correcto")
    .required("El email es obligatorio"),
});

export default function ForgotPasswordScreen() {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await sendPasswordResetEmail(auth, formValue.email).then(() => {
          console.log(
            "En caso de que el correo esté en nuestra BBDD, mail enviado"
          );
        });
      } catch (err) {
        if (err === "emailNotVerified") {
          console.log("Email no verificado");
        } else {
          console.log("Usuario o contraseña incorrecta");
        }
      }
      // router.replace('(logged)')
    },
  });

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Restablecimiento de contraseña</ThemedText>
      <ThemedTextInput
        label="Email"
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue("email", text)}
      />
      {!!formik.errors.email && (
        <HelperText type="error">{formik.errors.email}</HelperText>
      )}
      <ThemedButton
        loading={formik.isSubmitting}
        onPress={() => formik.handleSubmit()}
      >
        Enviar
      </ThemedButton>
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
});
