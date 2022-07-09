import { useState, useEffect } from "react";
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
import usePushNotifications from "../utils/hooks/usePushNotifications";
import generatePushNotificationsToken from "../utils/expo/generatePushNotificationsToken";
import BarcodeScannerScreen from "../screens/barcodeScannerScreen/barcodeScannerScreen.screen";
import { colors, fontFamily, fontSizes } from "../utils/designSystem";

const Stack = createNativeStackNavigator();

const UserStack = () => {
  const { userData, updateUserData } = useUser();

  const { notification } = usePushNotifications();

  useEffect(() => {
    // put token in firebase
    generatePushNotificationsToken().then((token) => updateUserData({ pushToken: token }));
  }, []);

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
          <Stack.Screen
            name='homeTabNavigator'
            component={HomeTabNavigator}
            options={({ navigation }) => ({
              headerTitle: "CouponMe",
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("settingsScreen")}>
                  <Feather name='settings' size={28} />
                </TouchableOpacity>
              ),
            })}
          />
        ) : (
          <>
            <Stack.Screen
              name='linkUserScreen'
              component={LinkUserScreen}
              options={{ headerTitle: "" }}
            />
            <Stack.Screen
              name='barcodeScannerScreen'
              component={BarcodeScannerScreen}
              options={{ animation: "slide_from_bottom" }}
            />
          </>
        )}
        <Stack.Screen name='useCouponScreen' component={UseCoupon} />
        <Stack.Screen name='settingsScreen' component={SettingsScreen} />
        <Stack.Screen name='createCouponScreen' component={CreateCouponScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};;

export default UserStack;
