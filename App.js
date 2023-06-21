import { Text, View } from "react-native";
import Onboard from "./screens/Onboard";
import { AuthContext, AuthProvider } from "./utils/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./navigation/Main";

import { useContext } from "react";
import { LogBox } from "react-native";
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default function App() {
  
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}
