import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
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
    } catch (err) {
      console.error("Login error: ", err.code);
      setError("Failed to login");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
      });
    }

    setError("");
  }, [error]);

  return (
    <View>
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
