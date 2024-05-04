import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

export default function CustomButton({ onPress, title, containerStyles ,textStyles,isLoading}) {
	return (
		<TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isLoading}
			className={`bg-secondary-200 w-full py-3 mt-5 rounded-lg ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
		>
			<Text className={`text-primary text-lg text-center font-psemibold ${textStyles}`}>
				{title}
			</Text>
		</TouchableOpacity>
	);
}