import { Button, ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

import { useUser } from "../../contexts/userContext";

import CouponsList from "../../components/couponList/couponList.component";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";

import { styles } from "./myCoupons.styles";
import NavigatorTitle from "../../components/navigatorTitle/navigatorBadge.component";

const MyCoupons = ({ navigation }) => {
  const { couponsGivenRef } = useUser();
  const [myCoupons, setMyCoupons] = useState([]);
  const [pendingCoupons, setPendingCoupons] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      tabBarLabel: ({ focused }) => (
        <NavigatorTitle
          text={"Given coupons"}
          badge={pendingCoupons.length > 0}
          focused={focused}
        />
      ),
    });
  }, [pendingCoupons]);

  useEffect(() => {
    const unsubscribe = onSnapshot(couponsGivenRef, (snapshot) => {
      setMyCoupons(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setPendingCoupons(myCoupons.filter((coupon) => coupon.data.status === "pending"));
  }, [myCoupons]);

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <CouponsList
          title={`Coupons used by ... (${pendingCoupons.length})`}
          data={pendingCoupons}
        />
        <CouponsList title={"All coupons given"} data={myCoupons} />
      </ScrollView>
      <PrimaryButton
        title='Give new coupon'
        onPress={() => navigation.navigate("createCouponScreen")}
        style={styles.createCouponButton}
      />
    </View>
  );
};

export default MyCoupons;
