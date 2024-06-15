import { doc, setDoc } from "firebase/firestore";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Switch } from "react-native-paper";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { UserContext } from "@/utils/context";
import { db } from "@/utils/firebase";

interface TweetFormValues {
  tweet: string;
  isAnonymous: boolean;
}

const initialValues: TweetFormValues = {
  tweet: "",
  isAnonymous: false,
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
        console.log("asas");
        console.log("formValue: ", JSON.stringify(formValue, null, 2));
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
          console.log("Email no verificado");
        } else {
          console.log("Usuario o contraseña incorrecta");
        }
      }
    },
  });

  console.log("context:", formik);
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Crear Tweet</ThemedText>
      <ThemedTextInput
        label="Tweet"
        placeholder="Escribe aquí tu tweet"
        value={formik.values.tweet}
        multiline
        onChangeText={(text) => formik.setFieldValue("tweet", text)}
      />
      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <Switch
          value={!!formik.values.isAnonymous}
          onValueChange={() => {
            formik.setFieldValue("isAnonymous", !formik.values.isAnonymous);
          }}
        />
        <ThemedText style={{ alignSelf: "center" }}>Anónimo</ThemedText>
      </View>
      <ThemedButton
        loading={formik.isSubmitting}
        onPress={() => formik.handleSubmit()}
      >
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
    overflow: "hidden",
  },
});
