import MenuHeader from '@/components/menu/menu-header';
import SectionAccount from '@/components/menu/section-account';
import SectionFeatures from '@/components/menu/section-features';
import SectionInfo from '@/components/menu/section-info';
import SectionSupport from '@/components/menu/section-support';
import { ScrollView, View } from 'react-native';

export default function MenuScreen({}: {}) {
  return (
    <ScrollView
      className="bg-background"
      contentContainerStyle={{
        padding: 16,
      }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex flex-col gap-8 -mt-4">
        <MenuHeader />
        <SectionAccount />
        <SectionFeatures />
        <SectionSupport />
        <SectionInfo />
      </View>
    </ScrollView>
  );
}
