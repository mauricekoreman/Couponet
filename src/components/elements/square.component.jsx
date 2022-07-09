import { StyleSheet, View } from "react-native";

const Square = ({ containerStyle, height, width, color, borderRadius }) => (
  <View
    style={[styles.squareContainer, containerStyle, { height: height || 100, width: width || 100 }]}
  >
    <View style={[styles.shadow, { borderRadius: borderRadius || 10 }]} />
    <View style={[styles.square, { backgroundColor: color, borderRadius: borderRadius || 10 }]} />
  </View>
);

const styles = StyleSheet.create({
  squareContainer: {
    position: "absolute",
  },
  shadow: {
    backgroundColor: "#000",
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 2,
    right: -2,
  },
  square: {
    flex: 1,
    borderWidth: 2,
  },
});

export default Square;
