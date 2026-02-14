import { components } from "@/network/openapi/v1";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Button } from "heroui-native";
import { Text, View } from "react-native";
import { withUniwind } from "uniwind";
import NewsCardSkeleton from "../news/news-card-skeleton";
import NewsCard from "../news/news-card";
import LinkCard from "../links/link-card";
import LinkCardSkeleton from "../links/link-card-skeleton";

const StyledIonicons = withUniwind(Ionicons);

export default function SectionLinks({
  links
}: {
  links?: components['schemas']['LinkDto'][] | null,
}) {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row items-center">
        <Text className="text-base text-muted grow">
          Quick Links
        </Text>
      </View>
      {links ? links.map(link => (
        <LinkCard key={link.name} name={link.name} destination={link.target} />
      )) : new Array(4).fill('').map((_, index) => <LinkCardSkeleton key={index} />)}
    </View>
  );
}