import { Button, ScrollView } from "react-native";
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

  function handleNewParams() {
    navigation.setOptions({
      tabBarLabel: () => <NavigatorTitle text={"Received coupons"} badge />,
    });
  }

  useEffect(() => {
    navigation.setOptions({
      tabBarLabel: () => (
        <NavigatorTitle text={"Received coupons"} badge={pendingCoupons.length > 0} />
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
    <>
      <ScrollView>
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
      <Button title='Set params' onPress={handleNewParams} />
    </>
  );
};

export default MyCoupons;
