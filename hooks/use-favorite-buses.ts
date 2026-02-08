// Thank you, ChatGPT!

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const FAVORITES_KEY = '@favorite_buses';

export function useFavoriteBuses() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(FAVORITES_KEY);
        if (json) setFavorites(JSON.parse(json));
      } catch (e) {
        console.error('Failed to load favorites', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleFavorite = useCallback(async (busId: string) => {
    try {
      setFavorites((current) => {
        let updated: string[];
        if (current.includes(busId)) {
          updated = current.filter(id => id !== busId);
        } else {
          updated = [...current, busId];
        }

        AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated)).catch(e =>
          console.error('Failed to save favorites', e)
        );

        return updated;
      });
    } catch (e) {
      console.error('Error toggling favorite', e);
    }
  }, []);

  const isFavorite = useCallback(
    (busId: string) => favorites.includes(busId),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, loading };
}
