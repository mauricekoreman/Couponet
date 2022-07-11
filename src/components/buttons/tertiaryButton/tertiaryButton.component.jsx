import { Pressable, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { styles } from "./tertiaryButton.styles";

const TertiaryButton = ({ onPress, icon, title, containerStyle, color }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.btnContainer, containerStyle, pressed && styles.pressed]}
  >
    {icon}
    <Text style={[styles.btnText, { color: color || "#000" }]}>{title}</Text>
    <Feather
      style={{ position: "absolute", right: 0 }}
      color={color || "#000"}
      name='chevron-right'
      size={26}
    />
  </Pressable>
);

export default TertiaryButton;
