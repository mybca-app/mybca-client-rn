import MIcons from '@expo/vector-icons/MaterialIcons';
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from 'expo-router/unstable-native-tabs';
import React from 'react';

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
        <Label>Home</Label>
        <Icon
          sf="house.fill"
          androidSrc={<VectorIcon family={MIcons} name="home" />}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="buses">
        <Icon
          sf="bus.fill"
          androidSrc={<VectorIcon family={MIcons} name="directions-bus" />}
        />
        <Label>Buses</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="lunch">
        <Icon
          sf="fork.knife"
          androidSrc={<VectorIcon family={MIcons} name="lunch-dining" />}
        />
        <Label>Lunch</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="menu">
        <Icon
          sf="ellipsis"
          androidSrc={<VectorIcon family={MIcons} name="menu" />}
        />
        <Label>More</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
