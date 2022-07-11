import { StyleSheet } from "react-native";
import { colors } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.backgroundColor,
  },
  credentialsScreenContainer: {
    paddingTop: 30,
    flex: 1,
    paddingHorizontal: "5%",
  },
  input: {
    marginBottom: 30,
  },
  button: {
    position: "absolute",
    alignSelf: "center",
    width: "100%",
    bottom: 20,
  },
});
