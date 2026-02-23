import { useHeaderColor } from '@/hooks/use-header-color';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function NewsLayout() {
  const { background, foreground } = useHeaderColor();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'News',
          headerTransparent: Platform.OS === 'ios',
          headerStyle: {
            backgroundColor: background,
          },
          headerTintColor: foreground,
        }}
      />
    </Stack>
  );
}
