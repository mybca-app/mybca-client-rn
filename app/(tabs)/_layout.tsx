import { NativeTabs, Label, Icon } from 'expo-router/unstable-native-tabs';
import React from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(home)">
        <Label>Home</Label>
        <Icon sf="house.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="buses">
        <Icon sf="bus.fill" />
        <Label>Buses</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="lunch">
        <Icon sf="fork.knife" />
        <Label>Lunch</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="news">
        <Icon sf="newspaper.fill" />
        <Label>News</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
