import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";

const OnboardHeader = () => {
  return (
    <SafeAreaView className="mx-6  h-full flex justify-center">
      <View className="justify-center">
        <View className="flex flex-row items-center space-x-2">
          <Image
            className="h-24 w-24  my-4"
            source={require("../assets/icon2.png")}
            style={{ resizeMode: "contain" }}
          />
          <Text className="text-lg bg-white py-2 px-4 rounded-xl">Qorsheeye</Text>
        </View>
        <Text className="text-4xl text-white font-bold ">
          Organize Your Life
        </Text>
        <Text className="text-2xl text-white">Achieve your goals.</Text>
      </View>
    </SafeAreaView>
  );
};

export default OnboardHeader;
