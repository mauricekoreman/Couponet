import { Text, Pressable } from "react-native";

import { styles } from "./primaryButton.styles";

const PrimaryButton = ({ title, onPress, disabled = false, style }) => (
  <Pressable
    disabled={disabled}
    onPress={onPress}
    style={({ pressed }) => [
      styles.container,
      disabled && styles.disabled,
      style,
      { backgroundColor: pressed ? "navy" : "#FFF" },
    ]}
  >
    {({ pressed }) => (
      <Text style={[styles.text, { color: pressed ? "#FFF" : "#000" }]}>{title}</Text>
    )}
  </Pressable>
);

export default PrimaryButton;
