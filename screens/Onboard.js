import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import OnboardScreens from "../components/OnboardScreens";

const Onboard = () => {
    const pages = [
        {
          title: "Welcome to My App",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          image: require("../assets/onboard1.jpg"),
        },
        {
          title: "Explore Our Features",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          image: require("../assets/onboard2.jpg"),
        },
      ];
  return (
   <OnboardScreens />
  )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      viewPager: {
        flex: 1,
      },
      pageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        marginBottom: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      description: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 40,
        marginBottom: 30,
      },
});

export default Onboard;
