import "./src/firebase/firebase.config";

import AuthStack from "./src/routes/authStack.route";
import UserStack from "./src/routes/userStack.route";

import { useAuthentication } from "./src/utils/hooks/useAuthentication";

export default function App() {
  const { user } = useAuthentication();

  return user ? <UserStack /> : <AuthStack />;
}
