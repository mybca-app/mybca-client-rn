import { useHeaderColor } from '@/hooks/use-header-color';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';
import { Button } from 'heroui-native';
import { Platform, useColorScheme } from 'react-native';

export default function BusesLayout() {
  const { background, foreground } = useHeaderColor();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Buses',
          headerStyle: {
            backgroundColor: background,
          },
          headerTintColor: foreground,
          headerTransparent: Platform.OS === 'ios',
          headerRight: () => (
            <Button size="sm" isIconOnly variant="ghost">
              <Ionicons name="information-circle-outline" size={24} color={useColorScheme() === 'dark' ? '#fff' : '#000'} />
            </Button>
          ),
        }}
      />
    </Stack>
  );
}