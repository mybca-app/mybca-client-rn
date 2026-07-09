import { Separator } from 'heroui-native';
import { Text, View } from 'react-native';

export default function InfoItem({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  return (
    <View>
      <View className="w-full py-2 flex flex-row gap-2">
        <Text className="text-foreground text-base grow">{name}</Text>
        <Text className="text-foreground text-base text-end">{value}</Text>
      </View>
      <Separator />
    </View>
  );
}
