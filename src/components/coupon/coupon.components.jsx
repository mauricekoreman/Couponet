import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./coupon.styles";
import { formatDate } from "../../utils/formatDate";

const Coupon = ({ item, id }) => {
  const navigation = useNavigation();

  const { title, quantity, used, status, color, expirationDate } = item;

  return (
    <Pressable
      unstable_pressDelay={40}
      onPress={() =>
        navigation.navigate("useCouponScreen", {
          couponId: id,
          couponData: item,
        })
      }
      style={styles.pressable}
    >
      {({ pressed }) => (
        <>
          <View style={styles.shadow} />
          <View style={[styles.whiteBack, pressed && styles.pressed]} />
          <View
            style={[
              styles.container,
              { backgroundColor: color },
              (status === "finished" || status === "expired") && styles.disabled,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.expirationDate}>{formatDate(expirationDate.toDate())}</Text>
            <Text style={styles.title}>{title}</Text>
            <View style={{ alignItems: "center", position: "absolute", bottom: 10 }}>
              <Text style={styles.quantity}>Quantity:</Text>
              <View style={styles.quantityBoxContainer}>
                {[...Array(quantity)].map((_, i) => (
                  <View key={i} style={styles.quantityBox}>
                    <View style={styles.quantityBoxShadow} />
                    <View style={styles.quantityBoxWhite} />
                    <View
                      style={[styles.box, { backgroundColor: i + 1 <= used ? "#B5B4B4" : "#FFF" }]}
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </>
      )}
    </Pressable>
  );
};

export default Coupon;
