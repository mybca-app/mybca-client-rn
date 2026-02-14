import { getTimeGreeting } from '@/helpers/datetime';
import { Text, View } from 'react-native';

export default function HomeHeader({ time = new Date() }: {
  time?: Date
}) {
  return (
    <View className="w-full px-3">
      <Text className="text-center text-foreground font-semibold text-2xl">
        {getTimeGreeting(time)}
      </Text>
    </View>
  )
}