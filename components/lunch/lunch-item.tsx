import { components } from '@/network/openapi/v1';
import LunchFoodCard from './lunch-food-card';
import LunchHeader from './lunch-header';

export default function LunchItem({
  item,
  onFoodCardPress,
}: {
  item: components['schemas']['MenuItemDto'];
  onFoodCardPress: () => void;
}) {
  if (item.isStationHeader && item.text) {
    return <LunchHeader text={item.text} />;
  }

  return (
    <LunchFoodCard
      name={item.food.name ?? ''}
      description={item.food.description}
      imageUrl={item.food.imageUrl}
      onPress={onFoodCardPress}
    />
  );
}
