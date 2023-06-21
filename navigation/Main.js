import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './StackNavigator'
import { AuthContext } from '../utils/AuthContext'
import AuthNavigator from './AuthNavigator'
import { StatusBar } from "expo-status-bar";
import TabNavigator from './TabNavigator'
const Main = () => {
    const {isLoggedIn,theme} = useContext(AuthContext)
  return (
    <NavigationContainer>
      {
        isLoggedIn ? 
        <>
            <TabNavigator />
        </>
        :
        <>
            <AuthNavigator />
        </>
      }
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </NavigationContainer>
  )
}

export default Main