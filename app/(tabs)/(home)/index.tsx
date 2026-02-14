import SectionBuses from '@/components/home/section-buses';
import SectionNews from '@/components/home/section-news';
import { $api } from '@/network/client';
import { useHeaderHeight } from '@react-navigation/elements';
import { useState } from 'react';
import { Platform, RefreshControl, ScrollView, View } from 'react-native';

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();
  const [refreshing, setRefreshing] = useState(false);

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

  const handleRefresh = async () => {
    setRefreshing(true);

    await busRefetch();
    await newsRefetch();

    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        paddingTop: (Platform.OS === 'web' ? headerHeight : 0) + 16,
      }}
      contentInsetAdjustmentBehavior="automatic"
      className="bg-background"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View className="flex flex-col gap-8">
        <SectionBuses busMap={busData?.data ?? {}} />
        <SectionNews story={newsData?.data} />
      </View>
    </ScrollView>
  );
}
