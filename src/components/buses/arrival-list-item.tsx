import { Separator, SkeletonGroup } from 'heroui-native';
import { Text, View } from 'react-native';

export default function ArrivalListItem({
  busPosition,
  arrivalTime,
  isLoading,
}: {
  busName?: string;
  busPosition?: string;
  arrivalTime?: Date;
  isLoading: boolean;
}) {
  return (
    <SkeletonGroup isLoading={isLoading}>
      <View>
        <View className="w-full py-2 flex">
          <SkeletonGroup.Item className="h-4 w-36 rounded">
            {busPosition && (
              <Text className="text-foreground text-base grow">
                Arrived in {busPosition}
              </Text>
            )}
          </SkeletonGroup.Item>
          <SkeletonGroup.Item className="h-4 w-54 mt-2 rounded">
            {arrivalTime && (
              <Text className="text-muted text-sm">
                Detected {arrivalTime.toLocaleString()}
              </Text>
            )}
          </SkeletonGroup.Item>
        </View>
        <Separator />
      </View>
    </SkeletonGroup>
  );
}
