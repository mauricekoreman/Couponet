import { Dimensions, StyleSheet } from "react-native";
import { colors, fontFamily, fontSizes } from "../../utils/designSystem";

const size = Dimensions.get("window").width;
const maxSize = size > 700 ? "70%" : size;

export const styles = StyleSheet.create({
  screenContainer: {
    paddingVertical: 20,
    backgroundColor: colors.backgroundColor,
  },
  altScreenContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  sticker: {
    resizeMode: "contain",
    height: size,
    width: size,
    maxHeight: maxSize,
    maxWidth: maxSize,
  },
  text: {
    textAlign: "center",
    fontFamily: fontFamily.displayBold,
    fontSize: fontSizes.large,
  },
});
