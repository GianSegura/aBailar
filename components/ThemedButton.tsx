import { Button, ButtonProps } from 'react-native-paper';

export function ThemedButton({ ...otherProps }: ButtonProps) {
  return <Button mode="contained" {...otherProps} textColor='white'/>;
}
