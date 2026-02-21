import { Text, View } from 'react-native';

export default function MenuHeader() {
  return (
    <View className="w-full px-3">
      <Text className="text-center text-foreground font-semibold text-2xl">
        Welcome to myBCA
      </Text>
    </View>
  )
}