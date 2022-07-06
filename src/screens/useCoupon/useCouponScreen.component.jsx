import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase/firebase.config";
import { useAuth } from "../../contexts/authContext";

import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";

import { styles } from "./useCouponScreen.styles";
import sendPushNotification from "../../utils/expo/sendPushNotification";
import { useUser } from "../../contexts/userContext";

const UseCoupon = ({ route }) => {
  const { currentUser } = useAuth();
  const { userData } = useUser();
  const { couponId, couponData } = route.params;
  const { title, description, quantity, used, expirationDate, status, from, to } = couponData;
  const [error, setError] = useState("");
  const [statusState, setStatusState] = useState(status);
  const [usedState, setUsedState] = useState(used);

  function checkIfBtnDisabled() {
    if (
      (statusState === "pending" && from !== currentUser.uid) ||
      (statusState === "idle" && from === currentUser.uid)
    ) {
      return true;
    } else {
      return false;
    }
  }

  async function handleUseCoupon() {
    try {
      setError("");
      const couponRef = doc(db, "coupons", couponId);
      await updateDoc(couponRef, {
        status: "pending",
      });

      // set status to pending visually
      setStatusState("pending");

      // get linked user push token
      const linkedUserDocRef = doc(db, "users", userData.linked);
      const { pushToken, name } = (await getDoc(linkedUserDocRef)).data();

      await sendPushNotification({
        pushToken: pushToken,
        title: "Coupon used",
        message: `${name} used a coupon!`,
      });
    } catch (err) {
      console.error(err);
      setError(err.code);
    }
  }

  async function handleConfirmUsed() {
    try {
      setError("");
      const newUsedAmount = used + 1;
      let state = "idle";

      if (newUsedAmount === quantity) {
        state = "finished";
      }

      const couponRef = doc(db, "coupons", couponId);
      await updateDoc(couponRef, {
        status: state,
        used: newUsedAmount,
      });

      // set status visually in app as well.
      setUsedState((prevState) => prevState + 1);
      setStatusState(state);
    } catch (err) {
      console.error(err);
      setError(err.code);
    }
  }

  useEffect(() => {
    if (!!error) {
      Toast.show({
        type: "error",
        text1: error,
      });
    }

    setError("");
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.couponContainer}>
        <Text style={styles.couponTitle}>{title}</Text>
        <View style={styles.divider} />
        <Text style={styles.couponDesc}>{description}</Text>
        <Text style={styles.quantity}>QUANTITY</Text>
        <View style={styles.quantityBoxContainer}>
          {[...Array(quantity)].map((_, i) => {
            return (
              <View key={i} style={[styles.quantityBox, i + 1 <= usedState && styles.green]} />
            );
          })}
        </View>
      </View>
      <Text>Status: {statusState}</Text>
      {statusState === "pending" && (
        <Text style={{ color: "#E8C412", textAlign: "center", paddingVertical: 20 }}>
          {from === currentUser.uid
            ? "... has used this coupon and is waiting for you to confirm that it has been fulfilled!"
            : "Status: waiting for ... to confirm completion"}
        </Text>
      )}
      <PrimaryButton
        disabled={checkIfBtnDisabled()}
        title={from === currentUser.uid ? "Confirm used!" : "Use coupon!"}
        onPress={from === currentUser.uid ? handleConfirmUsed : handleUseCoupon}
      />
    </View>
  );
};

export default UseCoupon;
