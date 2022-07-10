import { Pressable, Text, View } from "react-native";

import { styles } from "./secondaryButton.styles";

const SecondaryButton = ({ onPress, title, icon, width, height, style }) => (
  <Pressable onPress={onPress}>
    {({ pressed }) => (
      <View style={[style, { height: height, width: width }]}>
        <View style={[styles.shadow, { height: height || "100%", width: width || "100%" }]} />
        <View style={[pressed && styles.pressed, styles.btn]}>
          {icon && icon}
          {title && <Text style={styles.title}>{title}</Text>}
        </View>
      </View>
    )}
  </Pressable>
);

export default SecondaryButton;
