import { StyleSheet } from "react-native";

import { fontSizes, fontFamily, colors } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  linkUserScreenContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: "10%",
  },
  heading: {
    alignSelf: "center",
    fontFamily: fontFamily.displayRegular,
    fontSize: 40,
    textAlign: "center",
  },
  explanation: {
    alignSelf: "center",
    fontFamily: fontFamily.regularMedium,
    fontSize: fontSizes.regular,
    textAlign: "center",
    width: 200,
    marginTop: 30,
  },
  qrcodeContainer: {
    alignSelf: "center",
    marginTop: 50,
  },
  button: {
    width: "100%",
    alignSelf: "center",
    position: "absolute",
    bottom: 30,
  },
});
