import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Coupon = ({ item, id }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      unstable_pressDelay={40}
      onPress={() =>
        navigation.navigate("useCouponScreen", {
          couponId: id,
          couponData: item,
        })
      }
      style={{ marginBottom: 10 }}
    >
      {({ pressed }) => (
        <View
          style={{
            backgroundColor: pressed ? "navy" : "green",
            width: "100%",
            height: 100,
          }}
        >
          <Text style={{ color: "white" }}>{item.title}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default Coupon;
