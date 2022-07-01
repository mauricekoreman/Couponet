import { useAuth } from "../contexts/authContext";
import { UserProvider } from "../contexts/userContext";
import AuthStack from "./authStack.route";
import UserStack from "./userStack.route";

const Routes = () => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <UserProvider>
      <UserStack />
    </UserProvider>
  ) : (
    <AuthStack />
  );
};

export default Routes;
