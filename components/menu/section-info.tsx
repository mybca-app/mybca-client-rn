import { version } from '@/package.json';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';
import InfoItem from './info-item';

export default function SectionInfo() {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row items-center">
        <Text className="text-base text-muted grow">
          <Ionicons name="information-circle-outline" size={14} />
          &nbsp; About myBCA
        </Text>
      </View>
      <View className="flex flex-col">
        <InfoItem name="Developer" value="Thomas Torossian" />
        <InfoItem name="License" value="AGPL v3.0 or later" />
        <InfoItem name="Version" value={version} />
      </View>
    </View>
  );
}
