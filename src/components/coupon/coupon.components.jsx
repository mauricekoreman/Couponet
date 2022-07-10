import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./coupon.styles";

const Coupon = ({ item, id, color }) => {
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
      style={{ marginBottom: 30, width: "90%", alignSelf: "center" }}
    >
      {({ pressed }) => (
        <>
          <View style={styles.shadow} />
          <View style={styles.whiteBack} />
          <View
            style={[
              styles.container,
              { backgroundColor: color },
              status === "pending" && { borderColor: "#E8C412" },
              status === "finished" && styles.disabled,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.title}>{title}</Text>
            <View style={{ alignItems: "center", position: "absolute", bottom: 10 }}>
              <Text style={styles.quantity}>Quantity:</Text>
              <View style={styles.quantityBoxContainer}>
                {[...Array(quantity)].map((_, i) => {
                  return (
                    <View key={i} style={styles.quantityBox}>
                      <View style={styles.quantityBoxShadow} />
                      <View
                        style={[
                          styles.box,
                          { backgroundColor: i + 1 <= used ? "#B5B4B4" : "#FFF" },
                        ]}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </>
      )}
    </Pressable>
  );
};

export default Coupon;
