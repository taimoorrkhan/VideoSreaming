import { View, Text,TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";

export default function FormField({
	title,
	value,
	handleChangeText,
	otherStyles,
	placeholder,
	...props
}) {
  const [showPassword, setShowPassword] = useState(false)
	return (
		<View className={`space-y-2 ${otherStyles} `}>
			<Text className="text-base text-gray-100 font-pmedium">
				{title}
      </Text>
      <View className=" flex-row rounded-2xl items-center  border-2 border-black-200 focus:border-secondary-200 w-full h-16 px-4 bg-black-100">
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          className="flex-1 text-white font-psemibold text-base"
          {...props}
          placeholderTextColor="#7b7b8b"
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {
          title === 'Password' && (
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                source={showPassword ? icons.eye : icons.eyeHide}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )
        }
  
        

      </View>
		</View>
	);
}
