import HomeHeader from '@/components/home/home-header';
import NotifPromptSheet from '@/components/home/notif-prompt-sheet';
import SectionBuses from '@/components/home/section-buses';
import SectionEvents from '@/components/home/section-events';
import SectionLinks from '@/components/home/section-links';
import SectionNews from '@/components/home/section-news';
import SectionSchedule from '@/components/home/section-schedule';
import { formatLocalDate } from '@/helpers/datetime';
import { requestNotifsPermission } from '@/helpers/notif-permissions';
import { $api } from '@/network/client';
import { pb } from '@/network/pocketbase/pb-client';
import { Event } from '@/network/pocketbase/pocketbase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from 'expo-router';
import { useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

const HAS_PROMPTED_BUS_NOTIFS_KEY = '@has_prompted_bus_notifs';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [isNotifPromptSheetOpen, setIsNotifPromptSheetOpen] = useState(false);

  const { data: scheduleData, refetch: scheduleRefetch } = $api.useQuery(
    'get',
    '/api/schedules/{date}',
    {
      params: { path: { date: formatLocalDate() } },
      refetchInterval: 60 * 1000,
    },
  );

  const { data: busData, refetch: busRefetch } = $api.useQuery(
    'get',
    '/api/buses',
    {
      refetchInterval: 60 * 1000,
    },
  );

  const { data: newsData, refetch: newsRefetch } = $api.useQuery(
    'get',
    '/api/news/stories/latest',
    {
      refetchInterval: 60 * 1000,
    },
  );

  const { data: linksData, refetch: linksRefetch } = $api.useQuery(
    'get',
    '/api/links',
    {
      refetchInterval: 60 * 1000,
    },
  );

  const { data: eventsData, refetch: eventsRefetch } = useQuery({
    queryKey: ['events-homepage-card'],
    queryFn: () =>
      pb.collection('events').getList(1, 2, {
        expand: 'organization',
        filter: 'eventTime >= @now',
        sort: 'eventTime',
      }),
    refetchInterval: 60 * 1000,
  });

  const handleRefresh = async () => {
    setRefreshing(true);

    await scheduleRefetch();
    await busRefetch();
    await newsRefetch();
    await linksRefetch();
    await eventsRefetch();

    setRefreshing(false);
  };

  useFocusEffect(() => {
    (async () => {
      const result = await AsyncStorage.getItem(HAS_PROMPTED_BUS_NOTIFS_KEY);
      if (result) {
        console.debug('not opening first-use notification prompt dialog');
      } else {
        setIsNotifPromptSheetOpen(true);
        await AsyncStorage.setItem(HAS_PROMPTED_BUS_NOTIFS_KEY, 'true');
        console.debug('opened first-use notification prompt dialog');
      }
    })();
  });

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
      }}
      contentInsetAdjustmentBehavior="automatic"
      className="bg-background"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <NotifPromptSheet
        isOpen={isNotifPromptSheetOpen}
        setIsOpen={setIsNotifPromptSheetOpen}
        onConfirm={async () => {
          const res = await requestNotifsPermission();
          console.log(res);
        }}
      />
      <View className="flex flex-col gap-8 -mt-4">
        <HomeHeader />
        {scheduleData?.schedule && (
          <SectionSchedule schedule={scheduleData.schedule} />
        )}
        <SectionBuses busMap={busData?.data ?? {}} />
        <SectionNews story={newsData?.data} />
        <SectionEvents events={eventsData?.items as unknown[] as Event[]} />
        <SectionLinks links={linksData?.data} />
      </View>
    </ScrollView>
  );
}
