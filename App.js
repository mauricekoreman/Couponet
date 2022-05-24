import { Provider } from "react-redux";
import "./src/firebase/firebase.config";

import AuthStack from "./src/routes/authStack.route";
import UserStack from "./src/routes/userStack.route";

import { store } from "./src/redux/store";

import { useAuthentication } from "./src/utils/hooks/useAuthentication";

export default function App() {
  const { user } = useAuthentication();

  return user ? (
    <Provider store={store}>
      <UserStack />
    </Provider>
  ) : (
    <AuthStack />
  );
}
