import { useEffect, useState } from "react";
import { View } from "react-native";

import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";
import Input from "../../components/input/input.component";

import { styles } from "./createCouponScreen.styles";
import { createNewCoupon } from "../../firebase/firestore";

const CreateCouponScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState();
  const [expirationDate, setExpirationDate] = useState("");

  const [buttonTitle, setButtonTitle] = useState("Create coupon!");

  const submitCoupon = async () => {
    const couponData = {
      title,
      description,
      quantity,
      expirationDate,
    };

    const res = await createNewCoupon(couponData);
    setButtonTitle("Loading...");

    if (res) {
      setButtonTitle("Create coupon!");
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label={"Title"}
        value={title}
        onChangeText={setTitle}
        placeholder='Title'
        inputStyle={styles.inputStyle}
      />
      <Input
        label={"Description"}
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder='Description'
        multiline
        numberOfLines={4}
        inputStyle={styles.inputStyle}
      />
      <Input
        label={"Quantity"}
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        placeholder='Quantity'
        inputStyle={styles.inputStyle}
      />
      <Input
        label={"Date"}
        value={expirationDate}
        onChangeText={(text) => setExpirationDate(text)}
        placeholder='Expiration date'
        inputStyle={styles.inputStyle}
      />
      <PrimaryButton title={buttonTitle} onPress={submitCoupon} style={styles.createCouponButton} />
    </View>
  );
};
export default CreateCouponScreen;
