import { StyleSheet } from "react-native";

import { fontFamily, fontSizes } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderRadius: 10,
    fontFamily: fontFamily.regularMedium,
    fontSize: fontSizes.regular,
    backgroundColor: "#FFF",
  },
  shadow: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#000",
    right: -1,
    top: 1,
  },
});
