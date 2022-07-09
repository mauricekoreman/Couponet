import { FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

import { useUser } from "../../contexts/userContext";

import Coupon from "../../components/coupon/coupon.components";

import { styles } from "./receivedCoupons.styles";

import { colors } from "../../utils/designSystem";

const ReceivedCoupons = () => {
  const { couponsReceivedRef } = useUser();
  const [receivedCoupons, setReceivedCoupons] = useState([]);

  const [couponColors, setCouponColors] = useState(Object.values(colors));

  useEffect(() => {
    const unsubscribe = onSnapshot(couponsReceivedRef, (snapshot) => {
      setReceivedCoupons(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return unsubscribe;
  }, []);

  return (
    <FlatList
      style={styles.screenContainer}
      data={receivedCoupons}
      keyExtractor={(coupon) => coupon.id}
      renderItem={({ item }) => (
        <Coupon
          item={item.data}
          id={item.id}
          color={couponColors[Math.floor(Math.random() * couponColors.length)]}
        />
      )}
    />
  );
};

export default ReceivedCoupons;
