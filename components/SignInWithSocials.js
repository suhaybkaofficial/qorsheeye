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
  console.log("Loading ", setLoading);
  const [userData, setUserData] = useState([]);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "689564766095-h6866gpf4st2clghuc14mvnui3ju4ffk.apps.googleusercontent.com",
    iosClientId:
      "689564766095-hpg72gg472mqekajj1i3dc6l94c8vsep.apps.googleusercontent.com",
    expoClientId:
      "689564766095-m80tmg5naoip9h1dkkb3kh1j0dajvr23.apps.googleusercontent.com",
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
      console.log(error);
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
          console.log("------------");
          console.log(querySnapshot.empty);
          console.log("-------------");

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
                console.log("Document written with ID: ", docRef.id);
                docId = docRef.id;
                console.log(docId, "docID");
                const newObj = {
                  lastLoginAt: unixTimestamp,
                  displayName: userData?.given_name,
                  email: userData?.email,
                  given_name: userData?.given_name,
                  photoURL: userData?.picture,
                  userDocId: docId,
                };
                console.log(newObj);
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
              console.log("doc id -------", doc.id);
              docId = doc.id;
            });
            console.log(docId);
            
            const newObj = {
              lastLoginAt: unixTimestamp,
              displayName: userData?.given_name,
              email: userData?.email,
              given_name: userData?.given_name,
              photoURL: userData?.picture,
              userDocId: docId,
            };
            console.log(newObj);
            let stringified = JSON.stringify(newObj);
            setUserInfo(stringified);
            let store = await AsyncStorage.setItem("userInfo", stringified);
            setIsLoggedIn(true);
          }
        }
      } else {
        console.log("No User Data");
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
