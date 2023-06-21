import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const OnBoardAuth = ({index}) => {
    const navigation = useNavigation()
  return (
    <View className="flex flex-row justify-evenly space-x-4 ">
    <TouchableOpacity className="bg-transparent border border-white py-3 px-10 rounded-full"
    onPress={()=>{navigation.navigate("Login")}}
    >
      <Text className="text-white">Login</Text>
    </TouchableOpacity>

    <TouchableOpacity className="bg-white py-3 px-10 rounded-full"
     onPress={()=>{navigation.navigate("Signup")}}
    >
      <Text className={index == 0 ? "text-[#b99b15]": "text-[#005e9c]"}>Signup</Text>
    </TouchableOpacity>
  </View>
  )
}

export default OnBoardAuth