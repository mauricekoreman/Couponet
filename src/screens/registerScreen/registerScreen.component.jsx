import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

import { registerNewUser } from "../../firebase/firestore";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function register() {
    await registerNewUser(email, password, name, setError);
  }

  return (
    <View>
      {!!error && (
        <View>
          <Text>{error}</Text>
        </View>
      )}
      <View>
        <TextInput onChangeText={(text) => setName(text)} value={name} placeholder='Name' />
        <TextInput onChangeText={(text) => setEmail(text)} value={email} placeholder='Email' />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder='Password'
        />
        <Button title='Register!' onPress={register} />
      </View>
    </View>
  );
};

export default RegisterScreen;
