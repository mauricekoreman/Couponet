import { useState } from "react";
import { View, Text, TextInput } from "react-native";

import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";
import Input from "../../components/input/input.component";

import { styles } from "./createCouponScreen.styles";

const CreateCouponScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState();
  const [expirationDate, setExpirationDate] = useState("");

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
      <PrimaryButton
        title={"Create coupon!"}
        onPress={() => console.log("created new coupon")}
        style={styles.createCouponButton}
      />
    </View>
  );
};
export default CreateCouponScreen;
