import { useHeaderHeight } from '@react-navigation/elements';
import { Button, Card } from 'heroui-native';
import { Platform, ScrollView } from 'react-native';

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();
  
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        paddingTop: (Platform.OS === 'web' ? headerHeight : 0) + 16,
      }}
      contentInsetAdjustmentBehavior="automatic"
      className="bg-background"
    >
      <Card>
        <Card.Body>
          <Card.Title className="mb-1">
            Starred Buses
          </Card.Title>
          <Card.Description>
            You don't have any starred buses.
          </Card.Description>
        </Card.Body>
        <Card.Footer className="mt-3">
          <Button variant="secondary">
            <Button.Label>All Buses</Button.Label>
          </Button>
        </Card.Footer>
      </Card>
    </ScrollView>
  );
}
