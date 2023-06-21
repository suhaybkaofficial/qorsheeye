import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ProfileStackNavigator,
  HomeStackNavigator,
  TasksStackNavigator,
} from "./StackNavigator";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { AuthContext } from "../utils/AuthContext";
import { StyleSheet } from "react-native";
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const { theme } = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme === "light" ? "#393b39" : Colors.secondary,
        tabBarInactiveTintColor: theme === "light" ? "#fff" : "#6f786f",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 20,
          right: 20,
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
          borderBottomEndRadius: 24,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          borderBottomLeftRadius: 24,
          paddingTop: 7,
          paddingBottom: 7,
          paddingRight: 7,
          paddingLeft: 7,
          backgroundColor: theme === "light" ? Colors.secondary : "white",
          shadowColor: theme === "dark" ? Colors.secondary: "#202124",
          ...styles.shadow,
        },
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor:
          theme === "light" ? Colors.secondary : "#fff",
        tabBarInactiveBackgroundColor:
          theme === "light" ? Colors.secondary : "#fff",
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "sHome") {
            iconName = focused ? "ios-home" : "ios-home";
          } else if (route.name === "sTasks") {
            iconName = focused ? "today" : "today";
          } else if (route.name === "sProfile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={28} color={color} />;
        },
      })}
    >
      <Tab.Screen name="sHome" component={HomeStackNavigator} />
      <Tab.Screen name="sTasks" component={TasksStackNavigator} />
      <Tab.Screen name="sProfile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
export default TabNavigator;
