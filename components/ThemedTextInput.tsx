import { useColorScheme } from 'react-native';

import { MD2DarkTheme, MD2LightTheme, TextInput } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper';

export function ThemedTextInput({ ...otherProps }: TextInputProps) {
  const color = useColorScheme();

  return <TextInput theme={color === 'dark' ? MD2DarkTheme : MD2LightTheme} mode='outlined' {...otherProps} />;
}
