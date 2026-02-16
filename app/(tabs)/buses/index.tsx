import BusCard from '@/components/buses/bus-card';
import BusCardSkeleton from '@/components/buses/bus-card-skeleton';
import { requestNotifsPermission } from '@/helpers/notif-permissions';
import { subscribeToBus, unsubscribeFromBus } from '@/helpers/notif-subscribe';
import { useErrorToast } from '@/hooks/use-error-toast';
import { useFavoriteBuses } from '@/hooks/use-favorite-buses';
import { $api } from '@/network/client';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { Button, Input, Select, TextField } from 'heroui-native';
import { useEffect, useState } from 'react';
import { Platform, RefreshControl, ScrollView, Text, View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

type BusScreenFilter = {
  value: string;
  label: string;
}

const BUS_SCREEN_FILTERS: BusScreenFilter[] = [
  { value: 'all', label: 'All' },
  { value: 'starred', label: 'Starred' },
  { value: 'arrived', label: 'Arrived' },
  { value: 'missing', label: 'Missing' },
];

export default function BusesScreen() {
  const headerHeight = useHeaderHeight();
  const [activeFilter, setActiveFilter] = useState<BusScreenFilter>({ value: 'all', label: 'All' });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);
  const { favorites, toggleFavorite, isFavorite } = useFavoriteBuses();
  const { showErrorToast } = useErrorToast();

  const { data, error, isLoading, refetch } = $api.useQuery(
    'get',
    '/api/buses',
    {}
  );
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

  const results = sortedBusKeys.filter(key =>
    key.toLowerCase().includes(searchQuery.toLowerCase())
    && (activeFilter.value !== 'starred' || favorites.includes(key))
    && (activeFilter.value != 'arrived' || !!busMap[key])
    && (activeFilter.value != 'missing' || !busMap[key])
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

  return (
    <ScrollView
      className="bg-background"
      contentContainerStyle={{
        padding: 16,
        paddingTop: (Platform.OS === 'web' ? headerHeight : 0) + 16,
      }}
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View className="flex gap-2">
        <View className="flex-row gap-2 items-center">
          <TextField className="grow">
            <View className="flex-row items-center">
              <Input
                placeholder="Search..."
                className="flex-1 px-10"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <StyledIonicons
                name="search"
                size={16}
                className="absolute left-3.5 text-muted"
                pointerEvents="none"
              />
            </View>
          </TextField>
          <View>
            <Select
              value={activeFilter}
              onValueChange={(value) => {
                const selected = BUS_SCREEN_FILTERS.find(f => f.value === value?.value);
                setActiveFilter(selected!);
              }}
            >
              <Select.Trigger asChild>
                <Button variant="tertiary">
                  <Text className="text-foreground">{activeFilter.label}</Text>
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
                    {BUS_SCREEN_FILTERS.map(item => (
                      <Select.Item
                        key={item.value}
                        value={item.value}
                        label={item.label}
                      >
                        <Text className="text-base text-foreground flex-1">{item.label}</Text>
                      </Select.Item>
                    ))}
                  </ScrollView>
                </Select.Content>
              </Select.Portal>
            </Select>
          </View>
        </View>
      </View>

      <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        {busMap && sortedBusKeys.length > 0 ? results.map((key) => (
          <BusCard
            key={key}
            busName={key}
            busPosition={busMap[key]}
            isFavorite={isFavorite(key)}
            onToggleFavorite={onToggleFavorite}
          />
        )) : (
          new Array(40).fill('').map((_, index) => <BusCardSkeleton key={index} showStar />)
        )}
      </View>
    </ScrollView>
  );
}
