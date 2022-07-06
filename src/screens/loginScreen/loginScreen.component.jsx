import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useAuth } from "../../contexts/authContext";

import { styles } from "./loginScreen.styles";
import InputPrimary from "../../components/inputPrimary/inputPrimary.component";
import TextButton from "../../components/buttons/textButton/textButton.component";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";

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
    <KeyboardAwareScrollView style={{ backgroundColor: "#FFF" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingSmall}>Login to</Text>
            <Text style={styles.headingLarge}>CouponMe</Text>
          </View>

          <View style={styles.contentContainer}>
            <InputPrimary onChangeText={setEmail} value={email} placeholder='Email' />
            <InputPrimary
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
              placeholder='Password'
            />
            <PrimaryButton
              style={{ marginTop: 30, width: "100%" }}
              disabled={loading}
              title='Login!'
              onPress={handleLogin}
            />
            <TextButton
              style={{ marginTop: 30 }}
              title='No account? Register here!'
              onPress={() => navigation.navigate("register")}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
