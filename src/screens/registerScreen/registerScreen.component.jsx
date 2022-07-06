import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useAuth } from "../../contexts/authContext";

import { styles } from "./registerScreen.styles";
import InputPrimary from "../../components/inputPrimary/inputPrimary.component";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";

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
    } catch (err) {
      console.error("Register error: ", err.code);
      setError("Failed to create an account");
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
        <View style={styles.registerScreenContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingSmall}>Register to</Text>
            <Text style={styles.headingLarge}>CouponMe</Text>
          </View>

          <View style={styles.contentContainer}>
            <InputPrimary onChangeText={setName} value={name} placeholder='Name' />
            <InputPrimary onChangeText={setEmail} value={email} placeholder='Email' />
            <InputPrimary
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
              placeholder='Password'
            />
            <InputPrimary
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder='Conform password'
            />
            <PrimaryButton
              style={{ marginTop: 30, width: "100%" }}
              disabled={loading}
              title='Register!'
              onPress={handleRegister}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};;

export default RegisterScreen;
