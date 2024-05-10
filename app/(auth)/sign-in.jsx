import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { Link } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";

import { getCurrentUser, signIn } from "../../lib/appwrite";
export default function SignIn() {
	const { setUser, setIsLoggedIn } = useGlobalContext();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const submit = async () => {
		if (!form.email || !form.password) {
			Alert.alert("Error", "Please fill all fields");
		}
		setIsSubmitting(true);
		try {
      await signIn(form.email, form.password);
      const res = await getCurrentUser();
      setUser(res);
      setIsLoggedIn(true);
			// set it to global state
			router.replace("/home");
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[88vh] px-4 my-600">
					<Image
						source={images.logo}
						resizeMode="contain"
						className="w-[115px] h-[35px]"
					/>
					<Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
						Log in to Aora
					</Text>
					<FormField
						title="Email"
						vlaue={form.email}
						handleChangeText={(text) =>
							setForm({ ...form, email: text })
						}
						otherStyles="mt-7"
						keyboardType="email-address"
					/>
					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(text) =>
							setForm({ ...form, password: text })
						}
						otherStyles="mt-3"
					/>

					<CustomButton
						title="Sign in"
						otherStyles="mt-5"
						isLoading={isSubmitting}
						onPress={submit}
					/>

					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Don't have an account?
						</Text>
						<Link
							className="text-lg font-psemibold text-secondary"
							href="/sign-up"
						>
							Sign Up
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({});
