import { StyleSheet } from "react-native";
import { colors, fontFamily, fontSizes } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  modalCenteredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    marginTop: 50,
    borderWidth: 3,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontFamily: fontFamily.displayBold,
    fontSize: fontSizes.large,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: colors.couponColors.green,
    borderWidth: 2,
    marginBottom: 5,
  },
  buttonText: {
    color: "#000",
    fontFamily: fontFamily.displayBold,
    fontSize: fontSizes.regular,
    textAlign: "center",
  },
});
