import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import onboard1 from "../assets/onboard1.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import OnBoardAuth from "./OnBoardAuth";
import OnboardHeader from "./OnboardHeader";
const OnBoard1 = ({ index }) => {
  return (
    <ImageBackground
      source={require("../assets/onboard1.jpg")}
      className="h-full "
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
        <OnBoardAuth index={index} />
      </View>
    </ImageBackground>
  );
};

export default OnBoard1;
