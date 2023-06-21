import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import onboard1 from "../assets/onboard1.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import OnBoard1 from "./OnBoard1";
import OnBoard2 from "./OnBoard2";
import { Octicons } from "@expo/vector-icons";
const OnboardScreens = () => {
  const renderPagination = (index, total, context) => {
   
    return (
      <View className="flex justify-center items-center absolute w-full bottom-20 z-5 ">
        <View className="my-2 flex items-center flex-row space-x-2">
          <View className="flex flex-row space-x-2 mb-4">
            {
              index === 0 ? 
            <>
            <Octicons name="dot-fill" size={24} color="white" />
            <Octicons name="dot" size={24} color="white" />
            </>
            :
            index === 1 ? 
            <>
            <Octicons name="dot" size={24} color="white" />
            <Octicons name="dot-fill" size={24} color="white" />
            </>
            :
            <></>
            }
          </View>
        </View>
      </View>
    );
  };
  return (
    <View className="flex-1 h-full relative ">
      <Swiper renderPagination={renderPagination}>
        <View>
          <OnBoard1 index="0" />
        </View>
        <View>
          <OnBoard2 index="1" />
        </View>
      </Swiper>
    </View>
  );
};

export default OnboardScreens;
