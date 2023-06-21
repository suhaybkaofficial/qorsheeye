import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import Task from "./Task";

const Ongoing = () => {
  const DATA = [
    {
      id: "1",
      title: "Wallet App Design",
      startTime: "2:30 PM",
      endTime: "5:30 PM",
      percentage: 40,
      days: 2,
    },
    {
      id: "2",
      title: "Dashboard & Mobile App",
      startTime: "2:30 PM",
      endTime: "5:30 PM",
      percentage: 15,
      days: 3,
    },
    {
      id: "3",
      title: "Logo Design Drafting",
      startTime: "2:30 PM",
      endTime: "5:30 PM",
      percentage: 70,
      days: 5,
    },
  ];
  const { theme } = useContext(AuthContext);
  return (
    <View className="mx-6 my-4">
      <View className="flex flex-row justify-between items-center">
        <Text
          className={
            theme === "dark"
              ? "text-white font-semibold text-xl"
              : " font-semibold text-xl"
          }
        >
          Ongoing Tasks
        </Text>
        <TouchableOpacity>
          <Text className={theme === "dark" ? "text-white" : "text-[#e8a500]"}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {DATA.map((item) => {
          return (
            <Task
              title={item.title}
              members={item.members}
              startTime={item.startTime}
              endTime={item.endTime}
              percentage={item.percentage}
              days={item.days}
              key={item.id}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Ongoing;
