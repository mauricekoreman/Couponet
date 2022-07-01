import { View, Text } from "react-native";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";

const UseCoupon = ({ route }) => {
  const { couponId, couponData } = route.params;
  const { title, description, quantity, expirationDate, status } = couponData;

  async function handleUseCoupon() {}

  return (
    <View>
      <Text>ID: {couponId}</Text>
      <Text>Title: {title}</Text>
      <Text>Desc: {description}</Text>
      <Text>Quantity: {quantity}</Text>
      <Text>Expiration date: {expirationDate}</Text>
      <Text>Status: {status}</Text>

      <PrimaryButton title={"Use coupon!"} onPress={handleUseCoupon} />
    </View>
  );
};

export default UseCoupon;
