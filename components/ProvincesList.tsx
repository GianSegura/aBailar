import { List } from "react-native-paper";

import spainProvinces from "@/utils/spainProvinces.json";

import { ThemedScrollView } from "./ThemedScrollView";

export default function ProvincesList() {
  return (
    <ThemedScrollView>
      {spainProvinces.map((province, index) => (
        <List.Item
          key={index}
          title={province.label}
          titleStyle={{ textAlign: "center" }}
          onPress={() => {
            // setProvince(province.province);
            // goBack();
            // formik.setFieldValue("province", province.province);
            // onToggleProvincesList();
          }}
        />
      ))}
    </ThemedScrollView>
  );
}
