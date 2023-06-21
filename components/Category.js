import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { Image } from "react-native";
import { Colors } from "../constants/Colors";
import { TouchableOpacity } from "react-native";
import { Pressable } from "react-native";

const Category = ({ title, image, tasks }) => {
  let { theme } = useContext(AuthContext);

  return (
    <Pressable className="my-4" >
      <View
        className={
          theme === "dark"
            ? "bg-gray-600 mr-3 h-64 w-52 rounded-2xl relative"
            : "bg-gray-300 mr-3 h-64 w-52 rounded-2xl relative"
        }
        style={
          theme === "dark"
            ? {
                shadowColor: "#fff",
                shadowOffset: { width: 0, height: 7 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 7,
              }
            : {
                shadowColor: "#fdc300",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.5,
                shadowRadius: 3.84,
                elevation: 10,
              }
        }
      >
        <Text
          className={
            theme === "dark"
              ? "text-center font-semibold text-lg mt-2"
              : "text-center font-semibold text-lg mt-2"
          }
          style={theme === "dark" && { color: Colors.primary }}
        >
          {title}
        </Text>
        <Text
          className={
            theme === "dark"
              ? "text-center text-white tracking-wider"
              : "text-center tracking-wider "
          }
        >
          {tasks} pending
        </Text>
        <Image
          className="h-48 w-full absolute bottom-0 rounded-2xl "
          source={image.src}
          style={{ resizeMode: "cover" }}
        />
      </View>
    </Pressable>
  );
};

export default Category;
