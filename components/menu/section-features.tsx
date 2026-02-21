import { Text, View } from 'react-native';
import FeatureIcon from './feature-icon';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SectionFeatures() {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row items-center">
        <Text className="text-base text-muted grow">
          <Ionicons name="star" size={14} />&nbsp;
          Features
        </Text>
      </View>
      <View className="flex flex-row mt-3 gap-5">
        <FeatureIcon
          icon="bus"
          color="rgb(227, 187, 54)"
          text="Buses"
          href="/buses"
        />
        <FeatureIcon
          icon="fast-food"
          color="rgb(255, 87, 106)"
          text="Lunch"
          href="/lunch"
        />
        <FeatureIcon
          icon="newspaper"
          color="rgb(54, 94, 227)"
          text="News"
          href="/news"
        />
      </View>
    </View>
  );
}
