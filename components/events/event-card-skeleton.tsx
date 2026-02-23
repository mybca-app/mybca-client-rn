import { Card, SkeletonGroup } from 'heroui-native';
import { View } from 'react-native';

export default function EventCardSkeleton() {
  return (
    <SkeletonGroup>
      <Card className="w-full">
        <Card.Body className="flex-row gap-4">
          <View className="flex flex-col items-center justify-center">
            <SkeletonGroup.Item className="h-4 w-6 rounded" />
            <SkeletonGroup.Item className="h-6 w-5 my-2 rounded" />
            <SkeletonGroup.Item className="h-4 w-12 rounded" />
          </View>
          <View className="justify-center flex-1 overflow-hidden">
            <Card.Title ellipsizeMode="tail" className="mb-2 flex-wrap">
              <SkeletonGroup.Item className="h-6 w-48 rounded" />
            </Card.Title>

            <View className="flex flex-col gap-2">
              <SkeletonGroup.Item className="h-5 w-full rounded" />
              <SkeletonGroup.Item className="h-5 w-56 rounded" />
            </View>
          </View>
        </Card.Body>
      </Card>
    </SkeletonGroup>
  );
}
