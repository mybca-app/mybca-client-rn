import DatePicker from '@/components/lunch/date-picker';
import LunchItem from '@/components/lunch/lunch-item';
import NoLunchToday from '@/components/lunch/no-lunch-today';
import { useErrorToast } from '@/hooks/use-error-toast';
import { $api } from '@/network/client';
import { components } from '@/network/openapi/v1';
import { FlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

// Milk/Condiments; Deli; Sides
const UNWANTED_SECTIONS = [3676, 3088, 3090];

function dateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function LunchScreen() {
  const { showErrorToast } = useErrorToast();
  const [date, setDate] = useState(new Date());
  const [menu, setMenu] = useState<components['schemas']['MenuDayDto'] | null>(
    null,
  );
  const [dateStartBound, setDateStartBound] = useState<Date | null>();
  const [dateEndBound, setDateEndBound] = useState<Date | null>();

  const { data, error } = $api.useQuery('get', '/api/lunch/week', {
    refetchInterval: 60 * 1000,
  });
  const menuWeek = data?.data;

  useEffect(() => {
    if (error) {
      console.log(error);
      showErrorToast('Error fetching lunch', 'Please try again later.');
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
        setDateStartBound(new Date(days[0].date ?? ''));
        setDateEndBound(new Date(days[days.length - 1].date ?? ''));
      }
    }
  }, [data]);

  useEffect(() => {
    const days = menuWeek?.days || [];
    const m = days.find((d) => d.date === dateToYYYYMMDD(date)) ?? null;
    setMenu(m);
  }, [data, date]);

  const filteredItems =
    menu?.menuItems.filter(
      (item) => !UNWANTED_SECTIONS.includes(item.stationID),
    ) ?? [];

  return (
    <FlashList
      className="bg-background"
      contentContainerStyle={{ padding: 16 }}
      contentInsetAdjustmentBehavior="automatic"
      data={filteredItems}
      keyExtractor={(_, index) => index.toString()}
      ItemSeparatorComponent={() => <View className="h-2" />}
      ListHeaderComponent={
        <View className="flex flex-col gap-2">
          <Text className="text-foreground mb-2">
            Lunch menus are subject to change and may be inaccurate.
          </Text>
          {dateStartBound && dateEndBound && (
            <DatePicker
              startDate={dateStartBound}
              endDate={dateEndBound}
              selectedDate={date}
              setSelectedDate={setDate}
            />
          )}
          {!menu && <NoLunchToday />}
          {menu && menu.menuItems.length === 0 && <NoLunchToday />}
        </View>
      }
      renderItem={({ item }) => <LunchItem item={item} />}
    />
  );
}
