import { formatTimeByLocale } from '@/helpers/datetime';
import { components } from '@/network/openapi/v1';
import { Separator } from 'heroui-native';
import { Text, View } from 'react-native';

export default function SectionSchedule({
  schedule
}: {
  schedule: components['schemas']['ScheduleDto'],
}) {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row items-center">
        <Text className="text-base text-muted grow">
          {schedule?.name} Schedule
        </Text>
      </View>
      {schedule?.items.map(item => (
        <View>
          <View className="w-full py-2 flex flex-row gap-2">
            <Text className="text-foreground text-base grow">
              {item.periodName}
            </Text>
            <Text className="text-foreground text-base text-end">
              {formatTimeByLocale(item.startTime)}–{formatTimeByLocale(item.endTime)}
            </Text>
          </View>
          <Separator />
        </View>
      ))}
    </View>
  )
}