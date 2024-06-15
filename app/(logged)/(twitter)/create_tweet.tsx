import { Checkbox  } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { db } from '@/utils/firebase';
import React, { useContext } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { UserContext } from '@/utils/context';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

interface TweetFormValues {
  tweet: string;
  isAnonymous: boolean;
}

const initialValues: TweetFormValues = {
  tweet: '',
  isAnonymous: false
};

const validationSchema = Yup.object({
  tweet: Yup.string().required("El Tweet es obligatorio"),
  isAnonymous: Yup.boolean(),
});

export default function CreateTweetScreen() {
  const context = useContext(UserContext);
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        console.log('asas')
        console.log('formValue: ', JSON.stringify(formValue, null, 2));
        const newData = {
          ...formValue,
          id: uuidv4(),
          createdAt: new Date(),
          likesCount: 0,
          user: {
            uid: context?.userData.uid,
                displayName: context?.userData.displayName || "",
                photoURL: context?.userData.photoURL || "",
                },
                };
                
                await setDoc(doc(db, "tweets", newData.id), newData);
                } catch (err) {
                  if (err === "emailNotVerified") {
                    console.log('Email no verificado')
                    } else {
                      console.log('Usuario o contraseña incorrecta')
                      }
                      }
                      },
                      });
                      
                      console.log('context:', formik);
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Crear Tweet</ThemedText>
      <ThemedTextInput
        label="Tweet"
        placeholder='Escribe aquí tu tweet'
        value={formik.values.tweet}
        multiline
        onChangeText={(text) => formik.setFieldValue("tweet", text)}
      />
      <Checkbox
        status={formik.values.isAnonymous ? 'checked' : 'unchecked'}
        onPress={() => {
          formik.setFieldValue("isAnonymous", !formik.values.isAnonymous)
        }}
      />
      <ThemedButton loading={formik.isSubmitting} onPress={() => formik.handleSubmit()}>
        Publicar
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