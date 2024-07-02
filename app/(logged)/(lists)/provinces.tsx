import { router } from "expo-router";
import { useState } from "react";

import ProvincesList from "@/components/ProvincesList";

export default function Provinces() {
  const [province, setProvince] = useState(undefined);
  const goBack = () => {
    router.setParams({ province: province });
    router.replace({ pathname: "createHall", params: { province: province } });
  };
  return <ProvincesList />;
}
