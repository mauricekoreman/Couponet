import { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, Text, View } from "react-native";

import { styles } from "./counter.styles";

const Counter = ({ setCount, count = 1, minCount, maxCount }) => {
  const [value, setValue] = useState(minCount || 1);

  const [incrementDisabled, setIncrementDisabled] = useState(false);
  const [decrementDisabled, setDecrementDisabled] = useState(false);

  useEffect(() => {
    if (value <= minCount) {
      // disable decrement button
      setDecrementDisabled(true);
    } else {
      setDecrementDisabled(false);
    }

    if (value >= maxCount) {
      // Disable increment button
      setIncrementDisabled(true);
    } else {
      setIncrementDisabled(false);
    }
  }, [value]);

  function increment() {
    setCount((prevState) => prevState + 1);
    setValue((prevState) => prevState + 1);
  }

  function decrement() {
    setCount((prevState) => prevState - 1);
    setValue((prevState) => prevState - 1);
  }

  return (
    <View style={styles.counterContainer}>
      <View style={[decrementDisabled && styles.disabled]}>
        <View style={styles.shadow} />
        <Pressable
          disabled={decrementDisabled}
          onPress={decrement}
          style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        >
          <Feather name='minus' size={24} />
        </Pressable>
      </View>

      <Text style={styles.countValue}>{count}</Text>

      <View style={[incrementDisabled && styles.disabled]}>
        <View style={styles.shadow} />
        <Pressable
          disabled={incrementDisabled}
          onPress={increment}
          style={({ pressed }) => [
            styles.btn,
            pressed && styles.btnPressed,
            incrementDisabled && styles.disabled,
          ]}
        >
          <Feather name='plus' size={24} />
        </Pressable>
      </View>
    </View>
  );
};

export default Counter;
