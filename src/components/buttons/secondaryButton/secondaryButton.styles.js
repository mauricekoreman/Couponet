import { StyleSheet } from "react-native";
import { fontFamily, fontSizes } from "../../../utils/designSystem";

export const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#FFF",
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 2,
  },
  pressed: {
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },
  disabled: {
    opacity: 0.6,
  },
  shadow: {
    position: "absolute",
    backgroundColor: "#000",
    top: 1,
    right: -1,
  },
  title: {
    fontSize: fontSizes.medium,
    fontFamily: fontFamily.displayRegular,
    paddingTop: Platform.OS === "ios" ? 2 : 0, // IOS cuts off top 2px off Rockwell regular
  },
});
