import "react-native-get-random-values";

import { router, useLocalSearchParams } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { useFormik } from "formik";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

import { ImagesForm } from "@/components/ImagesForm";
import InfoForm from "@/components/InfoForm";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { db } from "@/utils/firebase";

export default function CreateHallScreen() {
  const params = useLocalSearchParams();
  console.log("params:", params);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const submitData = {
          ...formValue,
          id: uuidv4(),
          name: formValue.name.trim(),
          adress: formValue.adress.trim(),
          phone: formValue.phone.trim(),
          email: formValue.email.trim(),
          website: formValue.website.trim(),
          province: formValue.province.trim(),
          instagram: formValue.instagram.trim(),
          description: formValue.description.trim(),
          createdAt: new Date(),
          isActive: formValue.isActive,
          rrpps: formValue.rrpps,
        };

        await setDoc(doc(db, "halls", submitData.id), submitData);
        router.navigate("halls");
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    console.log("formik: ", formik.errors);
  }, [formik.errors]);

  return (
    <ThemedScrollView showsVerticalScrollIndicator={false}>
      <InfoForm formik={formik} />
      <ImagesForm formik={formik} />
      <ThemedButton
        onPress={() => formik.handleSubmit()}
        loading={formik.isSubmitting}
        style={{ margin: 16 }}
      >
        Añadir Sala/Sesión
      </ThemedButton>
    </ThemedScrollView>
  );
}

const initialValues = {
  name: "",
  adress: "",
  phone: "",
  email: "",
  website: "",
  province: "",
  instagram: "",
  description: "",
  mapsUrl: "",
  wazeUrl: "",
  images: [],
  isActive: 1,
  rrpps: [],
};

const validationSchema = Yup.object({
  name: Yup.string().required("Campo obligatorio"),
  adress: Yup.string(),
  phone: Yup.string(),
  email: Yup.string(),
  website: Yup.string(),
  province: Yup.string().required("Campo obligatorio"),
  instagram: Yup.string(),
  description: Yup.string(),
  mapsUrl: Yup.string().url().required("Campo obligatorio"),
  wazeUrl: Yup.string().url(),
  images: Yup.array()
    .min(1, "Se requiere una imagen como mínimo")
    .required("La imagen es requerida"),

  isActive: Yup.number().required(),
  rrpps: Yup.array(),
});
