import Ionicons from '@expo/vector-icons/Ionicons';
import * as Linking from 'expo-linking';
import { Card, PressableFeedback } from 'heroui-native';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

export default function LinkCard({
  name,
  destination,
}: {
  name: string
  destination: string,
}) {
  return (
    <PressableFeedback onPress={async () => {
      await Linking.openURL(destination);
    }}>
      <Card className="w-full">
        <Card.Body className="flex-row gap-4">
          <View className="justify-center">
            <StyledIonicons name="link" size={24} className="text-accent" />
          </View>
          <View className="justify-center flex-1 overflow-hidden">
            <Card.Title
              ellipsizeMode="tail"
              className="flex-wrap"
            >
              {name}
            </Card.Title>
          </View>
        </Card.Body>
      </Card>
    </PressableFeedback>
  )
}