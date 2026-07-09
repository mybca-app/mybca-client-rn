import { formatTimeByLocale } from '@/helpers/datetime';
import { components } from '@/network/openapi/v1';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Separator } from 'heroui-native';
import { Text, View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

export default function SectionSchedule({
  schedule,
}: {
  schedule: components['schemas']['ScheduleDto'];
}) {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row items-center">
        <Text className="text-base text-muted grow">
          <StyledIonicons name="time" size={14} />
          &nbsp; {schedule?.name} Schedule
        </Text>
      </View>
      {schedule?.items.map((item) => (
        <View key={item.periodName + item.startTime}>
          <View className="w-full pb-2 flex flex-row gap-2">
            <Text className="text-foreground text-base flex-1">
              {item.periodName}
            </Text>
            <Text className="text-foreground text-base text-end">
              {formatTimeByLocale(item.startTime)}–
              {formatTimeByLocale(item.endTime)}
            </Text>
          </View>
          <Separator />
        </View>
      ))}
    </View>
  );
}
