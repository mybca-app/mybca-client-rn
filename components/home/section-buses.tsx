import { useFavoriteBuses } from '@/hooks/use-favorite-buses';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useFocusEffect } from 'expo-router';
import { Button } from 'heroui-native';
import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { withUniwind } from 'uniwind';
import BusCard from '../buses/bus-card';
import BusCardSkeleton from '../buses/bus-card-skeleton';

const StyledIonicons = withUniwind(Ionicons);

export default function SectionBuses({ busMap }: {
  busMap: Record<string, string>
}) {
  const { favorites, isFavorite, refetch } = useFavoriteBuses();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row items-center">
        <Text className="text-base text-muted grow">
          Starred Buses
        </Text>
        <Button variant="outline" size="sm" onPress={() => router.navigate('/buses')}>
          <Button.Label className="text-foreground">
            All Buses
          </Button.Label>
          <StyledIonicons name="arrow-forward" className="text-foreground" size={18} />
        </Button>
      </View>

      {favorites.length === 0 ? (
        <Text className="text-muted text-base">
          You haven't starred any buses yet. Star your favorite buses on the
          Buses page to get quick access to them when you open the myBCA app.
        </Text>
      ) : (
        Object.keys(busMap).length === 0 ? (
          new Array(favorites.length).fill('').map((_, index) => <BusCardSkeleton key={index} showStar={false} />)
        ) : (
          Object.keys(busMap)
            .filter(k => isFavorite(k))
            .sort((a, b) => a.localeCompare(b))
            .map((town) => (
              <BusCard
                key={town}
                busName={town}
                busPosition={busMap[town] ?? null}
                isFavorite
              />
            )))
      )}
    </View>
  )
}