import { TextInput, View } from "react-native";

import { styles } from "./input.styles";

const Input = ({ style, placeholder, setValue, value, ...props }) => {
  return (
    <View style={styles.container}>
      <View style={styles.shadow} />
      <TextInput
        style={[styles.input, style]}
        onChangeText={(text) => setValue(text)}
        value={value}
        placeholder={placeholder}
        {...props}
      />
    </View>
  );
};

export default Input;
