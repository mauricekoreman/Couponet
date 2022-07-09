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
    fontSize: fontSizes.regular,
  },
  headingLarge: {
    fontFamily: fontFamily.displayRegular,
    fontSize: fontSizes.xlarge,
  },
  contentContainer: {
    paddingHorizontal: "10%",
  },
});
