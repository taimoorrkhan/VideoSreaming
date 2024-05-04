import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function App() {
	return (
		<View>
			<Text className="text-cyan-300">index</Text>
			<Link
				href={"/profile"}
				style={{
					color: "blue",
				}}
			>
				Profile
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({});
