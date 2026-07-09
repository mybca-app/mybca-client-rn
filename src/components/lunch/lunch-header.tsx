import { Text } from 'react-native';

export default function LunchHeader({ text }: { text: string }) {
  return (
    <Text className="mt-4 mb-2 font-bold text-2xl text-foreground">{text}</Text>
  );
}
