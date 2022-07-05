import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    height: 150,
    paddingTop: 40,
    paddingHorizontal: 40,
    borderWidth: 2,
  },
  disabled: {
    opacity: 0.4,
  },
  title: {
    fontSize: 18,
  },
  quantity: {
    marginTop: 30,
    fontSize: 10,
    letterSpacing: 3,
  },
  quantityBoxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    justifyContent: "center",
  },
  quantityBox: {
    height: 10,
    width: 30,
    borderWidth: 1,
    margin: 2,
    borderColor: "black",
  },
  green: {
    backgroundColor: "green",
  },
});
