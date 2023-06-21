import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ProgressCircle from 'react-native-progress-circle'
import { Colors } from "../constants/Colors";
const Task = ({ title, startTime, endTime, percentage, days }) => {
  const { theme } = useContext(AuthContext);
  const members = [
    {
      id: "1",
      image:
        "https://lh3.googleusercontent.com/a/AGNmyxb2iENskm3Gq8Ll9OezPb2yY56Si4wuKrFJcGpOHQ=s288",
    },
    {
      id: "2",
      title:
        "https://lh3.googleusercontent.com/a/AGNmyxb2iENskm3Gq8Ll9OezPb2yY56Si4wuKrFJcGpOHQ=s288",
    },
    {
      id: "3",
      title:
        "https://lh3.googleusercontent.com/a/AGNmyxb2iENskm3Gq8Ll9OezPb2yY56Si4wuKrFJcGpOHQ=s288",
    },
  ];
  return (
    <View
      className={
        theme === "dark"
          ? "my-5 bg-[#3f4046] p-3 rounded-xl"
          : "my-5 bg-gray-300 p-3 rounded-xl"
      }
    >
      <View className="flex flex-row justify-between items-center">
        <Text
          className={
            theme === "dark"
              ? "text-lg font-semibold text-white"
              : "text-lg font-semibold text-gray-600"
          }
        >
          {title}
        </Text>
        <Text className="text-md text-white bg-[#e8a500] px-3 py-1 rounded-full">
          {days}d
        </Text>
      </View>
      <View className="flex flex-row justify-between items-center">
        <View>
          <Text
            className={
              theme === "dark"
                ? "text-white my-2 font-light"
                : " my-2  font-light"
            }
          >
            Team Members
          </Text>
          {members.map((member) => {
            return (
              <View
                className="flex items-center flex-row space-x-2  "
                key={member.id}
              >
                <Image
                  className="h-8 w-8 rounded-full my-1"
                  source={{
                    uri: member.image,
                  }}
                  style={{ resizeMode: "cover" }}
                />
                <Image
                  className="h-8 w-8 rounded-full my-1"
                  source={{
                    uri: member.image,
                  }}
                  style={{ resizeMode: "cover" }}
                />
                <Image
                  className="h-8 w-8 rounded-full my-1"
                  source={{
                    uri: member.image,
                  }}
                  style={{ resizeMode: "cover" }}
                />
              </View>
            );
          })}
          <View className="flex flex-row items-center space-x-2">
            <AntDesign name="clockcircle" size={24} color={Colors.secondary} />
            <Text className={theme === "dark" ? "text-white font-semibold" :" font-semibold"}>{startTime} - {endTime}</Text>
          </View>
        </View>
        <View>
        <ProgressCircle
            percent={percentage}
            radius={50}
            borderWidth={8}
            color={Colors.secondary}
            shadowColor="#999"
            bgColor="#fff"
        >
            <Text style={{ fontSize: 18 }}>{`${percentage}%`}</Text>
        </ProgressCircle>
        </View>
      </View>
    </View>
  );
};

export default Task;
