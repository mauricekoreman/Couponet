import { ScrollView } from "react-native";

import CouponsList from "../../components/couponList/couponList.component";

const MyCoupons = () => {
  return (
    <ScrollView>
      <CouponsList />
      <CouponsList />
    </ScrollView>
  );
};

export default MyCoupons;
