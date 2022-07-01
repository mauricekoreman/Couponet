import { AuthProvider } from "./src/contexts/authContext";
import "./src/firebase/firebase.config";

import Routes from "./src/routes/routes";

// TODO: uninstall redux!

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
