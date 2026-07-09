import Ionicons from '@expo/vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';
import {
  BottomSheet,
  ListGroup,
  PressableFeedback,
  Separator,
} from 'heroui-native';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

export default function BusesBottomSheet({
  isOpen,
  setIsOpen,
  expiryTime,
  spreadsheetUrl,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  expiryTime?: Date;
  spreadsheetUrl?: string;
}) {
  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content>
          <View>
            <BottomSheet.Title>Buses</BottomSheet.Title>
            <BottomSheet.Description>
              myBCA's systems periodically scan the BCA bus spreadsheet to
              detect your bus the moment it arrives.
            </BottomSheet.Description>
            <ListGroup className="mt-2 w-full bg-transparent shadow-none">
              {spreadsheetUrl && (
                <PressableFeedback
                  onPress={async () => {
                    setIsOpen(false);
                    await WebBrowser.openBrowserAsync(spreadsheetUrl);
                  }}
                >
                  <ListGroup.Item className="px-0">
                    <ListGroup.ItemPrefix>
                      <StyledIonicons
                        name="link"
                        size={22}
                        className="text-foreground"
                      />
                    </ListGroup.ItemPrefix>
                    <ListGroup.ItemContent>
                      <ListGroup.ItemTitle>View Source</ListGroup.ItemTitle>
                      <ListGroup.ItemDescription>
                        Open the BCA bus spreadsheet
                      </ListGroup.ItemDescription>
                    </ListGroup.ItemContent>
                    <ListGroup.ItemSuffix />
                  </ListGroup.Item>
                  <Separator className="mx-4" />
                  <PressableFeedback.Ripple />
                </PressableFeedback>
              )}
              {expiryTime && (
                <ListGroup.Item className="px-0">
                  <ListGroup.ItemPrefix>
                    <StyledIonicons
                      name="time"
                      size={22}
                      className="text-foreground"
                    />
                  </ListGroup.ItemPrefix>
                  <ListGroup.ItemContent>
                    <ListGroup.ItemTitle>
                      Data expires at {expiryTime?.toLocaleString()}
                    </ListGroup.ItemTitle>
                  </ListGroup.ItemContent>
                </ListGroup.Item>
              )}
            </ListGroup>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
