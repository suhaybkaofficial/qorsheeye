import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Image } from "react-native";
import { AuthContext } from "../utils/AuthContext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const AuthBG = ({ screen }) => {
  const { theme, changeTheme } = useContext(AuthContext);
  return (
    <View className="flex  justify-center items-center">
      <View className="mt-4">
        {theme === "light" ? (
          <>
            <TouchableOpacity className="flex flex-row items-center justify-center" onPress={changeTheme}>
              <MaterialCommunityIcons
                name="moon-full"
                size={24}
                color="black"
              />
              <Text className="ml-2 capitalize">{theme} Theme</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity className="flex flex-row items-center justify-center" onPress={changeTheme}>
              <MaterialCommunityIcons
                name="moon-first-quarter"
                size={24}
                color={theme === "dark" && "white"} 
              />
              <Text  className={theme === "dark" ? "ml-2 capitalize text-white":"ml-2 capitalize"}>{theme} Theme</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Image
        className="h-64 w-64  my-3"
        source={
          screen === "login"
            ? require("../assets/signinBG.png")
            : require("../assets/signupBG.png")
        }
        style={{ resizeMode: "cover" }}
      />
    </View>
  );
};

export default AuthBG;
