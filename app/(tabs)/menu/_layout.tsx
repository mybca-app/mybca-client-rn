import { useHeaderColor } from '@/hooks/use-header-color';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { Platform, View } from 'react-native';

export default function MenuScreenLayout() {
  const { background, foreground } = useHeaderColor();

  return (
    <Stack screenOptions={{
      headerStyle: {
        backgroundColor: background,
      },
      headerTransparent: Platform.OS === 'ios',
      headerTintColor: foreground,
    }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Menu',
          headerTitle: () => (
            <View style={{ margin: 'auto' }}>
              <Image
                source={require('../../../assets/images/logo.svg')}
                style={{ width: 50, height: 40, resizeMode: 'contain' }}
              />
            </View>
          ),
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
