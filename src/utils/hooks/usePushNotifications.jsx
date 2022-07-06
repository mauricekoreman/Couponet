import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  AndroidImportance,
  removeNotificationSubscription,
  setNotificationChannelAsync,
  setNotificationHandler,
} from "expo-notifications";
import { useEffect, useState, useRef } from "react";
import { Platform } from "react-native";

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const usePushNotifications = () => {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = addNotificationReceivedListener((notification) =>
      setNotification(notification)
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = addNotificationResponseReceivedListener((response) =>
      console.log(response)
    );

    if (Platform.OS === "android") {
      setNotificationChannelAsync("default", {
        name: "default",
        importance: AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return () => {
      removeNotificationSubscription(notificationListener.current);
      removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return { notification };
};

export default usePushNotifications;
