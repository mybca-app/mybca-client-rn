import { Button, Card, Input, TextField } from 'heroui-native';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView
      contentContainerStyle={{ padding: 16 }}
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
