import { StyleSheet } from "react-native";
import { fontFamily, fontSizes } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 130,
    justifyContent: "space-between",
  },
  shadow: {
    height: "100%",
    width: "100%",
    backgroundColor: "#000",
    position: "absolute",
    top: 1,
    right: -1,
  },
  btn: {
    backgroundColor: "#FFF",
    height: 40,
    width: 40,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPressed: {
    transform: [{ translateX: 1 }, { translateY: 1 }],
  },
  countValue: {
    fontSize: fontSizes.large,
    fontFamily: fontFamily.regularMedium,
  },
});
