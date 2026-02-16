import { getMessaging, registerDeviceForRemoteMessages, subscribeToTopic, unsubscribeFromTopic } from '@react-native-firebase/messaging';

function townToNotifTopic(town: string): string {
  return (
    'bus-subscribed-' + town.toLowerCase().replace(/[^a-zA-Z0-9-_.~%]/g, '-')
  );
}

export async function subscribeToBus(bus: string) {
  const topic = townToNotifTopic(bus);

  console.log(`subscribing to topic: ${topic} (raw bus name: ${bus})`);
  await subscribeToTopic(getMessaging(), topic);
}

export async function unsubscribeFromBus(bus: string) {
  const topic = townToNotifTopic(bus);

  console.log(`unsubscribing from topic: ${topic} (raw bus name: ${bus})`);
  await unsubscribeFromTopic(getMessaging(), topic);
}