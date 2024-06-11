import { HelperText, TextInput } from 'react-native-paper';
import { TextInputProps, useTheme  } from 'react-native-paper';

export function ThemedTextInput({ validation = undefined, ...otherProps  }: TextInputProps & { validation?: string}) {
  const theme = useTheme();
  return (
    <>
      <TextInput theme={theme} mode='outlined' {...otherProps} />
      {!!validation && (
        <HelperText type="error" theme={theme}>
          {validation}
        </HelperText>
      )}
    </>
  )
}
