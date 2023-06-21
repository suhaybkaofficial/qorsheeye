import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { AuthContext } from "../utils/AuthContext";
import Categories from "../components/Categories";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import Ongoing from "../components/Ongoing";
import { Colors } from "../constants/Colors";
import AddCategoryModal from "../components/AddCategoryModal";

const Home = () => {
  const { theme, changeTheme,categoryModalVisible,setCategoryModalVisible } = useContext(AuthContext);
  return (
    <View
      style={categoryModalVisible ? { flex: 1, justifyContent: "center", alignItems: "center" }: ""}
      className={
        theme === "dark" ? "bg-[#202124] h-full relative" : "h-full relative"
      }
    >
     {
      categoryModalVisible ? 
      <>
      <AddCategoryModal modalVisible={true} />
      </>
      :
      <>
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
          onPress={() => setCategoryModalVisible(!categoryModalVisible)}
        >
          <Text className="text-white text-4xl">+</Text>
        </TouchableOpacity>
      </View>
      </>
     }

      
    </View>
  );
};

export default Home;
