import { components } from '@/network/openapi/v1';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Image } from 'expo-image';
import { BottomSheet } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import LunchFoodCard from './lunch-food-card';
import NutritionItem from './nutrition-item';

const StyledImage = withUniwind(Image);

export default function LunchBottomSheet({
  item,
}: {
  item: components['schemas']['FoodItemDto'];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Trigger asChild>
        <LunchFoodCard
          name={item.name ?? ''}
          description={item.description}
          imageUrl={item.imageUrl}
        />
      </BottomSheet.Trigger>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content
          snapPoints={['40%', '80%']}
          enableOverDrag={false}
          enableDynamicSizing={false}
          contentContainerClassName="h-full"
        >
          <BottomSheetScrollView
            contentContainerClassName=""
            showsVerticalScrollIndicator={false}
          >
            <View>
              {item.imageUrl && (
                <StyledImage
                  source={{ uri: item.imageUrl }}
                  className="w-full aspect-video rounded mb-4"
                  cachePolicy="memory"
                />
              )}
              <BottomSheet.Title>{item.name}</BottomSheet.Title>
              {item.description && (
                <BottomSheet.Description>
                  {item.description}
                </BottomSheet.Description>
              )}
              {item.nutritionInfo && (
                <>
                  <BottomSheet.Title className="mt-5">
                    Nutrition Facts
                  </BottomSheet.Title>
                  <View>
                    <NutritionItem
                      name="Calories"
                      value={item.nutritionInfo.calories}
                    />
                    <NutritionItem
                      name="Saturated Fat"
                      value={item.nutritionInfo.saturatedFat}
                      unit="g"
                    />
                    <NutritionItem
                      name="Trans Fat"
                      value={item.nutritionInfo.transFat}
                      unit="g"
                    />
                    <NutritionItem
                      name="Carbohydrates"
                      value={item.nutritionInfo.carbs}
                      unit="g"
                    />
                    <NutritionItem
                      name="Sugar"
                      value={item.nutritionInfo.sugar}
                      unit="g"
                    />
                    <NutritionItem
                      name="Added Sugar"
                      value={item.nutritionInfo.addedSugar}
                      unit="g"
                    />
                    <NutritionItem
                      name="Protein"
                      value={item.nutritionInfo.protein}
                      unit="g"
                    />
                    <NutritionItem
                      name="Fiber"
                      value={item.nutritionInfo.fiber}
                      unit="g"
                    />
                    <NutritionItem
                      name="Sodium"
                      value={item.nutritionInfo.sodium}
                      unit="mg"
                    />
                    <NutritionItem
                      name="Iron"
                      value={item.nutritionInfo.iron}
                      unit="mg"
                    />
                    <NutritionItem
                      name="Calcium"
                      value={item.nutritionInfo.calcium}
                      unit="mg"
                    />
                    <NutritionItem
                      name="Vitamin C"
                      value={item.nutritionInfo.vitaminC}
                      unit="mg"
                    />
                    <NutritionItem
                      name="Vitamin A"
                      value={item.nutritionInfo.vitaminA}
                      unit="iu"
                    />
                    <NutritionItem
                      name="Vitamin D"
                      value={item.nutritionInfo.vitaminD}
                      unit="mg"
                    />
                  </View>
                </>
              )}
            </View>
          </BottomSheetScrollView>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
