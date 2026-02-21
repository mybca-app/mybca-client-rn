import { Text, View } from 'react-native';
import InfoItem from './info-item';
import LinkCard from '../links/link-card';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SectionSupport() {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row items-center">
        <Text className="text-base text-muted grow">
          <Ionicons name="help" size={14} />&nbsp;
          Information and Support
        </Text>
      </View>
      <View className="flex flex-col gap-2">
        <LinkCard name="Website" destination="https://mybca.link" icon="globe" />
        <LinkCard name="Support and Privacy" destination="https://mybca.link/docs" icon="help" />
        <LinkCard name="Instagram" destination="https://instagram.com/usemybca" icon="logo-instagram" />
        <LinkCard name="GitHub" destination="https://github.com/mybca-app" icon="logo-github" />
      </View>
    </View>
  );
}
