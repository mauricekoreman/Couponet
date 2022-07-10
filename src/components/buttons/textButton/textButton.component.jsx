import { Pressable, Text, View } from "react-native";

import { styles } from "./textButton.styles";

const TextButton = ({ title, icon, onPress, disabled = false, style }) => (
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
    {({ pressed }) => (
      <View style={styles.btnContainer}>
        {icon}
        <Text style={[styles.btnText, icon && { marginLeft: 10 }]}>{title}</Text>
      </View>
    )}
  </Pressable>
);

export default TextButton;
