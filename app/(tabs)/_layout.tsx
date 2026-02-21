import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';
import React from 'react';
import MIcons from '@expo/vector-icons/MaterialIcons';

import { DynamicColorIOS, PlatformColor, useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <NativeTabs
      /*tintColor="rgb(242, 203, 64)"*/
      minimizeBehavior="onScrollDown"
      backgroundColor={colorScheme === 'dark' ? 'rgb(20 29 49)' : 'rgb(244 239 222)'}
      tintColor={colorScheme === 'dark' ? 'rgb(243 202 64)' : 'rgb(61, 50, 16)'}
      iconColor={colorScheme === 'dark' ? '#fff' : 'rgb(61, 50, 16)'}
      indicatorColor={colorScheme === 'dark' ? 'rgb(28 38 60)' : 'rgb(235, 206, 117)'}
    >
      <NativeTabs.Trigger name="(home)">
        <Label>Home</Label>
        <Icon sf="house.fill" androidSrc={<VectorIcon family={MIcons} name="home" />} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="buses">
        <Icon sf="bus.fill" androidSrc={<VectorIcon family={MIcons} name="directions-bus" />} />
        <Label>Buses</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="lunch">
        <Icon sf="fork.knife" androidSrc={<VectorIcon family={MIcons} name="lunch-dining" />} />
        <Label>Lunch</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="news">
        <Icon sf="newspaper.fill" androidSrc={<VectorIcon family={MIcons} name="newspaper" />} />
        <Label>News</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
