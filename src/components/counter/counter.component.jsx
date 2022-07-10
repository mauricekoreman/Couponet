import { Pressable, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { styles } from "./counter.styles";

const Counter = ({ setCount, count = 1 }) => {
  function increment() {
    setCount((prevState) => prevState + 1);
  }

  function decrement() {
    setCount((prevState) => prevState - 1);
  }

  return (
    <View style={styles.counterContainer}>
      <View>
        <View style={styles.shadow} />
        <Pressable
          onPress={decrement}
          style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        >
          <Feather name='minus' size={24} />
        </Pressable>
      </View>

      <Text style={styles.countValue}>{count}</Text>

      <View>
        <View style={styles.shadow} />
        <Pressable
          onPress={increment}
          style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        >
          <Feather name='plus' size={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default Counter;
