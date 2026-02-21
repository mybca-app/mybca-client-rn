import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';

export default function SectionAccount() {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row items-center">
        <Text className="text-base text-muted grow">
          <Ionicons name="person" size={14} />&nbsp;
          Account
        </Text>
      </View>
      <View className="flex flex-col">
        <Text className="text-foreground text-base">
          Sign in will be available in a future version of myBCA.
        </Text>
      </View>
    </View>
  );
}
