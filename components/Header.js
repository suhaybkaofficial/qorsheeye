import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { AuthContext } from "../utils/AuthContext";
import { Colors } from "../constants/Colors";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { TouchableHighlight } from "react-native";
import { Pressable } from "react-native";
const Header = () => {
  const { theme, changeTheme, userInfo } = useContext(AuthContext);
  const [fullname, setFullname] = useState("");
  let parsed = JSON.parse(userInfo);

  return (
    <SafeAreaView>
      <View className="flex flex-row justify-between mx-6 items-center my-4">
        <View className="flex flex-row items-center">
          <View
            className="h-10 w-10 rounded-full flex justify-center items-center mr-2"
            style={
              theme === "dark"
                ? { backgroundColor: Colors.white }
                : { backgroundColor: Colors.secondary }
            }
          >
            <Image
              className="h-8 w-8 rounded-full  my-3"
              source={{
                uri: "https://cdn.britannica.com/99/236599-050-1199AD2C/Mark-Zuckerberg-2019.jpg",
              }}
              style={{ resizeMode: "contain" }}
            />
          </View>
          <View>
            <Text
              className={
                theme === "dark"
                  ? "text-white text-xl font-semibold "
                  : " text-xl font-semibold "
              }
              numberOfLines={1}
            >
              Hi,{" "}
               {parsed?.displayName.length > 14 ? parsed?.displayName.substr(0, 14) + "..." : parsed?.displayName} 
            </Text>
            <Text
              className={theme === "dark" && "text-white"}
              style={{ color: Colors.secondary }}
            >
              5 tasks pending
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center justify-center">
          {theme === "light" ? (
            <>
              <TouchableOpacity
                className="flex  items-center justify-center"
                onPress={changeTheme}
              >
                <MaterialCommunityIcons
                  name="moon-full"
                  size={30}
                  color="black"
                />
                <Text className="text-xs capitalize">{theme} Mode</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                className="flex items-center justify-center"
                onPress={changeTheme}
              >
                <MaterialCommunityIcons
                  name="moon-first-quarter"
                  size={30}
                  color={theme === "dark" && "white"}
                />
                <Text
                  className={
                    theme === "dark"
                      ? "text-white text-xs capitalize"
                      : "text-xs capitalize"
                  }
                >
                  {theme} Mode
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      {/* Search  */}
      <View>
        {/* Search Input */}
        <View className="mx-6">
          <View
            className={
              theme === "dark"
                ? "bg-[#e7e5e5] py-3 px-6 rounded-full my-2 flex flex-row items-center relative"
                : "bg-[#e0dddd] py-3 px-6 rounded-full my-2 flex flex-row items-center relative"
            }
          >
            <AntDesign name="search1" size={24} color={Colors.secondary} />
            <TextInput
              className="flex-grow ml-2"
              placeholder="Search your tasks...."
              maxLength={25}
            />
            <Pressable
              className="rounded-full p-4 absolute right-0 h-20 w-20 flex items-center justify-center"
              style={{ backgroundColor: Colors.secondary }}
            >
              <MaterialCommunityIcons
                name="filter-variant-plus"
                size={40}
                color="white"
              />
            </Pressable>
          </View>
        </View>
      </View>
      <View className="border border-gray-300 my-6" />
    </SafeAreaView>
  );
};

export default Header;
