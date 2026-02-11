import { Stack } from 'expo-router';

export default function BusesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'News',
          headerTransparent: true
        }}
      />
    </Stack>
  );
}