import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import { Colors } from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../utils/AuthContext";
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import * as dayjs from 'dayjs'
import { ScrollView } from "react-native";
let photoURL = "https://cdn.britannica.com/99/236599-050-1199AD2C/Mark-Zuckerberg-2019.jpg";
const Profile = () => {
  const { theme, userInfo ,signout} = useContext(AuthContext);
  const parsed = JSON.parse(userInfo);
  const timestamp = parsed?.lastLoginAt *1000;
  const date = new Date(timestamp);
  const dateString = date.toLocaleString();
console.log(dateString);
  return (
    <View className="flex-1" style={{ backgroundColor: Colors.secondary }}>
      <SafeAreaView>
        <View className="relative mx-6 my-2 h-10">
          <TouchableOpacity className="absolute right-0">
            <AntDesign name="edit" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View
          className={
            theme === "dark"
              ? "h-full rounded-2xl mx-2 my-20 bg-[#202124]"
              : "h-full rounded-2xl mx-2 my-20 bg-white"
          }
        >

          {/* Profile Image */}
          <View className="flex justify-center items-center -mt-16">
            <View
              className={
                theme === "dark"
                  ? "h-24 w-24 border flex justify-center items-center border-white rounded-full"
                  : "h-24 w-24 border border-[#202124] rounded-full flex justify-center items-center"
              }
            >
              <Image
                className="h-20 w-20 rounded-full  my-3 "
                source={{
                  uri: photoURL,
                }}
                style={{ resizeMode: "contain" }}
              />
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text
              className={
                theme === "dark"
                  ? "text-center font-bold text-xl my-3 text-white"
                  : "text-center font-bold text-xl my-3 text-[#202124]"
              }
            >
              {parsed?.displayName}
            </Text>
          </View>

          <View className="py-4 rounded-2xl mx-4 flex flex-row justify-between items-center px-4" style={{backgroundColor:Colors.secondary}}>
              <View className="flex items-center space-y-1">
              <FontAwesome name="hourglass-start" size={30} color="white" />
                <Text className="text-gray-200 font-medium">Pending</Text>
                <Text className="font-extrabold text-4xl text-white">5</Text>
              </View>
              <View className="flex items-center space-y-1">
              <AntDesign name="loading1" size={30} color="white" />
                <Text className="text-gray-200 font-medium">Ongoing Tasks</Text>
                <Text className="font-extrabold text-4xl text-white">3</Text>
              </View>
              <View className="flex items-center space-y-1">
              
              <Ionicons name="checkmark-done" size={30} color="white" />
                <Text className="text-gray-200 font-medium">Done</Text>
                <Text className="font-extrabold text-4xl text-white">10</Text>
              </View>
          </View>

          <View className="my-4 mx-4">
            <Text className={theme === "dark"?"text-center font-bold text-xl text-white":"text-center font-bold text-xl text-[#202124]"}>Profile Information</Text>

            <View className="flex flex-row my-2 items-center space-x-2">
            <Feather name="user" size={24} color={theme === "dark"?"white":"#202124"} />
              <Text className={theme === "dark"?"text-semibold text-white tracking-wider":"text-semibold tracking-wider text-[#202124]"}>{parsed?.displayName}</Text>
            </View>
            <View className="flex flex-row my-2 items-center space-x-2">
            <MaterialIcons name="email" size={24} color={theme === "dark"?"white":"#202124"} />
              <Text className={theme === "dark"?"text-semibold text-white tracking-wider":"text-semibold tracking-wider text-[#202124]"}>{parsed?.email}</Text>
            </View>
            <View className="flex flex-row my-2 items-center space-x-2">
            <FontAwesome name="history" size={24} color={theme === "dark"?"white":"#202124"} />
              <Text className={theme === "dark"?"text-semibold text-white tracking-wider":"text-semibold tracking-wider text-[#202124]"}>
              {/* {parsed?.lastLoginAt.toLocaleDateString("en-US")} */}
              Last Login: {dateString}
              </Text>
            </View>
            <View className="border border-gray-300 my-6" />
              {/* Signout */}
            <View className="my-4">
              <TouchableOpacity onPress={signout} className={theme === "dark"?"flex flex-row items-center space-x-3":"flex flex-row items-center space-x-3"}>
              <SimpleLineIcons name="logout" size={24} color={theme === "dark"?"white":"red"} />
              <Text className={theme === "dark"?"text-white tracking-wider text-lg":"text-red-600 tracking-wider text-lg"}>Signout</Text>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>

        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
