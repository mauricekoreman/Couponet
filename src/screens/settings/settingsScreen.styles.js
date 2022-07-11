import { StyleSheet } from "react-native";
import { colors } from "../../utils/designSystem";

export const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.backgroundColor,
  },
  settingsScreenContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  input: {
    marginBottom: 25,
  },
  buttonsContainer: {
    marginTop: 60,
  },
  textBtnContainer: {
    marginBottom: 30,
  },
});
