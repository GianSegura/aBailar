import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="(posters)"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarShowLabel: false,
        // tabBarStyle: { paddingBottom: 3 },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(posters)"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={`home${!focused ? "-outline" : ""}`}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(lists)"
        options={{
          title: "Lists",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={`list${!focused ? "-outline" : ""}`}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(twitter)"
        options={{
          title: "Twitter",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={`chatbox${!focused ? "-outline" : ""}`}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={`person${!focused ? "-outline" : ""}`}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
