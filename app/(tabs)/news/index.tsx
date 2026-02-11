import NewsCard from '@/components/news/news-card';
import NewsCardSkeleton from '@/components/news/news-card-skeleton';
import { $api } from '@/network/client';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useToast } from 'heroui-native';
import { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

export default function NewsScreen() {
  const { toast } = useToast();

  const { data, error } = $api.useQuery(
    'get',
    '/api/news/stories',
    {}
  );
  const stories = data?.data || [];

  useEffect(() => {
    if (error) {
      console.log(error);

      toast.show({
        variant: 'danger',
        label: 'Error fetching news',
        description: 'Please try again later.',
        duration: 'persistent',
        placement: 'bottom',
        actionLabel: 'Close',
        onActionPress: ({ hide }) => hide(),
      })
    }
  }, [error]);

  return (
    <ScrollView
      className="bg-background"
      contentContainerStyle={{ padding: 16 }}
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
