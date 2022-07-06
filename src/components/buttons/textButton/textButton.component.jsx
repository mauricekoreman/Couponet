import { Pressable, Text } from "react-native";

import { styles } from "./textButton.styles";

const TextButton = ({ title, onPress, disabled = false, style }) => (
  <Pressable
    disabled={disabled}
    onPress={onPress}
    style={({ pressed }) => [
      styles.container,
      disabled && styles.disabled,
      style,
      { opacity: pressed ? 0.8 : 1 },
    ]}
  >
    {({ pressed }) => <Text style={styles.btnText}>{title}</Text>}
  </Pressable>
);

export default TextButton;
