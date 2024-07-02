import { BottomSheet, ListItem } from "@rneui/themed";
import React from "react";
import { Dimensions, Image, StyleSheet, Switch, View } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";

import { entitiesFields } from "@/utils/entitiesFieds";
import spainProvinces from "@/utils/spainProvinces.json";

import ProvincesList from "./ProvincesList";
import { ThemedButton } from "./ThemedButton";
import { ThemedScrollView } from "./ThemedScrollView";
import { ThemedText } from "./ThemedText";
import { ThemedTextInput } from "./ThemedTextInput";

const heightScreen = Dimensions.get("window").height;
const widthScreen = Dimensions.get("window").width;

export default function InfoForm({ formik }) {
  const [visible, setVisible] = React.useState(false);
  const [showProvinces, setShowProvinces] = React.useState(false);
  const toggleProvinces = () => setShowProvinces((prevState) => !prevState);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const list: any = entitiesFields(formik).filter((el) =>
    Object.keys(formik.values).includes(el.field)
  );

  return (
    <>
      <Image
        source={
          formik.values.images[0]
            ? { uri: formik.values.images[0] }
            : require("@/assets/images/not_found.png")
        }
        style={{
          height: 200,
          width: widthScreen,
          marginBottom: 20,
        }}
      />
      <View style={styles.container}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text>Example Modal. Click outside this area to dismiss.</Text>
            <ProvincesList />
          </Modal>
        </Portal>
        {list.map((el: any) => (
          <ThemedTextInput
            key={el.field}
            label={el.label}
            value={formik.values[el.field] || undefined}
            onChangeText={(text) => formik.setFieldValue(el.field, text)}
            validation={el.errorMessage}
          />
        ))}
        <ThemedButton
          mode="outlined"
          onPress={toggleProvinces}
          children={formik.values?.province || "Selecciona una Provincia"}
        />
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <Switch
            value={!!formik.values.isActive}
            onValueChange={() => {
              formik.setFieldValue("isActive", !formik.values.isActive);
            }}
          />
          <ThemedText style={{ alignSelf: "center" }}>
            {!!formik.values.isActive ? "Activo" : "Inactivo"}
          </ThemedText>
        </View>
      </View>
      <BottomSheet isVisible={showProvinces} onBackdropPress={toggleProvinces}>
        <ThemedScrollView
          style={{ height: (heightScreen / 100) * 65 }}
          showsVerticalScrollIndicator={false}
        >
          {spainProvinces.map((province, index) => (
            <ListItem
              key={index}
              onPress={() => {
                formik.setFieldValue("province", province.province);
                toggleProvinces();
              }}
            >
              <ListItem.Content>
                <ListItem.Title>{province.label}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </ThemedScrollView>
        <ThemedButton onPress={toggleProvinces} children={"Cancelar"} />
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: "hidden",
  },
});
