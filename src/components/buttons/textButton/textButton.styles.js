import { StyleSheet } from "react-native";

import { fontFamily, fontSizes } from "../../../utils/designSystem";

export const styles = StyleSheet.create({
  container: {},
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnText: {
    fontFamily: fontFamily.regularMedium,
    fontSize: fontSizes.regular,
    textAlign: "center",
  },
  disabled: {
    opacity: 0.6,
  },
});
