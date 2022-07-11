import { StyleSheet } from "react-native";

import { fontFamily, fontSizes } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    height: 180,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    paddingBottom: 20,
  },
  pressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
  },
  disabled: {
    opacity: 0.4,
  },
  expirationDate: {
    position: "absolute",
    fontFamily: fontFamily.regularRegular,
    fontSize: fontSizes.small,
    top: 20,
  },
  title: {
    textAlign: "center",
    fontFamily: fontFamily.displayBold,
    fontSize: fontSizes.large,
  },
  quantity: {
    marginTop: 30,
    fontFamily: fontFamily.displayRegular,
    fontSize: fontSizes.small,
  },
  quantityBoxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    justifyContent: "center",
  },
  quantityBox: {
    height: 17,
    width: 30,
    margin: 2,
    backgroundColor: "#FFF",
    borderColor: "black",
  },
  box: {
    height: "100%",
    width: "100%",
    borderWidth: 1,
  },
  quantityBoxShadow: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 1,
    right: -1,
    backgroundColor: "#000",
  },
  quantityBoxWhite: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#FFF",
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
  whiteBack: {
    position: "absolute",
    backgroundColor: "#FFF",
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
});
