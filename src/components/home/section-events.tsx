import { Event } from '@/network/pocketbase/pocketbase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Button } from 'heroui-native';
import { Text, View } from 'react-native';
import { withUniwind } from 'uniwind';
import EventCard from '../events/event-card';
import EventCardSkeleton from '../events/event-card-skeleton';

const StyledIonicons = withUniwind(Ionicons);

export default function SectionEvents({ events }: { events: Event[] | null }) {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row items-center">
        <Text className="text-base text-muted grow">
          <StyledIonicons name="calendar" size={14} />
          &nbsp; Upcoming Events
        </Text>
        <Button
          variant="outline"
          size="sm"
          onPress={() => router.navigate('/(tabs)/menu/(events)')}
        >
          <Button.Label className="text-foreground">All Events</Button.Label>
          <StyledIonicons
            name="arrow-forward"
            className="text-foreground"
            size={18}
          />
        </Button>
      </View>

      {events ? (
        events.length === 0 ? (
          <Text className="text-muted">There are no upcoming events.</Text>
        ) : (
          events.map((e) => <EventCard key={e.id} event={e} />)
        )
      ) : (
        new Array(2)
          .fill('')
          .map((_, index) => <EventCardSkeleton key={index} />)
      )}
    </View>
  );
}
