import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <NativeTabs
      /*tintColor="rgb(242, 203, 64)"*/
      minimizeBehavior="onScrollDown"
      backgroundColor={
        colorScheme === 'dark' ? 'rgb(20 29 49)' : 'rgb(244 239 222)'
      }
      iconColor={colorScheme === 'dark' ? '#fff' : 'rgb(61, 50, 16)'}
      tintColor="rgb(212, 173, 47)"
      indicatorColor={
        colorScheme === 'dark' ? 'rgb(28 38 60)' : 'rgb(235, 228, 204)'
      }
    >
      <NativeTabs.Trigger name="(home)">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="buses">
        <NativeTabs.Trigger.Label>Buses</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="bus.fill" md="directions_bus" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="lunch">
        <NativeTabs.Trigger.Label>Lunch</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="fork.knife" md="lunch_dining" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="menu">
        <NativeTabs.Trigger.Label>More</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="ellipsis" md="menu" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
