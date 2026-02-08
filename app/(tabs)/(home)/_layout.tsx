import { Stack } from 'expo-router';

export default function HomeScreenLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'myBCA',
          headerTransparent: true
        }}
      />
    </Stack>
  );
}