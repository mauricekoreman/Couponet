import { StyleSheet } from "react-native";

import { fontSizes, fontFamily, colors } from "../../../utils/designSystem";

export const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.green,
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  pressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
  disabled: {
    opacity: 0.6,
  },
  whiteBack: {
    // this is for disabled styles so the button doesnt get black
    backgroundColor: "#FFF",
    height: "100%",
    width: "100%",
    position: "absolute",
    borderRadius: 10,
  },
  shadow: {
    position: "absolute",
    backgroundColor: "#000",
    height: "100%",
    width: "100%",
    borderRadius: 10,
    top: 2,
    right: -2,
  },
  text: {
    fontSize: fontSizes.large,
    fontFamily: fontFamily.displayBold,
  },
});
