import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const FAVORITES_KEY = 'mybca_favorite_bus';

export function useFavoriteBuses() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const json = await AsyncStorage.getItem(FAVORITES_KEY);
      setFavorites(json ? JSON.parse(json) : []);
    } catch (e) {
      console.error('Failed to load favorites', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const toggleFavorite = useCallback(async (busId: string) => {
    setFavorites((current) => {
      const updated = current.includes(busId)
        ? current.filter(id => id !== busId)
        : [...current, busId];

      AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated)).catch(e =>
        console.error('Failed to save favorites', e)
      );

      return updated;
    });
  }, []);

  const isFavorite = useCallback(
    (busId: string) => favorites.includes(busId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, loading, refetch: loadFavorites };
}
