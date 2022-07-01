import { View } from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import { useUser } from "../../contexts/userContext";

import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";
import Input from "../../components/input/input.component";

import { styles } from "./createCouponScreen.styles";
import { addDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/authContext";
import { coupons } from "../../firebase/firestore.collections";

const CreateCouponScreen = ({ navigation }) => {
  const { userData } = useUser();
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [expirationDate, setExpirationDate] = useState("");

  async function handleCreateCoupon() {
    try {
      if (!title || !expirationDate) {
        return setError("Fill in all required fields");
      }

      const couponData = {
        title,
        description,
        quantity: Number(quantity),
        expirationDate,
        status: "idle",
        to: userData.linked,
        from: currentUser.uid,
      };

      const couponRef = await addDoc(coupons, couponData);

      if (!!couponRef) {
        navigation.goBack();
      }
    } catch (error) {
      console.error("Create coupon error: ", error);
      setError("Unable to create coupon...");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
    }

    setError("");
  }, [error]);

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
        keyboardType='numeric'
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
        disabled={loading}
        title={loading ? "Loading..." : "Create coupon!"}
        onPress={handleCreateCoupon}
        style={styles.createCouponButton}
      />
    </View>
  );
};
export default CreateCouponScreen;
