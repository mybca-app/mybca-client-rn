import HomeHeader from '@/components/home/home-header';
import SectionBuses from '@/components/home/section-buses';
import SectionLinks from '@/components/home/section-links';
import SectionNews from '@/components/home/section-news';
import SectionSchedule from '@/components/home/section-schedule';
import { formatLocalDate } from '@/helpers/datetime';
import { $api } from '@/network/client';
import { useHeaderHeight } from '@react-navigation/elements';
import { useState } from 'react';
import { Platform, RefreshControl, ScrollView, View } from 'react-native';

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();
  const [refreshing, setRefreshing] = useState(false);

  const { data: scheduleData, error: scheduleError, refetch: scheduleRefetch } = $api.useQuery(
    'get',
    '/api/schedules/{date}',
    { params: { path: { date: formatLocalDate() } } }
  );

  const { data: busData, error: busError, refetch: busRefetch } = $api.useQuery(
    'get',
    '/api/buses',
    {}
  );

  const { data: newsData, error: newsError, refetch: newsRefetch } = $api.useQuery(
    'get',
    '/api/news/stories/latest',
    {}
  );

  const { data: linksData, error: linksError, refetch: linksRefetch } = $api.useQuery(
    'get',
    '/api/links',
    {}
  );

  const handleRefresh = async () => {
    setRefreshing(true);

    await scheduleRefetch();
    await busRefetch();
    await newsRefetch();
    await linksRefetch();

    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        paddingTop: (Platform.OS === 'web' ? headerHeight : 0),
      }}
      contentInsetAdjustmentBehavior="automatic"
      className="bg-background"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View className="flex flex-col gap-8">
        <HomeHeader />
        {scheduleData?.schedule && <SectionSchedule schedule={scheduleData.schedule} />}
        <SectionBuses busMap={busData?.data ?? {}} />
        <SectionNews story={newsData?.data} />
        <SectionLinks links={linksData?.data} />
      </View>
    </ScrollView>
  );
}
