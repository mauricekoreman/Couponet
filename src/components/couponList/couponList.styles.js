import { StyleSheet } from "react-native";

import { fontFamily, fontSizes } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  listButton: {
    paddingVertical: 20,
    paddingHorizontal: "7%",
    flexDirection: "row",
    alignItems: "center",
  },
  listButtonText: {
    fontFamily: fontFamily.regularMedium,
    fontSize: fontSizes.regular,
    marginLeft: 7,
  },
});
