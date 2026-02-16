import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomSheet, Button } from 'heroui-native';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

export default function NotifPromptSheet({
  isOpen,
  setIsOpen,
  onConfirm,
}: {
  isOpen: boolean,
  setIsOpen: (open: boolean) => void
  onConfirm: () => void,
}) {
  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content>
          <View className="items-center mb-5">
            <View className="size-20 items-center justify-center rounded-full bg-yellow-500/10">
              <StyledIonicons
                name="bus"
                size={40}
                className="text-yellow-500"
              />
            </View>
          </View>
          <View className="mb-8 gap-2 items-center">
            <BottomSheet.Title className="text-center">
              Enable bus notifications
            </BottomSheet.Title>
            <BottomSheet.Description className="text-center">
              Get a notification the moment one of your starred buses arrives at
              BCA.
            </BottomSheet.Description>
          </View>
          <View className="gap-3">
            <Button onPress={() => {
              onConfirm();
              setIsOpen(false);
            }}>Enable</Button>
            <Button variant="tertiary" onPress={() => setIsOpen(false)}>
              Later
            </Button>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  )
}