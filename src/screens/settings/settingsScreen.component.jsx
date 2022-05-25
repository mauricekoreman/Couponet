import { View, Text, Button } from "react-native";

import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

import { writeTest } from "../../firebase/test.controller";
import { addLinkedReceivedCoupons, logoutUser } from "../../firebase/firestore";

const SettingsScreen = () => {
  async function getUserData() {
    const user = getAuth().currentUser;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data: ", docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  return (
    <View>
      <Button title='Write test data' onPress={() => writeTest()} />
      <Button title='Get user data' onPress={() => addLinkedReceivedCoupons()} />
      <Button title='Logout!' onPress={logoutUser} />
    </View>
  );
};

export default SettingsScreen;
