import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';

import { DynamicColorIOS } from 'react-native';

export default function TabLayout() {
  return (
    <NativeTabs
      tintColor={
        DynamicColorIOS({
          dark: 'rgb(243, 202, 64)',
          light: 'rgb(243, 202, 64)'
        })
      }
    >
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
