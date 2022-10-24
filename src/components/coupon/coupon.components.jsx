import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./coupon.styles";
import { formatDate } from "../../utils/formatDate";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const Coupon = ({ item, id }) => {
  const navigation = useNavigation();
  const { title, quantity, used, status, color, expirationDate } = item;

  const [localStatus, setLocalStatus] = useState(status);

  async function expireCoupon() {
    try {
      const state = "expired";
      // set status to expired
      const couponRef = doc(db, "coupons", id);
      await updateDoc(couponRef, {
        status: state,
      });

      // set state visually as well
      setLocalStatus(state);
    } catch (error) {
      console.log("Something went wrong with expiring the coupon...", error);
    }
  }

  useEffect(() => {
    function checkIfExpired() {
      if (status === "expired" || status === "finished") {
        return;
      }

      const today = new Date();
      const expiration = expirationDate.toDate();

      // We only want to expire with absolute values of day, month and year. So thats why I created this ugly looking number.
      const todayStrNr = Number(
        String(today.getFullYear()) + String(today.getMonth() + 1) + String(today.getDate())
      );

      const expirationStrNr = Number(
        String(expiration.getFullYear()) +
          String(expiration.getMonth() + 1) +
          String(expiration.getDate())
      );

      if (todayStrNr > expirationStrNr) {
        expireCoupon();
      }
    }

    checkIfExpired();
    setLocalStatus(status);
  }, [status]);

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
              (localStatus === "finished" || localStatus === "expired") && styles.disabled,
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
