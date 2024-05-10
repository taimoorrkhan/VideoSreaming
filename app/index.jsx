import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router,Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";
export default function App() {

	const { loading, isLogged } = useGlobalContext();
	  if (!loading && isLogged) return <Redirect href="/home" />;

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{ height: "100%" }}>
				<View className="w-full justify-start  items-center min-h-[85vh] px-4">
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[130px] h-[84px]"
					/>
					<Image
						source={images.cards}
						resizeMode="contain"
						className="max-w-[380px] w-full h-[300px]"
					/>
					<View className="relative mt-5">
						<Text className="text-3xl text-white font-bold text-center">
							Discover Endless Possibilities with {""}
							<Text className="text-secondary-200">
								Aora
							</Text>
						</Text>
						<Image
							source={images.path}
							className="absolute w-[136px] h-[15px] -bottom-2 -right-8"
							resizeMode="contain"
						/>
					</View>
					<Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
						Where Creativity Meets Innovation: Embark on a
						Journey of Limitless Exploration with Aora
					</Text>
					<CustomButton
						containerStyles="w-full mt-5"
						title="Continue with Email"
						onPress={() => router.push("/sign-up")}
					/>
				</View>
			</ScrollView>
			<StatusBar style={"light"} backgroundColor="#161622" />
		</SafeAreaView>
	);
}


