import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";

const TabIcon = (icon, color, name, focused) => {
	return (
		<View className="items-center justify-center gap-2">
			<Image
				resizeMode="contain"
				tintColor={color}
				source={icon}
				className="w-6 h-6"
			/>
			<Text
				className={`text-sm ${
					focused ? "font-psemibold" : "font-pregular"
				} text-xs`}
			>
				{name}
			</Text>
		</View>
	);
};
export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 60,
        },
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ color, focused }) =>
						TabIcon(icons.home, color, "Home", focused),
				}}
			/>
			<Tabs.Screen
				name="bookmark"
				options={{
					title: "Bookmark",
					headerShown: false,
					tabBarIcon: ({ color, focused }) =>
						TabIcon(icons.bookmark, color, "Bookmark", focused),
				}}
			/>
			<Tabs.Screen
				name="create"
				options={{
					title: "Create",
					headerShown: false,
					tabBarIcon: ({ color, focused }) =>
						TabIcon(icons.plus, color, "Create", focused),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					headerShown: false,
					tabBarIcon: ({ color, focused }) =>
						TabIcon(icons.profile, color, "Profile", focused),
				}}
			/>
		</Tabs>
	);
}
