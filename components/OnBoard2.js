import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import onboard1 from "../assets/onboard1.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

import { Octicons } from "@expo/vector-icons";
import OnBoardAuth from "./OnBoardAuth";
import OnboardHeader from "./OnboardHeader";
const OnBoard2 = ({index}) => {
  return (
    <ImageBackground
    source={require("../assets/onboard2.jpg")}
    className="h-full"
  >
    <View
      className="h-full justify-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, .3)",
      }}
    >
      <OnboardHeader />
    </View>
    <View className="flex justify-center items-center absolute w-full bottom-10 z-5 ">
     <OnBoardAuth index={index}/>
    </View>
  </ImageBackground>
  )
}

export default OnBoard2