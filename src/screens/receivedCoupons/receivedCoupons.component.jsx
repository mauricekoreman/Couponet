import { FlatList, Image, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

import { useUser } from "../../contexts/userContext";

import Coupon from "../../components/coupon/coupon.components";

import { styles } from "./receivedCoupons.styles";

const ReceivedCoupons = () => {
  const { couponsReceivedRef, userData } = useUser();
  const [receivedCoupons, setReceivedCoupons] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(couponsReceivedRef, (snapshot) => {
      setReceivedCoupons(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return unsubscribe;
  }, []);

  return receivedCoupons.length > 0 ? (
    <FlatList
      style={styles.screenContainer}
      data={receivedCoupons}
      keyExtractor={(coupon) => coupon.id}
      renderItem={({ item }) => <Coupon item={item.data} id={item.id} />}
    />
  ) : (
    <View style={styles.altScreenContainer}>
      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/couponet-c8c94.appspot.com/o/cat-stickers%2Fpurr-costume-party.webp?alt=media&token=46be27c0-a61d-4d9e-b86d-c20e50bad4d2",
        }}
        style={styles.sticker}
      />
      <Text style={styles.text}>{`No coupons from ${userData.linkedUserName} yet`}</Text>
    </View>
  );
};

export default ReceivedCoupons;
