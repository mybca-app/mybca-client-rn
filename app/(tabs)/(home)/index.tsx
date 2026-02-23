import HomeHeader from '@/components/home/home-header';
import NotifPromptSheet from '@/components/home/notif-prompt-sheet';
import SectionBuses from '@/components/home/section-buses';
import SectionLinks from '@/components/home/section-links';
import SectionNews from '@/components/home/section-news';
import SectionSchedule from '@/components/home/section-schedule';
import { formatLocalDate } from '@/helpers/datetime';
import { requestNotifsPermission } from '@/helpers/notif-permissions';
import { $api } from '@/network/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHeaderHeight } from '@react-navigation/elements';
import { useFocusEffect } from 'expo-router';
import { useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

const HAS_PROMPTED_BUS_NOTIFS_KEY = '@has_prompted_bus_notifs';

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();
  const [refreshing, setRefreshing] = useState(false);
  const [isNotifPromptSheetOpen, setIsNotifPromptSheetOpen] = useState(false);

  const {
    data: scheduleData,
    error: scheduleError,
    refetch: scheduleRefetch,
  } = $api.useQuery('get', '/api/schedules/{date}', {
    params: { path: { date: formatLocalDate() } },
  });

  const {
    data: busData,
    error: busError,
    refetch: busRefetch,
  } = $api.useQuery('get', '/api/buses', {});

  const {
    data: newsData,
    error: newsError,
    refetch: newsRefetch,
  } = $api.useQuery('get', '/api/news/stories/latest', {});

  const {
    data: linksData,
    error: linksError,
    refetch: linksRefetch,
  } = $api.useQuery('get', '/api/links', {});

  const handleRefresh = async () => {
    setRefreshing(true);

    await scheduleRefetch();
    await busRefetch();
    await newsRefetch();
    await linksRefetch();

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
        <SectionLinks links={linksData?.data} />
      </View>
    </ScrollView>
  );
}
