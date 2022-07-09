import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useAuth } from "../../contexts/authContext";

import { styles } from "./loginScreen.styles";
import { colors } from "../../utils/designSystem";

import TextButton from "../../components/buttons/textButton/textButton.component";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";
import Input from "../../components/input/input.component";
import Square from "../../components/elements/square.component";

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
    <KeyboardAwareScrollView style={styles.background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <Square
            color={colors.blue}
            height={32}
            width={32}
            borderRadius={7}
            containerStyle={{ right: 60 }}
          />
          <View style={styles.headingContainer}>
            <Text style={styles.headingSmall}>Login to</Text>
            <Text style={styles.headingLarge}>CouponMe</Text>
          </View>

          <View style={styles.contentContainer}>
            <Square
              containerStyle={{ transform: [{ translateX: -30 }, { translateY: -43 }] }}
              color={colors.pink}
              borderRadius={10}
            />
            <Input onChangeText={setEmail} value={email} placeholder='Email' />
            <Input
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
              placeholder='Password'
            />
            <PrimaryButton
              style={{ marginTop: 70, width: "100%" }}
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
