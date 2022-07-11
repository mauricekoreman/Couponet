import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { coupons } from "../../firebase/firestore.collections";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import sendPushNotification from "../../utils/expo/sendPushNotification";

import { db } from "../../firebase/firebase.config";
import { useAuth } from "../../contexts/authContext";
import { useUser } from "../../contexts/userContext";

import Sticker from "../../components/sticker/sticker.component";
import TextButton from "../../components/buttons/textButton/textButton.component";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";

import { styles } from "./useCouponScreen.styles";
import { colors } from "../../utils/designSystem";
import { formatDate } from "../../utils/formatDate";

const UseCoupon = ({ route, navigation }) => {
  const { currentUser } = useAuth();
  const { userData } = useUser();
  const { couponId, couponData } = route.params;
  const { title, description, quantity, used, expirationDate, color, status, from, sticker } =
    couponData;
  const [error, setError] = useState("");
  const [statusState, setStatusState] = useState(status);
  const [usedState, setUsedState] = useState(used);

  function checkIfBtnDisabled() {
    if (
      (statusState === "pending" && from !== currentUser.uid) ||
      (statusState === "idle" && from === currentUser.uid) ||
      statusState === "expired"
    ) {
      return true;
    } else {
      return false;
    }
  }

  async function deleteCoupon() {
    try {
      const couponDoc = doc(coupons, couponId);
      await deleteDoc(couponDoc).then(() => navigation.goBack());
    } catch (error) {
      console.error(error);
      setError("Could not delete coupon");
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
    async function expireCoupon() {
      try {
        const state = "expired";
        // set status to expired
        const couponRef = doc(db, "coupons", couponId);
        await updateDoc(couponRef, {
          status: state,
        });

        // set state visually as well
        setStatusState(state);
      } catch (error) {
        console.log("Something went wrong with expiring the coupon...", error);
      }
    }

    // Check only if expired, when the database state is not set to expired yet
    if (status !== "expired") {
      const today = new Date();
      const expiration = expirationDate.toDate();

      // We only want to expire with absolute values of day, month and year. So thats why I created this ugly looking number.
      const todayStrNr = Number(
        String(today.getFullYear()) + String(today.getMonth() + 1) + String(today.getDate())
      );

      const expirationStrNr = Number(
        String(expiration.getFullYear()) +
          String(expiration.getMonth() + 1) +
          String(expiration.getDate())
      );

      if (todayStrNr > expirationStrNr) {
        expireCoupon();
      }
    }
  }, []);

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
        <View style={styles.shadow} />
        <View style={[styles.coupon, { backgroundColor: color }]}>
          <Text style={styles.expirationDate}>{formatDate(expirationDate.toDate())}</Text>
          <Text style={styles.couponTitle}>{title}</Text>
          <Text style={styles.couponDesc}>{description}</Text>

          <View style={{ alignItems: "center" }}>
            <Text style={styles.quantity}>Quantity</Text>
            <View style={styles.quantityBoxContainer}>
              {[...Array(quantity)].map((_, i) => {
                return (
                  <View key={i} style={styles.quantityBox}>
                    <View style={styles.quantityBoxShadow} />
                    <View
                      style={[
                        styles.box,
                        { backgroundColor: i + 1 <= usedState ? "#B5B4B4" : "#FFF" },
                      ]}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
      {statusState === "pending" && (
        <Text style={styles.statusText}>
          {from === currentUser.uid
            ? `${userData.linkedUserName} has used this coupon and is waiting for you to confirm that it has been fulfilled!`
            : `Status: waiting for ${userData.linkedUserName} to confirm completion`}
        </Text>
      )}
      {status === "expired" && <Text style={styles.expiredText}>Expired :(</Text>}
      {(status === "finished" || status === "expired" || statusState === "expired") && (
        <TextButton
          style={{ alignSelf: "center", marginTop: 10 }}
          fontSize={20}
          color={colors.couponColors.red}
          title='Delete coupon'
          onPress={deleteCoupon}
        />
      )}
      {sticker && <Sticker style={styles.sticker} image={sticker} imageSize={260} />}
      <PrimaryButton
        disabled={checkIfBtnDisabled()}
        title={from === currentUser.uid ? "Confirm used!" : "Use coupon!"}
        style={styles.button}
        onPress={from === currentUser.uid ? handleConfirmUsed : handleUseCoupon}
      />
    </View>
  );
};

export default UseCoupon;
