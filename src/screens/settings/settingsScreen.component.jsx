import { signOut } from "firebase/auth";
import { View, Text, Button } from "react-native";

import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

import { readTests, writeTest } from "../../firebase/test.controller";
import { auth } from "../../firebase/firebase.config";

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
      <Button title='Get user data' onPress={() => getUserData()} />
      <Button title='Logout!' onPress={() => signOut(auth)} />
    </View>
  );
};

export default SettingsScreen;
