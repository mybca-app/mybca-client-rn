import NewsCard from '@/components/news/news-card';
import NewsCardSkeleton from '@/components/news/news-card-skeleton';
import { useErrorToast } from '@/hooks/use-error-toast';
import { $api } from '@/network/client';
import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function NewsScreen() {
  const { showErrorToast } = useErrorToast();

  const { data, error } = $api.useQuery('get', '/api/news/stories', {
    refetchInterval: 60 * 1000,
  });
  const stories = data?.data || [];

  useEffect(() => {
    if (error) {
      console.log(error);

      showErrorToast('Error fetching news', 'Please try again later.');
    }
  }, [error]);

  return (
    <>
      <Stack.Screen options={{ title: 'News' }} />
      <FlashList
        className="bg-background"
        contentContainerStyle={{ padding: 16 }}
        contentInsetAdjustmentBehavior="automatic"
        data={stories.length > 0 ? stories : new Array(10).fill('')}
        keyExtractor={(item, index) =>
          item?.id ? item.id.toString() : index.toString()
        }
        ItemSeparatorComponent={() => <View className="h-2" />}
        ListHeaderComponent={
          <Text className="text-foreground mb-4">
            Stories are provided by our school newspaper, the Academy Chronicle.
          </Text>
        }
        renderItem={({ item, index }) =>
          item ? (
            <NewsCard
              key={item.id}
              title={item.title}
              date={new Date(item.createdAt)}
              storyLink={item.link}
              imageLink={item.imageLink}
            />
          ) : (
            <NewsCardSkeleton key={index} />
          )
        }
      />
    </>
  );
}
