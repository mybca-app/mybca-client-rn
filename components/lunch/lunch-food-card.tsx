import { Image } from 'expo-image';
import { Card, PressableFeedback } from 'heroui-native';
import { memo } from 'react';
import { Pressable, View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledImage = withUniwind(Image);

function LunchFoodCard({
  name,
  description,
  imageUrl,
  ...props
}: {
  name: string
  description?: string | null,
  imageUrl?: string | null,
} & React.ComponentProps<typeof Pressable>) {
  return (
    <PressableFeedback {...props}>
      <Card className="w-full">
        <Card.Body className="flex-row gap-4">
          {imageUrl && (
            <View className="justify-center">
              <StyledImage
                source={{ uri: imageUrl }}
                className="size-20 rounded-lg"
                cachePolicy="memory"
              />
            </View>
          )}
          <View className="justify-center flex-1 overflow-hidden">
            <Card.Title
              ellipsizeMode="tail"
              className="mb-1 flex-wrap"
            >
              {name}
            </Card.Title>

            {description && (
              <Card.Description>
                {description}
              </Card.Description>
            )}
          </View>
        </Card.Body>
      </Card>
    </PressableFeedback>
  )
}

export default memo(LunchFoodCard);