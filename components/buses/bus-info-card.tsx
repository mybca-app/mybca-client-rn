import { Card, SkeletonGroup } from 'heroui-native';
import { View } from 'react-native';

export default function BusInfoCard({
  name,
  value,
  isLoading = false,
}: {
  name: string;
  value: string;
  isLoading?: boolean;
}) {
  return (
    <SkeletonGroup>
      <Card className="w-full">
        <Card.Body className="gap-4">
          <View className="justify-center flex-1 overflow-hidden">
            <Card.Description>{name}</Card.Description>

            <Card.Title ellipsizeMode="tail" className="flex-wrap">
              {isLoading ? (
                <SkeletonGroup.Item className="w-36 h-6 rounded" />
              ) : (
                value
              )}
            </Card.Title>
          </View>
        </Card.Body>
      </Card>
    </SkeletonGroup>
  );
}
