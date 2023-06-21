import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import AuthBG from "../components/AuthBG";
import { ScrollView } from "react-native";
import { TextInput } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SignInWithSocials from "../components/SignInWithSocials";
import { Appearance } from "react-native";
import { AuthContext } from "../utils/AuthContext";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { ActivityIndicator } from "react-native";
const Signup = () => {
  const { theme, signUpWithEmailAndPassword,Loading } = useContext(AuthContext);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <SafeAreaView className={theme === "dark" ? "bg-[#202124] h-full" : ""}>
      {/* Login Header */}
      <AuthBG screen="signup" />
      <ScrollView className="mx-6 " showsVerticalScrollIndicator={false}>
        <Text
          className="text-center font-bold text-xl "
          style={{ color: Colors.secondary }}
        >
          Sign In With Your Account
        </Text>
        {/* Form */}
        <View>
          <Text
            className={
              theme === "dark"
                ? "text-white text-center my-1"
                : "text-center my-1"
            }
          >
            Please enter your credentials to continue
          </Text>
          <View className="bg-[#e7e5e5] py-3 px-6 rounded-full my-2 flex flex-row items-center ">
            <Feather name="user" size={24} color={Colors.secondary} />
            <TextInput
              className="flex-grow ml-2"
              placeholder="John Doe"
              onChangeText={(fullname) => setFullname(fullname)}
            />
          </View>
          <View className="bg-[#e7e5e5] py-3 px-6 rounded-full my-2 flex flex-row items-center ">
            <Feather name="mail" size={24} color={Colors.secondary} />
            <TextInput
              className="flex-grow ml-2"
              placeholder="Youremail@example.com"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <View className="bg-[#e7e5e5] py-3 px-6 rounded-full my-2 flex flex-row items-center ">
            <Feather name="lock" size={24} color={Colors.secondary} />
            <TextInput
              className="flex-grow ml-2"
              placeholder="**************************"
              secureTextEntry={showPassword}
              maxLength={20}
              onChangeText={(password) => setPassword(password)}
            />
            {showPassword ? (
              <>
                <TouchableOpacity
                  onPress={handleShowPassword}
                  className=" pl-2 self-center"
                >
                  <Ionicons name="eye" size={24} color={Colors.secondary} />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={handleShowPassword}
                  className=" pl-2 self-center"
                >
                  <Ionicons name="eye-off" size={24} color={Colors.secondary} />
                </TouchableOpacity>
              </>
            )}
          </View>
          <View>
           {
            Loading ? 
            <>
            {
              theme === "dark" ? 
              <>
              <ActivityIndicator size="large" color={Colors.white} />
              </>:
              <>
              <ActivityIndicator size="large" color={Colors.secondary} />
              </>
            }
            </>
            :
            <>
            <TouchableOpacity
              style={{ backgroundColor: Colors.secondary }}
              className=" py-3 px-6 rounded-full my-2"
              onPress={() => {
                signUpWithEmailAndPassword(fullname, email, password);
              }}
            >
              <Text className="font-semibold text-center text-white">
                Sign up
              </Text>
            </TouchableOpacity>
            </>
           }
          </View>
          <View className="flex flex-row justify-center items-center space-x-2 my-1">
            <Text
              className={
                theme === "dark" ? "text-center text-white" : "text-center "
              }
            >
              Already Registered?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                className="font-semibold"
                style={{ color: Colors.secondary }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="py-64  h-30" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
