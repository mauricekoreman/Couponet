import { StyleSheet } from "react-native";
import { fontFamily } from "../../../utils/designSystem";

export const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnText: {
    maxWidth: "75%",
    marginLeft: 30,
    fontFamily: fontFamily.displayRegular,
    fontSize: 22,
  },
  pressed: {
    opacity: 0.6,
  },
});
