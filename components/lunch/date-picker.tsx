import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from 'heroui-native';
import { useMemo } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

export default function DatePicker({
  startDate,
  endDate,
  selectedDate,
  setSelectedDate,
}: {
  startDate: Date;
  endDate: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}) {
  const normalize = (d: Date) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  const start = useMemo(() => normalize(startDate), [startDate]);
  const end = useMemo(() => normalize(endDate), [endDate]);
  const selected = useMemo(() => normalize(selectedDate), [selectedDate]);

  const canPrevious = selected > start;
  const canNext = selected < end;

  const previous = () => {
    if (!canPrevious) {
      return;
    }

    const newDate = new Date(selectedDate.valueOf());
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const next = () => {
    if (!canNext) {
      return;
    }

    const newDate = new Date(selectedDate.valueOf());
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  return (
    <View className="flex flex-row gap-2 items-center">
      <Button
        isDisabled={!canPrevious}
        onPress={previous}
        isIconOnly
        variant="outline"
      >
        <StyledIonicons
          name="chevron-back-outline"
          className="text-foreground"
          size={24}
        />
      </Button>
      <Button variant="tertiary" className="grow">
        <StyledIonicons name="calendar" className="text-foreground" size={18} />
        <Button.Label>{selectedDate.toLocaleDateString()}</Button.Label>
      </Button>
      <Button isDisabled={!canNext} onPress={next} isIconOnly variant="outline">
        <StyledIonicons
          name="chevron-forward-outline"
          className="text-foreground"
          size={24}
        />
      </Button>
    </View>
  );
}
