import EventCard from '@/components/events/event-card';
import EventCardSkeleton from '@/components/events/event-card-skeleton';
import { useErrorToast } from '@/hooks/use-error-toast';
import { pb } from '@/network/pocketbase/pb-client';
import { Event } from '@/network/pocketbase/pocketbase';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

export default function EventsScreen() {
  const { showErrorToast } = useErrorToast();
  const [refreshing, setRefreshing] = useState(false);

  const { data, refetch, error } = useQuery({
    queryKey: ['events-eventspage'],
    queryFn: () =>
      pb.collection('events').getList(1, 50, {
        expand: 'organization',
        filter: 'eventTime >= @now',
        sort: 'eventTime',
      }),
    refetchInterval: 60 * 1000,
  });

  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (error) {
      console.log(error);

      showErrorToast('Error fetching events', 'Please try again later.');
    }
  }, [error]);

  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      <ScrollView
        className="bg-background"
        contentContainerStyle={{
          padding: 16,
        }}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View className="flex flex-col gap-2">
          <View className="flex flex-col gap-2">
            {data
              ? data.items.map((event) => (
                  <EventCard key={event.id} event={event as unknown as Event} />
                ))
              : new Array(10)
                  .fill('')
                  .map((_, index) => <EventCardSkeleton key={index} />)}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
