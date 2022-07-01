import { useState } from "react";
import { View, Text, Button } from "react-native";

import { useAuth } from "../../contexts/authContext";

const SettingsScreen = () => {
  const [error, setError] = useState("");
  const { logout } = useAuth();

  async function handleLogout() {
    setError("");

    try {
      await logout();
    } catch (error) {
      console.error("Logout error: ", error);
      setError("Failed to log out");
    }
  }

  return (
    <View>
      <Button title='Logout!' onPress={handleLogout} />
      {!!error && <Text>{error}</Text>}
    </View>
  );
};

export default SettingsScreen;
