import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";
import { FlatList } from "react-native";
import { Image } from "react-native";
import Category from "./Category";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
const DATA = [
  {
    id: "1",
    title: "Personal",
    image: {
      src: require("../assets/personal.png"),
    },
    tasks: 6,
  },
  {
    id: "2",
    title: "Work",
    image: {
      src: require("../assets/work.png"),
    },
    tasks: 7,
  },
  {
    id: "3",
    title: "Home",
    image: {
      src: require("../assets/home.png"),
    },
    tasks: 2,
  },
  {
    id: "4",
    title: "Health & Fitness",
    image: {
      src: require("../assets/health.png"),
    },
    tasks: 2,
  },
  {
    id: "5",
    title: "Education",
    image: {
      src: require("../assets/education.png"),
    },
    tasks: 2,
  },
  {
    id: "6",
    title: "Finance",
    image: {
      src: require("../assets/finance.png"),
    },
    tasks: 2,
  },
  {
    id: "7",
    title: "Entertainment",
    image: {
      src: require("../assets/entertainment.png"),
    },
    tasks: 2,
  },
  {
    id: "8",
    title: "Reminders",
    image: {
      src: require("../assets/reminders.png"),
    },
    tasks: 2,
  },
  {
    id: "9",
    title: "Others",
    image: {
      src: require("../assets/others.png"),
    },
    tasks: 2,
  },
];
const Categories = () => {
  let { theme,tasks} = useContext(AuthContext);

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
          Tasks Organized By Categories
        </Text>
        {/* <TouchableOpacity className="mr-6">
          <Text
            className={
              theme === "dark"
                ? "text-white"
                : "text-[#e8a500]"
            }
          >
            Add +
          </Text>
        </TouchableOpacity> */}
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
        {/* <Text>{tasks[0].taskTitle}</Text> */}
      </View>
    </View>
  );
};

export default Categories;
