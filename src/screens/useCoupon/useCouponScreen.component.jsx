import { View, Text } from "react-native";

const UseCoupon = ({ route }) => {
  const { itemTitle } = route.params;

  return (
    <View>
      <Text>{itemTitle}</Text>
    </View>
  );
};

export default UseCoupon;
