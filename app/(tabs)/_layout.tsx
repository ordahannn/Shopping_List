import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="shopping-list"
        options={{
          title: 'List',
          tabBarIcon: ({ color }) => <Entypo name="list" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add-edit-item"
        options={{
          title: 'Add Item',
          tabBarIcon: ({ color }) => <Entypo name="plus" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
