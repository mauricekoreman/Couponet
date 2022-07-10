import { StyleSheet } from "react-native";
import { colors, fontFamily, fontSizes } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.backgroundColor,
  },
  container: {
    flex: 1,
    marginHorizontal: "10%",
    marginTop: 40,
    paddingBottom: 40,
  },
  inputStyle: {
    marginBottom: 25,
  },
  label: {
    fontFamily: fontFamily.regularMedium,
    fontSize: fontSizes.regular,
    marginBottom: 10,
  },
  datePickerBtn: {
    marginBottom: 60,
  },
  createCouponButton: {
    marginBottom: 2,
    marginTop: 80,
  },
  stickerText: {
    fontFamily: fontFamily.displayRegular,
    fontSize: fontSizes.large,
    alignSelf: "center",
  },
  stickerButtons: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
});
