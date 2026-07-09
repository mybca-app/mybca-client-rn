import Ionicons from '@expo/vector-icons/Ionicons';
import { Card, Skeleton } from 'heroui-native';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

export default function LinkCardSkeleton() {
  return (
    <Card className="w-full">
      <Card.Body className="flex-row gap-4">
        <View className="justify-center">
          <StyledIonicons name="link" size={24} className="text-accent" />
        </View>
        <View className="justify-center flex-1 overflow-hidden">
          <Card.Title ellipsizeMode="tail" className="flex-wrap">
            <Skeleton className="w-36 h-6 rounded" />
          </Card.Title>
        </View>
      </Card.Body>
    </Card>
  );
}
