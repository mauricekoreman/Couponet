import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { TouchableWithoutFeedback, Text, View } from "react-native";

import Coupon from "../coupon/coupon.components";

const CouponsList = ({ data = [], title }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <View
          style={{
            backgroundColor: "white",
            paddingVertical: 20,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather
            name='chevron-right'
            size={20}
            style={{ transform: [{ rotate: open ? "90deg" : "0deg" }] }}
          />
          <Text>{title}</Text>
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
