import { StyleSheet } from "react-native";

import { fontFamily, fontSizes } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  loginScreenContainer: {
    flex: 1,
    paddingTop: 30,
  },
  headingContainer: {
    alignSelf: "center",
    marginBottom: 80,
  },
  headingSmall: {
    fontFamily: fontFamily.regularMedium,
    fontSize: fontSizes.regular,
  },
  headingLarge: {
    fontFamily: fontFamily.display,
    fontSize: fontSizes.xlarge,
  },
  contentContainer: {
    paddingHorizontal: "10%",
  },
});
