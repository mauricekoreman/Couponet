import { StyleSheet } from "react-native";

import { fontSizes, fontFamily } from "../../../utils/designSystem";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 100,
    borderWidth: 1,
    width: "80%",
    alignItems: "center",
  },
  text: {
    fontSize: fontSizes.regular,
    fontFamily: fontFamily.regularMedium,
  },
  disabled: {
    opacity: 0.5,
  },
});
