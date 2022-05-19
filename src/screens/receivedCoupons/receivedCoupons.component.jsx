import { FlatList } from "react-native";

import { DATA } from "../../data";

import Coupon from "../../components/coupon/coupon.components";

const ReceivedCoupons = () => (
  <FlatList
    data={DATA}
    keyExtractor={(coupon) => coupon.id}
    renderItem={({ item }) => <Coupon item={item} />}
  />
);

export default ReceivedCoupons;
