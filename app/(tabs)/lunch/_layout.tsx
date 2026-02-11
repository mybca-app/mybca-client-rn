import { Stack } from 'expo-router';

export default function LunchLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Lunch',
          headerTransparent: true
        }}
      />
    </Stack>
  );
}