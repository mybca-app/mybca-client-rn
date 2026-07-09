import { getShortMonth, getShortTime } from '@/helpers/datetime';
import { Event } from '@/network/pocketbase/pocketbase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card, Chip } from 'heroui-native';
import { memo } from 'react';
import { Text, View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

function EventCard({ event }: { event: Event }) {
  const date = new Date(event.eventTime);

  return (
    <Card className="w-full">
      <Card.Body className="flex-row gap-4">
        <View className="flex flex-col items-center justify-center">
          <Text className="text-sm text-foreground text-center">
            {getShortMonth(date)}
          </Text>
          <Text className="text-xl text-foreground text-center font-bold">
            {date.getDate()}
          </Text>
          <Text className="text-xs text-foreground text-center">
            {getShortTime(date)}
          </Text>
        </View>
        <View className="justify-center flex-1 overflow-hidden">
          <Card.Title ellipsizeMode="tail" className="mb-1 flex-wrap">
            {event.title}
          </Card.Title>

          <Card.Description>
            {event.description ?? 'No description provided.'}
          </Card.Description>

          <View className="flex flex-row flex-wrap gap-2 mt-3">
            {event.location && (
              <Chip variant="primary">
                <StyledIonicons
                  name="location"
                  size={12}
                  className="text-accent-foreground"
                />
                <Chip.Label>{event.location}</Chip.Label>
              </Chip>
            )}

            {event.organization && (
              <Chip variant="tertiary" className="bg-overlay">
                <StyledIonicons
                  name="people"
                  size={12}
                  className="text-foreground"
                />
                <Chip.Label>{event.expand['organization'].name}</Chip.Label>
              </Chip>
            )}
          </View>
        </View>
      </Card.Body>
    </Card>
  );
}

export default memo(EventCard);
