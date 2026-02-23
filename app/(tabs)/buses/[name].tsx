import ArrivalListItem from '@/components/buses/arrival-list-item';
import BusInfoCard from '@/components/buses/bus-info-card';
import { useHeaderColor } from '@/hooks/use-header-color';
import { $api } from '@/network/client';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Platform, ScrollView, Text, View } from 'react-native';

export default function BusDetailScreen() {
  const headerHeight = useHeaderHeight();
  const { background, foreground } = useHeaderColor();
  const { name: bus } = useLocalSearchParams<{ name: string }>();

  const {
    data: infoData,
    error: infoError,
    isLoading: infoIsLoading,
  } = $api.useQuery(
    'get',
    '/api/buses/info',
    { params: { query: { bus: bus } } },
    { enabled: !!bus },
  );

  const {
    data: arrivalData,
    error: arrivalError,
    isLoading: arrivalIsLoading,
  } = $api.useQuery(
    'get',
    '/api/buses/history',
    { params: { query: { bus: bus } } },
    { enabled: !!bus },
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: bus ? `${bus}` : 'Bus',
          headerStyle: {
            backgroundColor: background,
          },
          headerTintColor: foreground,
          headerTransparent: Platform.OS === 'ios',
        }}
      />
      <ScrollView
        className="bg-background"
        contentContainerStyle={{
          padding: 16,
        }}
        contentInsetAdjustmentBehavior="automatic"
      >
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

          {!arrivalData &&
            new Array(20)
              .fill('')
              .map((_, index) => <ArrivalListItem key={index} isLoading />)}

          {arrivalData &&
            arrivalData.length > 0 &&
            arrivalData.map((item) => {
              const arrivalText = item.arrivalTime ?? '';

              return (
                <ArrivalListItem
                  key={item.arrivalTime}
                  busName={item.busName ?? ''}
                  busPosition={item.busPosition ?? ''}
                  arrivalTime={
                    new Date(
                      arrivalText.endsWith('Z')
                        ? arrivalText
                        : arrivalText + 'Z',
                    )
                  }
                  isLoading={false}
                />
              );
            })}
        </View>
      </ScrollView>
    </>
  );
}
