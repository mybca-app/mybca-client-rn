import { Card, SkeletonGroup } from 'heroui-native';
import { View } from 'react-native';

export default function NewsCardSkeleton() {
  return (
    <SkeletonGroup>
      <Card>
        <Card.Body className="flex-row gap-4">
          <View className="justify-center">
            <SkeletonGroup.Item className="size-20 rounded-lg" />
          </View>
          <View className="justify-center flex-1 overflow-hidden">
            <Card.Title ellipsizeMode="tail" className="mb-1 flex-wrap">
              <SkeletonGroup.Item
                variant="shimmer"
                className="h-6 w-50 rounded"
              />
            </Card.Title>

            <Card.Description>
              <SkeletonGroup.Item
                variant="shimmer"
                className="h-5 w-25 rounded"
              />
            </Card.Description>
          </View>
        </Card.Body>
      </Card>
    </SkeletonGroup>
  );
}
