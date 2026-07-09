import { getTimeGreeting } from '@/helpers/datetime';
import { cn } from 'heroui-native';
import { Platform, Text, View } from 'react-native';

export default function HomeHeader({ time = new Date() }: { time?: Date }) {
  return (
    <View className="w-full ">
      <Text
        className={cn(
          'text-foreground font-semibold text-2xl',
          Platform.OS !== 'web' ? 'text-center mx-3' : '',
        )}
      >
        {getTimeGreeting(time)}
      </Text>
    </View>
  );
}
