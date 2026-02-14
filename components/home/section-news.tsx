import { components } from "@/network/openapi/v1";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Button } from "heroui-native";
import { Text, View } from "react-native";
import { withUniwind } from "uniwind";
import NewsCardSkeleton from "../news/news-card-skeleton";
import NewsCard from "../news/news-card";

const StyledIonicons = withUniwind(Ionicons);

export default function SectionNews({
  story
}: {
  story?: components['schemas']['NewsStoryDto'] | null,
}) {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row items-center">
        <Text className="text-base text-muted grow">
          In the <Text className="italic">Academy Chronicle</Text>
        </Text>
        <Button variant="outline" size="sm" onPress={() => router.navigate('/news')}>
          <Button.Label className="text-foreground">
            All News
          </Button.Label>
          <StyledIonicons name="arrow-forward" className="text-foreground" size={18} />
        </Button>
      </View>
      
      {story ? (
        <NewsCard
          key={story.id}
          title={story.title}
          date={new Date(story.createdAt)}
          storyLink={story.link}
          imageLink={story.imageLink}
        />
      ) : <NewsCardSkeleton />}
    </View>
  );
}