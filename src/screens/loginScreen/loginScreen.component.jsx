import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase/firebase.config";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function loginUser() {
    if (email === "" || password === "") {
      setError("Email and password are mandatory.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <View>
      {!!error && (
        <View>
          <Text>{error}</Text>
        </View>
      )}
      <TextInput onChangeText={setEmail} value={email} placeholder='Email' />
      <TextInput onChangeText={setPassword} value={password} placeholder='Password' />
      <Button title='Login!' onPress={loginUser} />
      <Button title='No account? Register here!' onPress={() => navigation.navigate("register")} />
    </View>
  );
};

export default LoginScreen;
