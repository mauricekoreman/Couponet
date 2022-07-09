import { Text, Pressable, View } from "react-native";

import { styles } from "./primaryButton.styles";

const PrimaryButton = ({ title, onPress, disabled = false, style }) => (
  <Pressable disabled={disabled} onPress={onPress} style={[disabled && styles.disabled, style]}>
    {({ pressed }) => (
      <>
        <View style={styles.shadow} />
        <View style={styles.whiteBack} />
        <View style={[pressed && styles.pressed, styles.btn]}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </>
    )}
  </Pressable>
);

export default PrimaryButton;
