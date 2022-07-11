import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useHeaderHeight } from "@react-navigation/elements";
import { Dimensions, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useAuth } from "../../contexts/authContext";

import Input from "../../components/input/input.component";
import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";

import { styles } from "./provideCredentialsScreen.styles";
import { useUser } from "../../contexts/userContext";

const ProvideCredentialsScreen = ({ route }) => {
  const headerHeight = useHeaderHeight();
  const { buttonTitle } = route.params;
  const { userData } = useUser();
  const { deleteAccount } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleReauthenticate() {
    try {
      setLoading(true);
      await deleteAccount(email, password, userData.linked);
    } catch (error) {
      setError(error.message);
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
        <View
          style={[
            styles.credentialsScreenContainer,
            { height: Dimensions.get("window").height - headerHeight },
          ]}
        >
          <Input
            style={styles.input}
            label='Email'
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.input}
            label='Password'
            secureTextEntry={true}
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
          />
          <PrimaryButton
            style={styles.button}
            disabled={loading}
            title={buttonTitle}
            onPress={handleReauthenticate}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default ProvideCredentialsScreen;
