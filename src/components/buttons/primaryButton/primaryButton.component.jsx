import { View, Button, Text, Pressable } from "react-native";

import { styles } from "./primaryButton.styles";

const PrimaryButton = ({ title, onPress, disabled, style }) => (
  <Pressable disabled={disabled} onPress={onPress} style={[styles.container, style]}>
    <Text>{title}</Text>
  </Pressable>
);

export default PrimaryButton;
