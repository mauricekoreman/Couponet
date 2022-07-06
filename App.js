import Toast from "react-native-toast-message";
import { useFonts } from "expo-font";

import "./src/firebase/firebase.config";
import { AuthProvider } from "./src/contexts/authContext";

import Routes from "./src/routes/routes";
// TODO: uninstall redux!

export default function App() {
  const [loaded] = useFonts({
    Pmingliu: require("./src/assets/fonts/PMINGLIU.ttf"),
    MontserratThin: require("./src/assets/fonts/Montserrat-Thin.ttf"),
    MontserratLight: require("./src/assets/fonts/Montserrat-Light.ttf"),
    MontserratRegular: require("./src/assets/fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("./src/assets/fonts/Montserrat-Medium.ttf"),
    MontserratSemiBold: require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("./src/assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Routes />
      <Toast />
    </AuthProvider>
  );
}
