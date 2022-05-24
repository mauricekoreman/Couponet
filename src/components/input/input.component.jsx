import { View, TextInput, Text } from "react-native";

import { styles } from "./input.styles";

const Input = ({ label, inputStyle, ...props }) => (
  <View style={[styles.container, inputStyle]}>
    <Text>{label}</Text>
    <TextInput {...props} style={{ maxHeight: 80 }} />
  </View>
);

export default Input;
