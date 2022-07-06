import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/loginScreen/loginScreen.component";
import RegisterScreen from "../screens/registerScreen/registerScreen.component";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: "",
        statusBarHidden: false,
        statusBarStyle: "dark",
      }}
    >
      <Stack.Screen name='login' component={LoginScreen} />
      <Stack.Screen name='register' options={{ headerShown: true }} component={RegisterScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AuthStack;
