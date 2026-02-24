import NewsCard from '@/components/news/news-card';
import NewsCardSkeleton from '@/components/news/news-card-skeleton';
import { useErrorToast } from '@/hooks/use-error-toast';
import { $api } from '@/network/client';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';

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
      <ScrollView
        className="bg-background"
        contentContainerStyle={{
          padding: 16,
        }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className="flex flex-col gap-2">
          <Text className="text-foreground">
            Stories are provided by our school newspaper, the Academy Chronicle.
          </Text>
          <View className="flex flex-col gap-2 mt-4">
            {stories && stories.length > 0
              ? stories.map((story) => (
                  <NewsCard
                    key={story.id}
                    title={story.title}
                    date={new Date(story.createdAt)}
                    storyLink={story.link}
                    imageLink={story.imageLink}
                  />
                ))
              : new Array(10)
                  .fill('')
                  .map((_, index) => <NewsCardSkeleton key={index} />)}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
