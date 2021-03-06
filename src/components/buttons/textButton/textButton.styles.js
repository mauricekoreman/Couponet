import { StyleSheet } from "react-native";

import { fontFamily } from "../../../utils/designSystem";

export const styles = StyleSheet.create({
  container: {},
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.6,
  },
  btnText: {
    fontFamily: fontFamily.regularMedium,
    textAlign: "center",
  },
  disabled: {
    opacity: 0.6,
  },
});
