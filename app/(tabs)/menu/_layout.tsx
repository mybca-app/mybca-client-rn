import { useHeaderColor } from '@/hooks/use-header-color';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { Platform, View } from 'react-native';

export default function MenuScreenLayout() {
  const { background, foreground } = useHeaderColor();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View style={{ margin: 'auto' }}>
              <Image
                source={require('../../../assets/images/logo.svg')}
                style={{ width: 50, height: 40, resizeMode: 'contain' }}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: background,
          },
          headerTransparent: Platform.OS === 'ios',
          headerTintColor: foreground,
          headerShadowVisible: false,
          headerShown: true
        }}
      />
    </Stack>
  );
}