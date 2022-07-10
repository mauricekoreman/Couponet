import { StyleSheet } from "react-native";
import { colors, fontFamily, fontSizes } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  couponContainer: {
    position: "relative",
    width: "80%",
    alignSelf: "center",
  },
  coupon: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.blue,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  couponTitle: {
    textAlign: "center",
    fontSize: fontSizes.large,
    fontFamily: fontFamily.displayBold,
  },
  couponDesc: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: fontSizes.small,
    fontFamily: fontFamily.regularMedium,
  },
  quantity: {
    textAlign: "center",
    fontSize: fontSizes.small,
    fontFamily: fontFamily.displayRegular,
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
    flex: 1,
    top: 1,
    right: -1,
    backgroundColor: "#000",
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
  statusText: {
    textAlign: "center",
    fontFamily: fontFamily.regularMedium,
    fontSize: fontSizes.regular,
    maxWidth: 300,
    alignSelf: "center",
    marginTop: 30,
  },
  sticker: {
    position: "absolute",
    bottom: 130,
    height: 200,
    width: 200,
  },
  button: {
    position: "absolute",
    bottom: 20,
    width: "80%",
    alignSelf: "center",
  },
});
