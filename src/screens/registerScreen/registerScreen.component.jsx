import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useAuth } from "../../contexts/authContext";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

  async function handleRegister() {
    if (confirmPassword !== password) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await register(email, password);
    } catch (error) {
      console.error("Register error: ", error);
      setError("Failed to create an account");
    }

    setLoading(false);
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
        <TextInput
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          placeholder='Conform password'
        />
        <Button disabled={loading} title='Register!' onPress={handleRegister} />
      </View>
    </View>
  );
};

export default RegisterScreen;
