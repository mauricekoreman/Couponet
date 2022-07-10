import { Text, TextInput, View } from "react-native";

import { styles } from "./input.styles";

const Input = ({ style, placeholder, setValue, value, label, multiline, ...props }) => {
  return (
    <View style={style}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.shadow} />
        <TextInput
          blurOnSubmit={true}
          style={[styles.input, multiline ? styles.textArea : styles.textInput]}
          onChangeText={(text) => setValue(text)}
          value={value}
          multiline={multiline || false}
          placeholder={placeholder}
          {...props}
        />
      </View>
    </View>
  );
};

export default Input;
