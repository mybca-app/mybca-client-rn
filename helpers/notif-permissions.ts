import { AuthorizationStatus, getMessaging, hasPermission, requestPermission } from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

// Thank you, ChatGPT! :)
export async function requestNotifsPermission(): Promise<boolean> {
  if (Platform.OS === 'ios') {
    const currentStatus = await hasPermission(getMessaging());

    if (
      currentStatus === AuthorizationStatus.AUTHORIZED ||
      currentStatus === AuthorizationStatus.PROVISIONAL
    ) {
      console.log('ios: already has notification permission');
      return true;
    }

    console.log('ios: requesting notification permission');
    const newStatus = await requestPermission(getMessaging());

    return (
      newStatus === AuthorizationStatus.AUTHORIZED ||
      newStatus === AuthorizationStatus.PROVISIONAL
    );
  }

  if (Platform.OS === 'android') {
    const apiLevel = Platform.Version as number;

    if (apiLevel < 33) {
      console.log('android: has notification permission due to API version <33')
      return true;
    }

    console.log('android: requesting notification permission');
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  return false;
}
