import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor(
    { light: undefined, dark: undefined },
    "background"
  );

  return (
    <Tabs
      initialRouteName="(posters)"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: { backgroundColor: backgroundColor },
        // headerBackgroundContainerStyle: { backgroundColor: backgroundColor },
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
