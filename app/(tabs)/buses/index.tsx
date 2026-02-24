import BusCard from '@/components/buses/bus-card';
import BusCardSkeleton from '@/components/buses/bus-card-skeleton';
import BusesBottomSheet from '@/components/buses/buses-bottom-sheet';
import { requestNotifsPermission } from '@/helpers/notif-permissions';
import { subscribeToBus, unsubscribeFromBus } from '@/helpers/notif-subscribe';
import { useErrorToast } from '@/hooks/use-error-toast';
import { useFavoriteBuses } from '@/hooks/use-favorite-buses';
import { $api } from '@/network/client';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlashList } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';
import { Stack } from 'expo-router';
import { Button, SearchField, Select } from 'heroui-native';
import { useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from 'react-native';

type BusScreenFilter = { value: string; label: string };

const BUS_SCREEN_FILTERS: BusScreenFilter[] = [
  { value: 'all', label: 'All' },
  { value: 'starred', label: 'Starred' },
  { value: 'arrived', label: 'Arrived' },
  { value: 'missing', label: 'Missing' },
];

export default function BusesScreen() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<BusScreenFilter>({
    value: 'all',
    label: 'All',
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const { favorites, toggleFavorite, isFavorite } = useFavoriteBuses();
  const { showErrorToast } = useErrorToast();

  const { data, error, refetch } = $api.useQuery('get', '/api/buses', {
    refetchInterval: 60 * 1000,
  });

  const busMap = data?.data || {};

  const sortedBusKeys = Object.keys(busMap).sort((a, b) => {
    const aFav = favorites.includes(a);
    const bFav = favorites.includes(b);
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return a.localeCompare(b);
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const results = sortedBusKeys.filter(
    (key) =>
      key.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (activeFilter.value !== 'starred' || favorites.includes(key)) &&
      (activeFilter.value != 'arrived' || !!busMap[key]) &&
      (activeFilter.value != 'missing' || !busMap[key]),
  );

  const onToggleFavorite = async (bus: string) => {
    await Haptics.impactAsync();
    const wasFavorite = isFavorite(bus);
    await toggleFavorite(bus);

    if (await requestNotifsPermission()) {
      if (wasFavorite) {
        await unsubscribeFromBus(bus);
      } else {
        await subscribeToBus(bus);
      }
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      showErrorToast(
        'Error fetching bus info',
        'Click the button on the top right to access the bus spreadsheet, or try again later.',
      );
    }
  }, [error]);

  const listData =
    busMap && sortedBusKeys.length > 0 ? results : new Array(40).fill(null);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              size="sm"
              isIconOnly
              variant="ghost"
              onPress={() => setIsBottomSheetOpen(true)}
            >
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={useColorScheme() === 'dark' ? '#fff' : '#000'}
              />
            </Button>
          ),
        }}
      />

      <FlashList
        className="bg-background"
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        data={listData}
        keyExtractor={(item, index) =>
          item ? item.toString() : index.toString()
        }
        ListHeaderComponent={
          <>
            <View style={{ padding: 16 }} className="flex gap-2">
              <View className="flex-row gap-2 items-center">
                <SearchField
                  value={searchQuery}
                  onChange={setSearchQuery}
                  className="grow"
                >
                  <SearchField.Group>
                    <SearchField.SearchIcon />
                    <SearchField.Input />
                    <SearchField.ClearButton />
                  </SearchField.Group>
                </SearchField>

                <View>
                  <Select
                    value={activeFilter}
                    onValueChange={(value) => {
                      const selected = BUS_SCREEN_FILTERS.find(
                        (f) => f.value === value?.value,
                      );
                      setActiveFilter(selected!);
                    }}
                  >
                    <Select.Trigger asChild>
                      <Button variant="tertiary">
                        <Text className="text-foreground">
                          {activeFilter.label}
                        </Text>
                      </Button>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Overlay />
                      <Select.Content
                        presentation="popover"
                        width={140}
                        placement="bottom"
                      >
                        <ScrollView>
                          {BUS_SCREEN_FILTERS.map((item) => (
                            <Select.Item
                              key={item.value}
                              value={item.value}
                              label={item.label}
                            >
                              <Text className="text-base text-foreground flex-1">
                                {item.label}
                              </Text>
                            </Select.Item>
                          ))}
                        </ScrollView>
                      </Select.Content>
                    </Select.Portal>
                  </Select>
                </View>
              </View>
            </View>

            {data && (
              <BusesBottomSheet
                isOpen={isBottomSheetOpen}
                setIsOpen={setIsBottomSheetOpen}
                spreadsheetUrl="https://docs.google.com/spreadsheets/u/1/d/1S5v7kTbSiqV8GottWVi5tzpqLdTrEgWEY4ND4zvyV3o/htmlview#gid=0"
                expiryTime={new Date(data.expiry ?? '')}
              />
            )}
          </>
        }
        renderItem={({ item }) => {
          if (!item) {
            return (
              <View className="px-4 py-1">
                <BusCardSkeleton showStar />
              </View>
            );
          }

          const key = item as string;

          return (
            <View className="px-4 py-1">
              <BusCard
                busName={key}
                busPosition={busMap[key]}
                isFavorite={isFavorite(key)}
                onToggleFavorite={onToggleFavorite}
              />
            </View>
          );
        }}
      />
    </>
  );
}
