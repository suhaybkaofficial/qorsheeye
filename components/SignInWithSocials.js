import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../utils/AuthContext";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../utils/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { Colors } from "../constants/Colors";

const androidClientId = Constants.manifest.extra.androidClientId;
const expoClientId = Constants.manifest.extra.expoClientId;
const iosClientId = Constants.manifest.extra.iosClientId;
WebBrowser.maybeCompleteAuthSession();
const EXPO_REDIRECT_PARAMS = {
  useProxy: true,
  projectNameForProxy: "@suhaybka/qorsheeye",
};
const NATIVE_REDIRECT_PARAMS = { native: "qorsheeye://" };
const REDIRECT_PARAMS =
  Constants.appOwnership === "expo"
    ? EXPO_REDIRECT_PARAMS
    : NATIVE_REDIRECT_PARAMS;
const redirectUri = AuthSession.makeRedirectUri(REDIRECT_PARAMS);
const SignInWithSocials = () => {
  const [token, setToken] = useState("");
  const [userDocId, setUserDocId] = useState("");
  const {
    setUserInfo,
    setIsLoggedIn,
    userInfo,
    generateErrorMessage,
    Loading,
    setLoading,
    theme,
  } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId,
    iosClientId,
    expoClientId,
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
       setLoading(true);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      setUserData(user);
    } catch (error) {
      // Add your own error handler here
    }
  };
  useEffect(() => {
    const loginTheUser = async () => {
      if (Object.keys(userData).length !== 0) {
        if (userData?.email !== undefined) {
          const currentDate = new Date();
          const unixTimestamp = Math.floor(currentDate.getTime() / 1000);

          const collectionRef = collection(db, "users");
          const q = query(collectionRef, where("email", "==", userData?.email));
          const querySnapshot = await getDocs(q);

          let docId;
          if (querySnapshot.empty) {
            
            setLoading(false)
            const saveToFireStore = async () => {
              let authProvider = "Google";
              try {
                const docRef = await addDoc(collection(db, "users"), {
                  fullname: userData?.given_name,
                  email: userData?.email,
                  photoURL: userData?.picture,
                  authProvider: authProvider,
                  registeredAt: serverTimestamp(),
                });
                docId = docRef.id;
                const newObj = {
                  lastLoginAt: unixTimestamp,
                  displayName: userData?.given_name,
                  email: userData?.email,
                  given_name: userData?.given_name,
                  photoURL: userData?.picture,
                  userDocId: docId,
                };
                let stringified = JSON.stringify(newObj);
                setUserInfo(stringified);
                let store = await AsyncStorage.setItem("userInfo", stringified);
                setIsLoggedIn(true);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            };
            saveToFireStore();
          } else {
            
            setLoading(false)
            querySnapshot.forEach((doc) => {
              docId = doc.id;
            });
            
            const newObj = {
              lastLoginAt: unixTimestamp,
              displayName: userData?.given_name,
              email: userData?.email,
              given_name: userData?.given_name,
              photoURL: userData?.picture,
              userDocId: docId,
            };
            let stringified = JSON.stringify(newObj);
            setUserInfo(stringified);
            let store = await AsyncStorage.setItem("userInfo", stringified);
            setIsLoggedIn(true);
          }
        }
      } else {
      }
    };
    loginTheUser();
  }, [userData]);
  return (
    <View className="my-2">
      {Loading ? (
        <>
          {theme === "dark" ? (
            <>
              <ActivityIndicator size="large" color={Colors.white} />
            </>
          ) : (
            <>
              <ActivityIndicator size="large" color={Colors.secondary} />
            </>
          )}
        </>
      ) : (
        <>
          <TouchableOpacity
            className="flex flex-row justify-center items-center space-x-2 bg-[#db4437] py-3 px-6 rounded-full"
            disabled={!request}
            onPress={() => {
              promptAsync(REDIRECT_PARAMS);
            }}
          >
            <AntDesign name="google" size={24} color="white" />
            <Text className="font-semibold text-white">
              Sign In With Google
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default SignInWithSocials;
