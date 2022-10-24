import { StyleSheet } from "react-native";

import { colors, fontFamily, fontSizes } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.backgroundColor,
  },
  registerScreenContainer: {
    paddingTop: 30,
  },
  headingContainer: {
    alignSelf: "center",
    marginBottom: 80,
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
    flex: 1,
    paddingHorizontal: "10%",
  },
});
