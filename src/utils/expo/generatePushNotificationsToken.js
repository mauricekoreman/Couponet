import { isDevice } from "expo-device";
import { openSettings } from "expo-linking";
import {
  getPermissionsAsync,
  requestPermissionsAsync,
  getExpoPushTokenAsync,
} from "expo-notifications";
import { Platform } from "react-native";
import { Alert } from "react-native";

async function generatePushNotificationsToken() {
  let token;

  if (isDevice && Platform.OS !== "web") {
    const { status: existingStatus } = await getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert(
        "Error",
        "Sorry we need your permissions to enable push notifications. Please enable it in your privacy settings.",
        [{ text: "OK" }, { text: "Open settings", onPress: async () => openSettings() }]
      );
      return;
    }

    token = (await getExpoPushTokenAsync()).data;

    return token;
  } else {
    Alert.alert("Must use a physical device for push notifications");
  }

  return token;
}

export default generatePushNotificationsToken;
