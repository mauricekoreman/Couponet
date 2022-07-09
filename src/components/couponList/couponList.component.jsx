import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { TouchableWithoutFeedback, Text, View } from "react-native";

import Coupon from "../coupon/coupon.components";
import { styles } from "./couponList.styles";

const CouponsList = ({ data = [], title }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <View style={styles.listButton}>
          <Feather
            name='chevron-right'
            size={20}
            style={{ transform: [{ rotate: open ? "90deg" : "0deg" }] }}
          />
          <Text style={styles.listButtonText}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
      {open && (
        <View style={{ paddingHorizontal: 20 }}>
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
