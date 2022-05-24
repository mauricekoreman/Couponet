import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feather from "@expo/vector-icons/Feather";

import { getUserData } from "../firebase/firestore";

import HomeTabNavigator from "./homeTabNavigator.route";
import UseCoupon from "../screens/useCoupon/useCouponScreen.component";
import SettingsScreen from "../screens/settings/settingsScreen.component";
import CreateCouponScreen from "../screens/createCouponScreen/createCouponScreen.component";
import LinkUserScreen from "../screens/linkUserScreen/linkUserScreen.component";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const UserStack = () => {
  const linked = useSelector((state) => state.user.linked);

  useEffect(() => {
    async function isUserLinked() {
      const userData = await getUserData();

      if (userData?.linked) {
        console.log("linked with other user: ", userData.linked);
        // TODO: setLinked(true)
      } else {
        console.log("linked with none");
      }
    }

    isUserLinked();
  }, [linked]);

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
        {linked ? (
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
};

export default UserStack;
