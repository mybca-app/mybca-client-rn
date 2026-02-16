import NewsCard from '@/components/news/news-card';
import NewsCardSkeleton from '@/components/news/news-card-skeleton';
import { useErrorToast } from '@/hooks/use-error-toast';
import { $api } from '@/network/client';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useEffect } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import { withUniwind } from 'uniwind';

export default function NewsScreen() {
  const headerHeight = useHeaderHeight();
  const { showErrorToast } = useErrorToast();

  const { data, error } = $api.useQuery(
    'get',
    '/api/news/stories',
    {}
  );
  const stories = data?.data || [];

  useEffect(() => {
    if (error) {
      console.log(error);

      showErrorToast(
        'Error fetching news',
        'Please try again later.',
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
    >
      <View className="flex flex-col gap-2">
        <Text className="text-foreground">
          Stories are provided by our school newspaper, the Academy Chronicle.
        </Text>
        <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
          {stories && stories.length > 0 ? stories.map((story) => (
            <NewsCard
              key={story.id}
              title={story.title}
              date={new Date(story.createdAt)}
              storyLink={story.link}
              imageLink={story.imageLink}
            />
          )) : (
            new Array(10).fill('').map((_, index) => <NewsCardSkeleton key={index} />)
          )}
        </View>
      </View>
    </ScrollView>
  );
}
