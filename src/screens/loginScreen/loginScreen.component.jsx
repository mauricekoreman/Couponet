import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

import { loginUser } from "../../firebase/firestore";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login() {
    await loginUser(email, password, setError);
  }

  return (
    <View>
      {!!error && (
        <View>
          <Text>{error}</Text>
        </View>
      )}
      <TextInput onChangeText={(text) => setEmail(text)} value={email} placeholder='Email' />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder='Password'
      />
      <Button title='Login!' onPress={login} />
      <Button title='No account? Register here!' onPress={() => navigation.navigate("register")} />
    </View>
  );
};

export default LoginScreen;
