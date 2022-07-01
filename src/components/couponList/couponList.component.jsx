import { useState } from "react";
import { TouchableWithoutFeedback, Text, View } from "react-native";

import Coupon from "../coupon/coupon.components";

const CouponsList = ({ data = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <View style={{ backgroundColor: "white", paddingVertical: 20, paddingHorizontal: 10 }}>
          <Text>All coupons given</Text>
        </View>
      </TouchableWithoutFeedback>
      {open && (
        <View>
          <View collapsable={false}>
            {data.map((item) => (
              <Coupon item={item.data} id={item.id} key={item.id} />
            ))}
          </View>
        </View>
      )}
    </>
  );
};

export default CouponsList;
