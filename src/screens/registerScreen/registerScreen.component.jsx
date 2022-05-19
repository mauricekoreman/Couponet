import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function registerUser() {
    if (email === "" || password === "") {
      setError("Email and password are mandatory.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("login");
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
      <View>
        <TextInput onChangeText={setName} value={name} placeholder='Name' />
        <TextInput onChangeText={setEmail} value={email} placeholder='Email' />
        <TextInput onChangeText={setPassword} value={password} placeholder='Password' />
        <Button title='Register!' onPress={registerUser} />
      </View>
    </View>
  );
};

export default RegisterScreen;
