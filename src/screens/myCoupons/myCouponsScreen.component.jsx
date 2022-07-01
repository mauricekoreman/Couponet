import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { onSnapshot } from "firebase/firestore";

import { useUser } from "../../contexts/userContext";

import CouponsList from "../../components/couponList/couponList.component";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";

import { styles } from "./myCoupons.styles";

const MyCoupons = ({ navigation }) => {
  const { couponsGivenRef } = useUser();
  const [myCoupons, setMyCoupons] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(couponsGivenRef, (snapshot) => {
      setMyCoupons(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <ScrollView>
        <CouponsList data={myCoupons} />
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
