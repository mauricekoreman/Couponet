import { TouchableWithoutFeedback, Text, View } from "react-native";
import { useState } from "react";

import Coupon from "../coupon/coupon.components";

import { DATA } from "../../data";

const CouponsList = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <View style={{ backgroundColor: "white", paddingVertical: 20, paddingHorizontal: 10 }}>
          <Text>Coupons used by Derin</Text>
        </View>
      </TouchableWithoutFeedback>
      {open && (
        <View>
          <View collapsable={false}>
            {DATA.map((item, key) => (
              <Coupon item={item} key={key} />
            ))}
          </View>
        </View>
      )}
    </>
  );
};

export default CouponsList;
