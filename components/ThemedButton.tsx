import { Button, ButtonProps } from "react-native-paper";

import { Colors } from "@/constants/Colors";
import { useColor } from "@/hooks/useColor";

export function ThemedButton({ ...otherProps }: ButtonProps) {
  return (
    <Button
      {...otherProps}
      textColor={useColor("text")}
      buttonColor={!otherProps.mode ? Colors.primary : undefined}
    />
  );
}
