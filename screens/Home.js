import { View, Text } from "react-native";
import React, { useContext } from "react";
import Header from "../components/Header";
import { AuthContext } from "../utils/AuthContext";
import Categories from "../components/Categories";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import Ongoing from "../components/Ongoing";
import { Colors } from "../constants/Colors";

const Home = () => {
  const { theme, changeTheme } = useContext(AuthContext);
  return (
    <View
      className={
        theme === "dark" ? "bg-[#202124] h-full relative" : "h-full relative"
      }
    >
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <Categories />
        <Ongoing />
        
      <View className="mt-40" />
      </ScrollView>
      {/* OverFloating Button */}

      <View>
        <TouchableOpacity
          className="absolute right-5 bottom-20 z-99 h-16 w-16 flex justify-center items-center rounded-full"
          style={{ backgroundColor: Colors.secondary }}
        >
          <Text className="text-white text-4xl">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
