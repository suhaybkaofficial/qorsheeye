import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { FlatList } from "react-native";
import { Image } from "react-native";
import Category from "./Category";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
const DATA = [
  {
    id: "1",
    title: "Website",
    image: {
      src: require("../assets/category1.png"),
    },
    tasks: 6,
  },
  {
    id: "2",
    title: "Mobile App",
    image: {
      src: require("../assets/category2.png"),
    },
    tasks: 7,
  },
  {
    id: "3",
    title: "Logo Design",
    image: {
      src: require("../assets/category3.png"),
    },
    tasks: 2,
  },
];
const Categories = () => {
  let { theme } = useContext(AuthContext);
  return (
    <View className="ml-6">
      <View className="flex flex-row justify-between items-center">
        <Text
          className={
            theme === "dark"
              ? "text-white font-semibold text-xl"
              : " font-semibold text-xl"
          }
        >
          Categories
        </Text>
        <TouchableOpacity className="mr-6">
          <Text
            className={
              theme === "dark"
                ? "text-white"
                : "text-[#e8a500]"
            }
          >
            Add +
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Category
              title={item.title}
              image={item.image}
              tasks={item.tasks}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Categories;
