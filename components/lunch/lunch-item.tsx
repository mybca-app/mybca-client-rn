import { components } from "@/network/openapi/v1";
import LunchHeader from "./lunch-header";
import LunchFoodCard from "./lunch-food-card";
import LunchBottomSheet from "./lunch-bottom-sheet";

export default function LunchItem({
  item
}: {
  item: components['schemas']['MenuItemDto']
}) {
  if (item.isStationHeader && item.text) {
    return <LunchHeader text={item.text} />
  }

  return (
    <LunchBottomSheet
      item={item.food}
    />
  )
}