
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import CustomButton from '../../components/CustomButton'
import FormField from '../../components/FormField'
import { Link, router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import { createUser } from '../../lib/appwrite'
export default function SignUp() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
		 const { setUser, setIsLogged } = useGlobalContext();

  const submit = async () => {
		if (!form.username || !form.email || !form.password) {
			Alert.alert("Error", "Please fill all fields");
		}
		setIsSubmitting(true);
		try {
			const res = await createUser(
				form.email,
				form.password,
				form.username
			);
			setUser(res);
			setIsLogged(true);
			
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
						Sign Up to Aora
					</Text>
					<FormField
						title="Username"
						value={form.username}
						handleChangeText={(text) =>
							setForm({ ...form, username: text })
						}
						otherStyles="mt-10"
					/>
					<FormField
						title="Email"
						value={form.email}
						handleChangeText={(text) =>
							setForm({ ...form, email: text })
						}
						otherStyles="mt-2"
						keyboardType="email-address"
					/>
					<FormField
						title="Password"
						value={form.password}
						handleChangeText={(text) =>
							setForm({ ...form, password: text })
						}
						otherStyles="mt-2"
					/>
					<CustomButton
						title="Sign in"
						otherStyles="mt-5"
						isLoading={isSubmitting}
						onPress={submit}
					/>
					<View className="justify-center pt-5 flex-row gap-2">
						<Text className="text-lg text-gray-100 font-pregular">
							Have an account already?
						</Text>
						<Link
							className="text-lg font-psemibold text-secondary"
							href="/sign-in">
							Sign In
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
  );
}

