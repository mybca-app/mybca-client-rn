import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';
import { Button } from 'heroui-native';
import { useColorScheme } from 'react-native';

export default function BusesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Buses',
          headerTransparent: true,
          headerRight: () => (
            <Button size="sm" isIconOnly variant="ghost">
              <Ionicons name="information-circle-outline" size={24} color={useColorScheme() === 'dark' ? '#fff' : '#000'} />
            </Button>
          )
        }}
      />
    </Stack>
  );
}