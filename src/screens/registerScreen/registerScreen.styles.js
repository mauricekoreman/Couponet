import { StyleSheet } from "react-native";

import { fontFamily, fontSizes } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  registerScreenContainer: {
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
    fontSize: 60,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: "10%",
  },
});
