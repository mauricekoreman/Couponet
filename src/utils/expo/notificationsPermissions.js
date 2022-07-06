import { getPermissionsAsync, IosAuthorizationStatus, requestPermissionsAsync } from "expo-notifications";

async function allowsNotifications() {
  const settings = getPermissionsAsync();
  return settings.granted || settings.ios?.status === IosAuthorizationStatus.PROVISIONAL;
}

function requestPermission() {
  return await requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  })
}

export { allowsNotifications, requestPermission }