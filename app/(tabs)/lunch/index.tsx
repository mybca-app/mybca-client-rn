import DatePicker from '@/components/lunch/date-picker';
import LunchItem from '@/components/lunch/lunch-item';
import NoLunchToday from '@/components/lunch/no-lunch-today';
import { $api } from '@/network/client';
import { components } from '@/network/openapi/v1';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useToast } from 'heroui-native';
import { useEffect, useState } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

// Milk/Condiments; Deli; Sides
const UNWANTED_SECTIONS = [3676, 3088, 3090];

function dateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function LunchScreen() {
  const headerHeight = useHeaderHeight();
  const { toast } = useToast();
  const [date, setDate] = useState(new Date());
  const [menu, setMenu] = useState<components["schemas"]["MenuDayDto"] | null>(null);
  const [dateStartBound, setDateStartBound] = useState<Date | null>();
  const [dateEndBound, setDateEndBound] = useState<Date | null>();

  const { data, error, isLoading } = $api.useQuery(
    'get',
    '/api/lunch/week',
    {}
  );
  const menuWeek = data?.data;

  useEffect(() => {
    if (error) {
      console.log(error);

      toast.show({
        variant: 'danger',
        label: 'Error fetching lunch',
        description: 'Please try again later.',
        duration: 'persistent',
        placement: 'bottom',
        actionLabel: 'Close',
        onActionPress: ({ hide }) => hide(),
      });
    }
  }, [error]);

  useEffect(() => {
    const days = data?.data?.days || [];
    if (data && days.length > 0 && date === null) {
      setDate(new Date());
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const days = data?.data?.days || [];
      if (days.length !== 0) {
        setDateStartBound(new Date(days[0].date ?? ""));
        setDateEndBound(new Date(days[days.length - 1].date ?? ""));
      }
    }
  }, [data]);

  useEffect(() => {
    const days = menuWeek?.days || [];
    const m = days.find(d => d.date === dateToYYYYMMDD(date)) ?? null;
    setMenu(m);
  }, [data, date]);

  return (
    <ScrollView
      className="bg-background"
      contentContainerStyle={{
        padding: 16,
        paddingTop: (Platform.OS === 'web' ? headerHeight : 0) + 16,
      }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex flex-col gap-2">
        <Text className="text-foreground mb-2">
          Lunch menus are subject to change and may be inaccurate.
        </Text>
        <DatePicker
          startDate={new Date(2026, 1, 9)}
          endDate={new Date(2026, 1, 13)}
          selectedDate={date}
          setSelectedDate={setDate}
        />
        {menu && (
          menu.menuItems.length === 0 ? <NoLunchToday /> : (
            menu?.menuItems
              .filter((item) => !UNWANTED_SECTIONS.includes(item.stationID))
              .map((item, index) => <LunchItem key={index} item={item} />))
        )}

      </View>
    </ScrollView>
  );
}
