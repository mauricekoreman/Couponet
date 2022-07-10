import { StyleSheet } from "react-native";

import { fontFamily, fontSizes } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  label: {
    fontFamily: fontFamily.regularMedium,
    fontSize: fontSizes.regular,
    marginBottom: 5,
  },
  input: {
    paddingHorizontal: 20,
    borderWidth: 2,
    borderRadius: 10,
    fontFamily: fontFamily.regularMedium,
    fontSize: fontSizes.regular,
    backgroundColor: "#FFF",
    paddingVertical: 10,
  },
  textArea: {
    textAlignVertical: "top",
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
