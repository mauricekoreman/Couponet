import Toast from "react-native-toast-message";

import "./src/firebase/firebase.config";
import { AuthProvider } from "./src/contexts/authContext";

import Routes from "./src/routes/routes";
// TODO: uninstall redux!

export default function App() {
  return (
    <AuthProvider>
      <Routes />
      <Toast />
    </AuthProvider>
  );
}
