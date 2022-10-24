import { Platform, StyleSheet } from "react-native";
import { colors, fontFamily, fontSizes } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.backgroundColor,
  },
  container: {
    flex: 1,
    marginHorizontal: "10%",
    marginTop: 40,
    paddingBottom: 20,
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
    // marginBottom: 60,
  },
  createCouponButton: {
    marginBottom: 2,
    marginTop: 80,
  },
  stickerText: {
    fontFamily: fontFamily.displayRegular,
    paddingTop: Platform.OS === "ios" ? 2 : 0, // IOS cuts off top 2px off Rockwell regular
    fontSize: fontSizes.large,
    alignSelf: "center",
  },
  stickerButtons: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
});
