import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, Card, SkeletonGroup } from 'heroui-native';

export default function BusCardSkeleton({
  showStar
}: {
  showStar: boolean
}) {
  return (
    <SkeletonGroup>
      <Card className="flex-row gap-2 w-full overflow-hidden">
        {showStar && (
          <Card.Header className="items-center justify-center shrink-0">
            <Button variant="ghost" className="px-2" isDisabled>
              <Button.Label>
                <Ionicons name="star-outline" size={24} />
              </Button.Label>
            </Button>
          </Card.Header>
        )}

        <Card.Body className="flex-1 overflow-hidden justify-center">
          <Card.Title
            className="mb-1"
          >
            <SkeletonGroup.Item variant="shimmer" className="h-6 w-50 rounded" />
          </Card.Title>

          <Card.Description>
            <SkeletonGroup.Item variant="shimmer" className="h-4 w-30 rounded" />
          </Card.Description>
        </Card.Body>

        <Card.Footer className="items-center justify-center shrink-0">
          <SkeletonGroup.Item className="h-6 rounded-full w-12" />
        </Card.Footer>
      </Card>
    </SkeletonGroup>
  );
}