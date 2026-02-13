import { Separator } from "heroui-native";
import { Text, View } from "react-native";

export default function NutritionItem({
  name,
  value,
  unit,
}: {
  name: string,
  value: number | null,
  unit?: string,
}) {
  if (value === null || value === undefined)
    return <></>;

  return (
    <View>
      <View className="w-full py-2 flex flex-row gap-2">
        <Text className="text-foreground text-base grow">
          {name}
        </Text>
        <Text className="text-foreground text-base text-end">
          {value?.toString() + (unit ? ' ' + unit : '')}
        </Text>
      </View>
      <Separator />
    </View>
  )
}