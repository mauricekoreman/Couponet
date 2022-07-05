import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 30,
  },
  couponContainer: {
    borderWidth: 1,
    width: "90%",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 25,
    paddingBottom: 18,
  },
  couponTitle: {
    fontSize: 25,
    textAlign: "center",
  },
  divider: {
    height: 2,
    width: 40,
    backgroundColor: "black",
    marginVertical: 10,
  },
  couponDesc: {
    fontSize: 15,
    textAlign: "center",
  },
  quantity: {
    marginTop: 40,
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
    // backgroundColor: "transparent",
  },
  green: {
    backgroundColor: "green",
  },
});
