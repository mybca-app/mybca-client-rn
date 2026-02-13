import { Separator } from "heroui-native";
import { Text, View } from "react-native";

export default function ArrivalListItem({
  busName: town,
  busPosition: position,
  arrivalTime
}: {
  busName: string,
  busPosition: string,
  arrivalTime: Date,
}) {
   return (
    <View>
      <View className="w-full py-2 flex">
        <Text className="text-foreground text-base grow">
          Arrived in {position}
        </Text>
        <Text className="text-muted text-sm">
          Detected {arrivalTime.toLocaleString()}
        </Text>
      </View>
      <Separator />
    </View>
  )
}