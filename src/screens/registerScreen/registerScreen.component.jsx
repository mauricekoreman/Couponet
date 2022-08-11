import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useAuth } from "../../contexts/authContext";

import { styles } from "./registerScreen.styles";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";
import Input from "../../components/input/input.component";
import Square from "../../components/elements/square.component";
import { colors } from "../../utils/designSystem";

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
      await register(name, email, password);
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
    <KeyboardAwareScrollView style={styles.background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.registerScreenContainer}>
          <Square
            color={colors.couponColors.blue}
            height={32}
            width={32}
            borderRadius={7}
            containerStyle={{ right: 60 }}
          />
          <View style={styles.headingContainer}>
            <Text style={styles.headingSmall}>Register to</Text>
            <Text style={styles.headingLarge}>Couponet</Text>
          </View>

          <View style={styles.contentContainer}>
            <Square
              containerStyle={{ transform: [{ translateX: -30 }, { translateY: -43 }] }}
              color={colors.couponColors.pink}
              borderRadius={10}
            />
            <Square
              color={colors.couponColors.purple}
              borderRadius={10}
              width={130}
              containerStyle={{
                right: 0,
                bottom: 0,
                transform: [{ translateX: 10 }, { translateY: -80 }],
              }}
            />
            <Input onChangeText={setName} value={name} placeholder='Name' />
            <Input onChangeText={setEmail} value={email} placeholder='Email' />
            <Input
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
              placeholder='Password'
            />
            <Input
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder='Confirm password'
            />
            <PrimaryButton
              style={{ marginTop: 30, marginBottom: 2, width: "100%" }}
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
