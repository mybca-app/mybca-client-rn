import ArrivalListItem from '@/components/buses/arrival-list-item';
import BusInfoCard from '@/components/buses/bus-info-card';
import { useHeaderColor } from '@/hooks/use-header-color';
import { $api } from '@/network/client';
import { FlashList } from '@shopify/flash-list';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Platform, Text, View } from 'react-native';

export default function BusDetailScreen() {
  const { background, foreground } = useHeaderColor();
  const { name: bus } = useLocalSearchParams<{ name: string }>();

  const { data: infoData, isLoading: infoIsLoading } = $api.useQuery(
    'get',
    '/api/buses/info',
    { params: { query: { bus: bus } } },
    { enabled: !!bus, refetchInterval: 60 * 1000 },
  );

  const { data: arrivalData } = $api.useQuery(
    'get',
    '/api/buses/history',
    { params: { query: { bus: bus } } },
    { enabled: !!bus, refetchInterval: 60 * 1000 },
  );

  const loadingItems = !arrivalData ? new Array(20).fill(null) : [];

  return (
    <>
      <Stack.Screen
        options={{
          title: bus ? `${bus}` : 'Bus',
          headerStyle: { backgroundColor: background },
          headerTintColor: foreground,
          headerTransparent: Platform.OS === 'ios',
        }}
      />

      <FlashList
        className="bg-background"
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        data={
          arrivalData && arrivalData.length > 0 ? arrivalData : loadingItems
        }
        keyExtractor={(item, index) =>
          arrivalData ? (item.arrivalTime ?? String(index)) : String(index)
        }
        ListHeaderComponent={() => (
          <View style={{ flexShrink: 0 }}>
            <View className="flex flex-col gap-2">
              <Text className="text-foreground text-2xl font-bold mt-2">
                Bus Info
              </Text>

              <BusInfoCard
                name="Company"
                value={infoData?.company?.name ?? ''}
                isLoading={infoIsLoading}
              />
            </View>

            <View className="flex flex-col">
              <Text className="text-foreground text-2xl font-bold mt-4">
                Arrival History
              </Text>
            </View>
          </View>
        )}
        renderItem={({ item }) => {
          if (!arrivalData) return <ArrivalListItem isLoading />;

          const arrivalText = item.arrivalTime ?? '';

          return (
            <ArrivalListItem
              busName={item.busName ?? ''}
              busPosition={item.busPosition ?? ''}
              arrivalTime={
                new Date(
                  arrivalText.endsWith('Z') ? arrivalText : arrivalText + 'Z',
                )
              }
              isLoading={false}
            />
          );
        }}
        contentInsetAdjustmentBehavior="automatic"
      />
    </>
  );
}
