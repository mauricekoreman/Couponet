import { Dimensions, StyleSheet } from "react-native";

import { fontFamily, fontSizes, colors } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.backgroundColor,
  },
  loginScreenContainer: {
    flex: 1,
    paddingTop: 30,
  },
  headingContainer: {
    alignSelf: "center",
    marginBottom: 100,
  },
  headingSmall: {
    fontFamily: fontFamily.displayRegular,
    paddingTop: Platform.OS === "ios" ? 2 : 0, // IOS cuts off top 2px off Rockwell regular
    fontSize: fontSizes.regular,
  },
  headingLarge: {
    fontFamily: fontFamily.displayRegular,
    paddingTop: Platform.OS === "ios" ? 2 : 0, // IOS cuts off top 2px off Rockwell regular
    fontSize: fontSizes.xlarge,
  },
  contentContainer: {
    paddingHorizontal: "10%",
  },
});
