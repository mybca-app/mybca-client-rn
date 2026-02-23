import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Button, Card, Chip, PressableFeedback } from 'heroui-native';
import { memo } from 'react';

function BusCard({
  busName,
  busPosition,
  isFavorite,
  onToggleFavorite,
}: {
  busName: string;
  busPosition: string;
  isFavorite: boolean;
  onToggleFavorite?: (busName: string) => void;
}) {
  return (
    <PressableFeedback
      onPress={async () => {
        router.navigate(`/buses/${encodeURIComponent(busName)}`);
      }}
    >
      <Card className="flex-row gap-2 w-full overflow-hidden">
        {onToggleFavorite && (
          <Card.Header className="items-center justify-center shrink-0">
            <Button
              variant="ghost"
              className="px-2"
              onPress={() => onToggleFavorite(busName)}
            >
              <Button.Label className={isFavorite ? 'text-accent' : ''}>
                <Ionicons
                  name={isFavorite ? 'star' : 'star-outline'}
                  size={24}
                />
              </Button.Label>
            </Button>
          </Card.Header>
        )}

        <Card.Body className="flex-1 overflow-hidden justify-center">
          <Card.Title ellipsizeMode="tail" className="mb-1 flex-wrap">
            {busName}
          </Card.Title>

          <Card.Description numberOfLines={1} ellipsizeMode="tail">
            {busPosition ? 'Arrived at BCA' : 'Not at BCA'}
          </Card.Description>
        </Card.Body>

        <Card.Footer className="items-center justify-center shrink-0">
          {busPosition && (
            <Chip size="lg">
              <Chip.Label numberOfLines={1} ellipsizeMode="tail">
                {busPosition}
              </Chip.Label>
            </Chip>
          )}
        </Card.Footer>
      </Card>
    </PressableFeedback>
  );
}

export default memo(BusCard);
