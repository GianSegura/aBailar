import { useColorScheme } from 'react-native';

import { HelperText, MD2DarkTheme, MD2LightTheme, TextInput } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper';

export function ThemedTextInput({ validation = undefined, ...otherProps  }: TextInputProps & { validation?: string}) {
  const color = useColorScheme();
  return (
    <>
      <TextInput theme={color === 'dark' ? MD2DarkTheme : MD2LightTheme} mode='outlined' {...otherProps} />
      {!!validation && (
        <HelperText type="error">
          {validation}
        </HelperText>
      )}
    </>
  )
}
