import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../utils/designSystem";

const NavigatorTitle = ({ text, badge }) => (
  <View style={styles.container}>
    <Text>{text}</Text>
    {badge && <View style={styles.badge} />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    height: 10,
    width: 10,
    backgroundColor: colors.yellow,
    borderRadius: 100,
    marginLeft: 4,
  },
});

export default NavigatorTitle;
