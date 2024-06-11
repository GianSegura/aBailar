import { HelperText  } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { auth } from '@/utils/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';

interface ForgotPasswordFormValues {
  email: string;
}

const initialValues: ForgotPasswordFormValues = { 
  email: '',
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
        await sendPasswordResetEmail(
          auth,
          formValue.email,
        ).then(() => {
          console.log('En caso de que el correo esté en nuestra BBDD, mail enviado');
      });
      } catch (err) {
        if (err === "emailNotVerified") {
          console.log('Email no verificado')
        } else {
          console.log('Usuario o contraseña incorrecta')
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
        <HelperText type="error">
          {formik.errors.email}
        </HelperText>
      )}
      <ThemedButton onPress={() => formik.handleSubmit()}>
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
    overflow: 'hidden',
  },
});