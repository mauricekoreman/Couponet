import { StyleSheet, Text, View } from "react-native";
import { colors, fontFamily } from "../../utils/designSystem";

const NavigatorTitle = ({ text, badge, focused }) => (
  <View style={[styles.container, !focused && { opacity: 0.6 }]}>
    <Text style={styles.tabbarLabel}>{text}</Text>
    {badge && <View style={styles.badge} />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tabbarLabel: {
    fontFamily: fontFamily.displayBold,
    fontSize: 17,
    marginVertical: 10,
  },
  badge: {
    height: 10,
    width: 10,
    backgroundColor: colors.couponColors.yellow,
    borderRadius: 100,
    marginLeft: 4,
  },
});

export default NavigatorTitle;
