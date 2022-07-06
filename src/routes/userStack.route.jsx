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

const Stack = createNativeStackNavigator();

const UserStack = () => {
  const { userData, updateUserData } = useUser();

  const { notification } = usePushNotifications();

  useEffect(() => {
    // put token in firebase
    generatePushNotificationsToken().then((token) => updateUserData({ pushToken: token }));
  }, []);

  // useEffect(() => {
  //   console.log("push token: ", userData.pushToken);
  //   console.log("notification: ", notification);
  //   console.log("----------");
  // }, [userData.pushToken, notification]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          statusBarStyle: "dark",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerBackTitleVisible: false,
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
                  <Feather name='settings' size={24} />
                </TouchableOpacity>
              ),
            })}
          />
        ) : (
          <Stack.Screen name='linkUserScreen' component={LinkUserScreen} />
        )}
        <Stack.Screen name='useCouponScreen' component={UseCoupon} />
        <Stack.Screen name='settingsScreen' component={SettingsScreen} />
        <Stack.Screen name='createCouponScreen' component={CreateCouponScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};;

export default UserStack;
