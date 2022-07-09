import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/loginScreen/loginScreen.component";
import RegisterScreen from "../screens/registerScreen/registerScreen.component";
import { colors } from "../utils/designSystem";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: "",
        headerStyle: { backgroundColor: colors.backgroundColor },
      }}
    >
      <Stack.Screen name='login' component={LoginScreen} />
      <Stack.Screen name='register' component={RegisterScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AuthStack;
