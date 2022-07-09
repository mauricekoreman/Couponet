import { StyleSheet } from "react-native";
import { colors } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  createCouponButton: {
    position: "absolute",
    bottom: 20,
    width: "80%",
    alignSelf: "center",
  },
});
