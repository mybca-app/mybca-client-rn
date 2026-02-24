import EventCard from '@/components/events/event-card';
import EventCardSkeleton from '@/components/events/event-card-skeleton';
import { useErrorToast } from '@/hooks/use-error-toast';
import { pb } from '@/network/pocketbase/pb-client';
import { Event } from '@/network/pocketbase/pocketbase';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';

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
      <FlashList
        className="bg-background"
        contentContainerStyle={{ padding: 16 }}
        contentInsetAdjustmentBehavior="automatic"
        data={data ? data.items : new Array(10).fill('')}
        keyExtractor={(item, index) =>
          item?.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item, index }) =>
          item ? (
            <EventCard key={item.id} event={item as unknown as Event} />
          ) : (
            <EventCardSkeleton key={index} />
          )
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ItemSeparatorComponent={() => <View className="h-2" />}
      />
    </>
  );
}
