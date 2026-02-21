import { components } from '@/network/openapi/v1';
import { Text, View } from 'react-native';
import LinkCard from '../links/link-card';
import LinkCardSkeleton from '../links/link-card-skeleton';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SectionLinks({
  links,
}: {
  links?: components['schemas']['LinkDto'][] | null;
}) {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row items-center">
        <Text className="text-base text-muted grow">
          <Ionicons name="link" size={14} />&nbsp;
          Quick Links
        </Text>
      </View>
      {links
        ? links.map((link) => (
            <LinkCard
              key={link.name}
              name={link.name}
              destination={link.target}
            />
          ))
        : new Array(4)
            .fill('')
            .map((_, index) => <LinkCardSkeleton key={index} />)}
    </View>
  );
}
