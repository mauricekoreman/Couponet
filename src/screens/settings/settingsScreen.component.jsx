import { useState } from "react";
import { Text, Button, Image, ScrollView } from "react-native";

import { useAuth } from "../../contexts/authContext";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

const SettingsScreen = () => {
  const [error, setError] = useState("");
  const { logout } = useAuth();

  // Firebase shit
  const [stickers, setStickers] = useState({});

  useEffect(() => {
    const func = async () => {
      const catStickersRef = doc(db, "stickers", "cat-stickers");
      const catStickersSnap = await getDoc(catStickersRef);
      setStickers(catStickersSnap.data());
    };

    func();
  }, []);

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
    <ScrollView>
      <Button title='Logout!' onPress={handleLogout} />
      {Object.entries(stickers).map((el) => (
        <Image
          key={el[0]}
          source={{ uri: el[1].url }}
          style={{ resizeMode: "contain", height: 300, width: 300 }}
        />
      ))}
      {!!error && <Text>{error}</Text>}
    </ScrollView>
  );
};

export default SettingsScreen;
