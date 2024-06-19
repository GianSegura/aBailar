import { Button, ButtonProps } from "react-native-paper";

import { Colors } from "@/constants/Colors";
import { useColor } from "@/hooks/useColor";

export function ThemedButton({ ...otherProps }: ButtonProps) {
  return (
    <Button
      mode="contained"
      {...otherProps}
      textColor={useColor("text")}
      buttonColor={Colors.primary}
    />
  );
}
