import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

export default function NoLunchToday() {
  return (
    <View className="grow flex items-center justify-center mt-48">
      <View className="flex flex-col gap-2  text-center items-center justify-center">
        <StyledIonicons name="fast-food" className="text-muted" size={50} />
        <Text className="text-2xl font-bold text-muted">No lunch today</Text>
      </View>
    </View>
  );
}
