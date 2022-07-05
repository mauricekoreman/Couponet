import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

import { useUser } from "../../contexts/userContext";

import CouponsList from "../../components/couponList/couponList.component";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";

import { styles } from "./myCoupons.styles";

const MyCoupons = ({ navigation }) => {
  const { couponsGivenRef } = useUser();
  const [myCoupons, setMyCoupons] = useState([]);
  const [pendingCoupons, setPendingCoupons] = useState([]);

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
    </>
  );
};

export default MyCoupons;
