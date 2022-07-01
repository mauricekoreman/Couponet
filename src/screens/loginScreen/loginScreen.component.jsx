import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useAuth } from "../../contexts/authContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  async function handleLogin() {
    try {
      setError("");
      setLoading(true);
      await login(email, password);
    } catch (error) {
      console.error("Login error: ", error);
      setError("Failed to login");
    }
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
      <Button disabled={loading} title='Login!' onPress={handleLogin} />
      <Button title='No account? Register here!' onPress={() => navigation.navigate("register")} />
    </View>
  );
};

export default LoginScreen;
