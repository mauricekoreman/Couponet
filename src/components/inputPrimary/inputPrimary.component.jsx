import { TextInput } from "react-native";

import { styles } from "./inputPrimary.styles.js";

const InputPrimary = ({ style, placeholder, setValue, value, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      onChangeText={(text) => setValue(text)}
      value={value}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default InputPrimary;
