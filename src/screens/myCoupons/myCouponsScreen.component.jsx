import { ScrollView } from "react-native";

import CouponsList from "../../components/couponList/couponList.component";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";

import { styles } from "./myCoupons.styles";

const MyCoupons = ({ navigation }) => {
  return (
    <>
      <ScrollView>
        {/* <CouponsList /> */}
        {/* <CouponsList /> */}
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
