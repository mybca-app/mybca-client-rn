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
    <SkeletonGroup isLoading={isLoading}>
      <Card className="w-full">
        <Card.Body className="gap-4">
          <View className="justify-center overflow-hidden">
            <Card.Description>{name}</Card.Description>

            <SkeletonGroup.Item className="w-36 h-6 rounded">
              <Card.Title ellipsizeMode="tail" className="flex-wrap">
                {value}
              </Card.Title>
            </SkeletonGroup.Item>
          </View>
        </Card.Body>
      </Card>
    </SkeletonGroup>
  );
}
