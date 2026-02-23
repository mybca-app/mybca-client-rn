import { components } from '@/network/openapi/v1';
import LunchBottomSheet from './lunch-bottom-sheet';
import LunchHeader from './lunch-header';

export default function LunchItem({
  item,
}: {
  item: components['schemas']['MenuItemDto'];
}) {
  if (item.isStationHeader && item.text) {
    return <LunchHeader text={item.text} />;
  }

  return <LunchBottomSheet item={item.food} />;
}
