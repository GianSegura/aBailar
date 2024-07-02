// import { Avatar, Icon } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet } from "react-native";
import { Avatar, Icon, IconButton } from "react-native-paper";
import { v4 as uuid } from "uuid";

import { ThemedScrollView } from "./ThemedScrollView";

export const ImagesForm = ({ formik }) => {
  const [isLoading, setIsLoading] = useState(false);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.2,
    });
    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
      setIsLoading(true);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, `salas/${uuid()}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoHall(snapshot.metadata.fullPath);
    });
  };

  const updatePhotoHall = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(imageRef);
    formik.setFieldValue("images", [...formik.values.images, imageUrl]);
    setIsLoading(false);
  };

  const removeImage = (image) => {
    Alert.alert(
      "Eliminar Imagen",
      "Estás seguro de eliminar esta imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            const result = formik.values.images.filter((img) => image !== img);
            formik.setFieldValue("images", result);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ThemedScrollView
        style={styles.viewImage}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <IconButton
          icon="camera"
          iconColor="#a7a7a7"
          style={styles.containerItem}
          onPress={openGallery}
        />
        {formik.values.images.map((image: any) => (
          <Pressable key={image} onPress={() => removeImage(image)}>
            <Avatar.Image
              key={image}
              source={{ uri: image }}
              style={styles.imageStyle}
            />
          </Pressable>
        ))}
      </ThemedScrollView>
      {/* <CustomText style={styles.error}>{formik.errors.images}</CustomText> */}
      {/* <LoadingModal show={isLoading} /> */}
    </>
  );
};

const styles = StyleSheet.create({
  viewImage: {
    flexDirection: "row",
    marginTop: 30,
    marginHorizontal: 20,
  },
  containerItem: {
    justifyContent: "center",
    backgroundColor: "#e3e3e3",
    width: 70,
    height: 70,
  },
  error: {
    marginHorizontal: 20,
    marginTop: 10,
    color: "#ff0000",
    fontSize: 12,
    paddingLeft: 6,
  },
  imageStyle: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
