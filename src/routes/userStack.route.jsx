import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feather from "@expo/vector-icons/Feather";

import HomeTabNavigator from "./homeTabNavigator.route";
import UseCoupon from "../screens/useCoupon/useCouponScreen.component";
import SettingsScreen from "../screens/settings/settingsScreen.component";

const Stack = createNativeStackNavigator();

const UserStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        statusBarStyle: "dark",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}
    >
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
      <Stack.Screen name='useCouponScreen' component={UseCoupon} />
      <Stack.Screen name='settingsScreen' component={SettingsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default UserStack;
