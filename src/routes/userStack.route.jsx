import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeTabNavigator from "./homeTabNavigator.route";
import UseCoupon from "../screens/useCoupon/useCouponScreen.component";
import SettingsScreen from "../screens/settings/settingsScreen.component";
import LinkUserScreen from "../screens/linkUserScreen/linkUserScreen.component";
import CreateCouponScreen from "../screens/createCouponScreen/createCouponScreen.component";

import { useUser } from "../contexts/userContext";
import { useAuth } from "../contexts/authContext";

import usePushNotifications from "../utils/hooks/usePushNotifications";
import generatePushNotificationsToken from "../utils/expo/generatePushNotificationsToken";
import BarcodeScannerScreen from "../screens/barcodeScannerScreen/barcodeScannerScreen.screen";
import { colors, fontFamily, fontSizes } from "../utils/designSystem";
import { onSnapshot } from "firebase/firestore";
import TextButton from "../components/buttons/textButton/textButton.component";
import ProvideCredentialsScreen from "../screens/provideCredentialsScreen/provideCredentialsScreen.component";

const Stack = createNativeStackNavigator();

const UserStack = () => {
  const { userData, updateUserData, userDocRef } = useUser();
  const { logout } = useAuth();

  const [error, setError] = useState("");

  const { notification } = usePushNotifications();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      setError("Unable to logout...");
    }
  }

  // create a subscription that listens to userData.linked firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc?.data()?.linked || doc?.data()?.linked === null) {
        updateUserData(doc.data());
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // put token in firebase
    generatePushNotificationsToken().then((token) => updateUserData({ pushToken: token }));
  }, []);

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
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerStyle: { backgroundColor: colors.backgroundColor },
          headerTitleStyle: { fontFamily: fontFamily.displayBold, fontSize: fontSizes.large },
        }}
      >
        {userData?.linked ? (
          <>
            <Stack.Screen
              name='homeTabNavigator'
              component={HomeTabNavigator}
              options={({ navigation }) => ({
                headerTitle: "Couponet",
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate("settingsScreen")}>
                    <Feather name='settings' size={28} />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name='useCouponScreen' options={{ title: "" }} component={UseCoupon} />
            <Stack.Screen
              name='settingsScreen'
              options={{ title: "Settings" }}
              component={SettingsScreen}
            />
            <Stack.Screen
              name='createCouponScreen'
              options={{ title: "New coupon" }}
              component={CreateCouponScreen}
            />
            <Stack.Screen
              name='provideCredentials'
              options={{ title: "Provide credentials" }}
              component={ProvideCredentialsScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name='linkUserScreen'
              component={LinkUserScreen}
              options={{
                headerTitle: "",
                headerRight: () => <TextButton onPress={handleLogout} title='Logout' />,
              }}
            />
            <Stack.Screen
              name='barcodeScannerScreen'
              component={BarcodeScannerScreen}
              options={{ headerTitle: "Scan QR-code", animation: "slide_from_bottom" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};;

export default UserStack;
