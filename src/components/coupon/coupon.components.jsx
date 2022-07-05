import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./coupon.styles";

const Coupon = ({ item, id }) => {
  const navigation = useNavigation();

  const { title, quantity, used, status } = item;

  return (
    <Pressable
      disabled={status === "finished" ? true : false}
      unstable_pressDelay={40}
      onPress={() =>
        navigation.navigate("useCouponScreen", {
          couponId: id,
          couponData: item,
        })
      }
      style={{ marginBottom: 10 }}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.container,
            status === "finished" && styles.disabled,
            {
              backgroundColor: pressed ? "#CCC" : "#FFF",
            },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.quantity}>QUANTITY:</Text>
          <View style={styles.quantityBoxContainer}>
            {[...Array(quantity)].map((_, i) => {
              return <View key={i} style={[styles.quantityBox, i + 1 <= used && styles.green]} />;
            })}
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default Coupon;
