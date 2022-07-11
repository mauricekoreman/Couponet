import { Pressable, Text, View } from "react-native";
import { fontSizes } from "../../../utils/designSystem";

import { styles } from "./textButton.styles";

const TextButton = ({ title, icon, onPress, disabled = false, fontSize, color, style }) => (
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
      <View style={[styles.btnContainer, pressed && styles.pressed]}>
        {icon}
        <Text
          style={[
            styles.btnText,
            {
              fontSize: fontSize || fontSizes.regular,
              color: color || "#000",
            },
            icon && {
              marginLeft: 10,
            },
          ]}
        >
          {title}
        </Text>
      </View>
    )}
  </Pressable>
);

export default TextButton;
