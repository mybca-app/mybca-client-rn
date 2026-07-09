import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { PressableFeedback } from 'heroui-native';
import { ColorValue, Text, View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

export default function FeatureIcon({
  icon,
  color,
  text,
  href,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  color: ColorValue;
  text: string;
  href: string;
}) {
  return (
    <PressableFeedback onPress={() => router.navigate(href as any)}>
      <View className="flex flex-col gap-2 items-center">
        <View
          className="rounded p-2 size-14 flex items-center justify-center"
          style={{
            backgroundColor: color,
          }}
        >
          <StyledIonicons name={icon} size={32} className="text-white" />
        </View>
        <Text className="text-center text-foreground">{text}</Text>
      </View>
    </PressableFeedback>
  );
}
