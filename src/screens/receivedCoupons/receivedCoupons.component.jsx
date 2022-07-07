import { Button, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

import { useUser } from "../../contexts/userContext";

import Coupon from "../../components/coupon/coupon.components";

import { styles } from "./receivedCoupons.styles";

const ReceivedCoupons = () => {
  const { couponsReceivedRef } = useUser();
  const [receivedCoupons, setReceivedCoupons] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(couponsReceivedRef, (snapshot) => {
      setReceivedCoupons(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <FlatList
        style={styles.screenContainer}
        data={receivedCoupons}
        keyExtractor={(coupon) => coupon.id}
        renderItem={({ item }) => <Coupon item={item.data} id={item.id} />}
      />
    </>
  );
};

export default ReceivedCoupons;
