import {
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import Feather from "@expo/vector-icons/Feather";
import { addDoc, doc, getDoc } from "firebase/firestore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { formatDate } from "../../utils/formatDate";
import { useUser } from "../../contexts/userContext";
import { useAuth } from "../../contexts/authContext";

import { coupons, stickersCol } from "../../firebase/firestore.collections";

import Input from "../../components/input/input.component";
import Counter from "../../components/counter/counter.component";
import ModalComponent from "../../components/modal/modal.component";
import TextButton from "../../components/buttons/textButton/textButton.component";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";

import { styles } from "./createCouponScreen.styles";
import SecondaryButton from "../../components/buttons/secondaryButton/secondaryButton.component";
import Sticker from "../../components/sticker/sticker.component";
import { colors } from "../../utils/designSystem";

const CreateCouponScreen = ({ navigation }) => {
  const { userData } = useUser();
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [stickers, setStickers] = useState({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [selectedColor, setSelectedColor] = useState(colors.couponColors.blue);
  const [sticker, setSticker] = useState(null);

  const [displayDate, setDisplayDate] = useState(formatDate(new Date()));

  async function getStickers() {
    const catStickersRef = doc(stickersCol, "cat-stickers");
    const catStickersSnap = await getDoc(catStickersRef);
    setStickers(catStickersSnap.data());
  }

  useEffect(() => {
    if (Object.keys(stickers).length === 0) getStickers();
  }, []);

  function handleConfirmDate(date) {
    setExpirationDate(date);
    setDisplayDate(formatDate(date));
    setDatePickerVisibility(false);
  }

  async function handleCreateCoupon() {
    try {
      if (!title) {
        return setError("Fill in all required fields");
      }

      const couponData = {
        title,
        description,
        quantity,
        color: selectedColor,
        sticker,
        used: 0,
        expirationDate,
        status: "idle",
        to: userData.linked,
        from: currentUser.uid,
        createdAt: new Date(),
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
    <KeyboardAwareScrollView style={styles.background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Input
            label={"Title*"}
            value={title}
            onChangeText={setTitle}
            placeholder='Title'
            maxLength={35}
            style={styles.inputStyle}
          />
          <Input
            label={"Description"}
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholder='Description'
            multiline
            maxLength={120}
            numberOfLines={4}
            style={styles.inputStyle}
          />

          <Text style={styles.label}>Quantity</Text>
          <Counter count={quantity} setCount={setQuantity} minCount={1} maxCount={5} />

          <Text style={[styles.label, { marginTop: 30 }]}>Expiration date</Text>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode='date'
            onConfirm={handleConfirmDate}
            onCancel={() => setDatePickerVisibility(false)}
          />

          <TextButton
            title={displayDate}
            icon={<Feather name='calendar' size={35} />}
            onPress={() => setDatePickerVisibility(true)}
            style={styles.datePickerBtn}
          />

          <Text style={[styles.label, { marginTop: 30 }]}>Choose a coupon color</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginBottom: 60,
            }}
          >
            {Object.entries(colors.couponColors).map((color) => (
              <Pressable
                key={color[0]}
                onPress={() => setSelectedColor(color[1])}
                style={({ pressed }) => [
                  { opacity: pressed ? 0.6 : 1 },
                  color[1] === selectedColor && { borderWidth: 2 },
                  {
                    height: 50,
                    width: 50,
                    margin: 5,
                    backgroundColor: color[1],
                    flexGrow: 1,
                  },
                ]}
              />
            ))}
          </View>

          {sticker ? (
            <Sticker image={sticker} style={{ height: 150, width: 150 }} />
          ) : (
            <Text style={styles.stickerText}>Choose a sticker?</Text>
          )}

          <View style={styles.stickerButtons}>
            <SecondaryButton
              width={120}
              style={{ marginHorizontal: 4 }}
              title='Choose'
              onPress={() => setModalVisible(!modalVisible)}
            />
            {sticker && (
              <SecondaryButton
                width={120}
                style={{ marginHorizontal: 4 }}
                title='Delete'
                onPress={() => setSticker(null)}
              />
            )}
          </View>

          <ModalComponent
            modalVisible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <ScrollView
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {Object.entries(stickers).map((el) => (
                <Pressable
                  key={el[0]}
                  style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                  onPress={() => {
                    setSticker(el[1].url);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Image
                    source={{ uri: el[1].url }}
                    style={{
                      margin: 5,
                      resizeMode: "contain",
                      height: 160,
                      width: 160,
                    }}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </ModalComponent>

          <PrimaryButton
            disabled={loading}
            title={loading ? "Loading..." : "Create coupon!"}
            onPress={handleCreateCoupon}
            style={styles.createCouponButton}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};
export default CreateCouponScreen;
