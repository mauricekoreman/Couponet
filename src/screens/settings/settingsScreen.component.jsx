import { signOut } from "firebase/auth";
import { View, Text, Button } from "react-native";

import { readTests, writeTest } from "../../firebase/test.controller";
import { auth } from "../../firebase/firebase.config";

const SettingsScreen = () => {
  return (
    <View>
      <Button title='Write test data' onPress={() => writeTest()} />
      <Button title='Read test data' onPress={() => readTests()} />
      <Button title='Logout!' onPress={() => signOut(auth)} />
    </View>
  );
};

export default SettingsScreen;
