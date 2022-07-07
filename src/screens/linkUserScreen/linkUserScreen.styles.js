import { StyleSheet } from "react-native";

import { fontSizes, fontFamily } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  linkUserScreenContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  heading: {
    alignSelf: "center",
    fontFamily: fontFamily.display,
    fontSize: fontSizes.large,
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
    alignSelf: "center",
    position: "absolute",
    bottom: 50,
  },
});
