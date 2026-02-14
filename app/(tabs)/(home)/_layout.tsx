import { Image } from 'expo-image';
import { Stack } from 'expo-router';

export default function HomeScreenLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <Image
              source={require('../../../assets/images/logo.svg')}
              style={{ width: 50, height: 40, resizeMode: 'contain' }}
            />
          ),
          headerTransparent: true,
          headerShown: true
        }}
      />
    </Stack>
  );
}