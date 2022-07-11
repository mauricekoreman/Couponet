import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import Feather from "@expo/vector-icons/Feather";
import Input from "../../components/input/input.component";
import { Dimensions, Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

import { useAuth } from "../../contexts/authContext";
import { useUser } from "../../contexts/userContext";

import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";
import TertiaryButton from "../../components/buttons/tertiaryButton/tertiaryButton.component";

import { styles } from "./settingsScreen.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SettingsScreen = ({ navigation }) => {
  const headerHeight = useHeaderHeight();

  const { logout, changeEmail, resetPassword } = useAuth();
  const { userData, updateUserData, updateLinkedUserData, unlinkUser } = useUser();

  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setError("");

    try {
      await logout();
    } catch (error) {
      console.error("Logout error: ", error);
      setError("Failed to log out");
    }
  }

  async function handleUnlink() {
    try {
      await unlinkUser();
    } catch (error) {
      console.error(error);
      setError("Failed to unlink");
    }
  }

  async function saveChanges() {
    try {
      setLoading(true);
      if (userData.email !== email) {
        await changeEmail(email);
      }

      // Changes the data for the current user
      await updateUserData({ name: name, email: email });

      // Change the name value for the linked user
      await updateLinkedUserData({ linkedUserName: name });
    } catch (error) {
      console.error(error);
      setError("Failed to update user data");
    } finally {
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

    if (success) {
      Toast.show({
        type: "success",
        text1: success,
      });
    }

    setError("");
    setSuccess("");
  }, [error, success]);

  return (
    <KeyboardAwareScrollView style={styles.background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            { height: Dimensions.get("window").height - headerHeight },
            styles.settingsScreenContainer,
          ]}
        >
          <Input
            style={styles.input}
            label={"Name"}
            placeholder={"Name"}
            value={name}
            onChangeText={setName}
          />
          <Input
            editable={false}
            label={"Email"}
            placeholder={"Email"}
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.buttonsContainer}>
            <TertiaryButton
              onPress={() => {
                resetPassword(userData.email)
                  .then(() => setSuccess(`An email has been sent to ${userData.email}!`))
                  .catch((error) => setError("Something went wrong..."));
              }}
              containerStyle={styles.textBtnContainer}
              title='Change password'
              icon={<Feather name='key' size={26} />}
            />
            <TertiaryButton
              containerStyle={styles.textBtnContainer}
              icon={<Feather name='log-out' size={26} />}
              title='Logout'
              onPress={handleLogout}
            />
            <TertiaryButton
              onPress={handleUnlink}
              containerStyle={styles.textBtnContainer}
              icon={<Feather name='link' size={24} />}
              title={`Unlink with ${userData.linkedUserName}`}
            />
            <TertiaryButton
              onPress={() =>
                navigation.navigate("provideCredentials", {
                  buttonTitle: "Delete account",
                })
              }
              containerStyle={{ marginTop: 30 }}
              title={"Delete account"}
              color={"red"}
              icon={<Feather color={"red"} name='trash-2' size={24} />}
            />
          </View>
          <PrimaryButton
            disabled={loading}
            onPress={saveChanges}
            style={{ position: "absolute", bottom: 20, width: "100%", alignSelf: "center" }}
            title='Save changes'
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default SettingsScreen;
