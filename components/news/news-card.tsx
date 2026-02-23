import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { Card, PressableFeedback } from 'heroui-native';
import { memo } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledImage = withUniwind(Image);

function NewsCard({
  title,
  date,
  imageLink,
  storyLink,
}: {
  title: string;
  date: Date;
  imageLink?: string | null;
  storyLink?: string | null;
}) {
  return (
    <PressableFeedback
      onPress={async () => {
        if (storyLink) {
          await WebBrowser.openBrowserAsync(storyLink);
        }
      }}
    >
      <Card className="w-full">
        <Card.Body className="flex-row gap-4">
          {imageLink && (
            <View className="justify-center">
              <StyledImage
                source={{ uri: imageLink }}
                className="size-20 rounded-lg"
                cachePolicy="memory"
              />
            </View>
          )}
          <View className="justify-center flex-1 overflow-hidden">
            <Card.Title ellipsizeMode="tail" className="mb-1 flex-wrap">
              {title}
            </Card.Title>

            <Card.Description>{date.toLocaleDateString()}</Card.Description>
          </View>
        </Card.Body>
      </Card>
    </PressableFeedback>
  );
}

export default memo(NewsCard);
