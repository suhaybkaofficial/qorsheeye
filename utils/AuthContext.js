import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useContext, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { ToastAndroid } from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  where,
  getDocs,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { auth, db } from "./firebase";
WebBrowser.maybeCompleteAuthSession();
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorType, setErrorType] = useState("");
  const [theme, setTheme] = useState("light");
  const login = (email, password) => {
    setLoading(true);
    let trimmedEmail = email.replace(/^\s+|\s+$/gm, "");
    if (trimmedEmail.length === 0 || password.length === 0) {
      let errorMsg = "Email/Password Are Required";
      generateErrorMessage(errorMsg);
      setUserInfo("");
      setLoading(false);
    } else {
      signInWithEmailAndPassword(auth, trimmedEmail, password)
        .then((userCredential) => {
          // Signed in
          setLoading(false);
          const user = userCredential.user;

          let stringified = JSON.stringify(user);
          setUserInfo(stringified);
          setIsLoggedIn(true);
          let storeUserData = AsyncStorage.setItem("userInfo", stringified);

          let userId = user.uid;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          if (errorMessage == "Firebase: Error (auth/user-not-found).") {
            let errorMsg = "Email/Password mismatch";
            generateErrorMessage(errorMsg);
            setUserInfo("");
          } else if (errorMessage == "Firebase: Error (auth/wrong-password).") {
            let errorMsg = "Email/Password mismatch";
            generateErrorMessage(errorMsg);
            setUserInfo("");
          } else if (errorMessage == "Firebase: Error (auth/invalid-email).") {
            let errorMsg = "Invalid Email";
            generateErrorMessage(errorMsg);
            setUserInfo("");
          } else {
            generateErrorMessage(errorMessage);
            setUserInfo("");
          }
        });
    }
  };
  const signout = () => {
    setUserInfo("");
    setIsLoggedIn(false);
    let removeItem = AsyncStorage.removeItem("userInfo");
  };
  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      let saveTheme = AsyncStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      let saveTheme = AsyncStorage.setItem("theme", "light");
    }
  };
  const checkTheme = async () => {
    try {
      const value = await AsyncStorage.getItem("theme");
      if (value) {
        setTheme(value);
      }
    } catch (e) {}
  };
  const generateErrorMessage = (errorMessage) => {
    ToastAndroid.show(errorMessage, ToastAndroid.LONG, 4000);
  };
  const signUpWithEmailAndPassword = async (fullname, email, password) => {
    let trimmedEmail = email.replace(/^\s+|\s+$/gm, "");
    setLoading(true);
    let photoURL =
      "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png";
    if (
      trimmedEmail.length === 0 ||
      fullname.length === 0 ||
      password.length === 0
    ) {
      setLoading(false);
      let errorMessage = "All Fields Are Required";
      generateErrorMessage(errorMessage);
      setUserInfo("");
    } else {
      const preventDuplicates = async () => {
        const collectionRef = collection(db, "users");
        const q = query(collectionRef, where("email", "==", trimmedEmail));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          createUserWithEmailAndPassword(auth, trimmedEmail, password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              const user1 = auth.currentUser;
              updateProfile(auth.currentUser, {
                displayName: fullname,
                photoURL: photoURL,
              })
                .then(() => {
                  // Profile updated!
                  const saveToFireStore = async () => {
                    try {
                      const docRef = await addDoc(collection(db, "users"), {
                        fullname: user1.displayName,
                        email: user1.email,
                        photoURL: user1.photoURL,
                        userId: user1.uid,
                        authProvider: "Email and Password",
                        registeredAt: serverTimestamp(),
                      });
                    } catch (e) {
                      console.error("Error adding document: ", e);
                    }
                  };
                  saveToFireStore();
                  const user = userCredential.user;
                  let stringified = JSON.stringify(user);
                  setUserInfo(stringified);
                  setIsLoggedIn(true);
                  let storeUserData = AsyncStorage.setItem(
                    "userInfo",
                    stringified
                  );
                })
                .catch((error) => {
                  // An error occurred
                  setLoading(false);
                  const errorCode = error.code;
                  const errorMessage = error.message;
                });
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setLoading(false);
              if (
                errorMessage == "Firebase: Error (auth/email-already-in-use)."
              ) {
                let errorMsg =
                  "Email Already Registered Sign in With Email/Password or Sign In With Google ";
                generateErrorMessage(errorMsg);
                setUserInfo("");
              } else if (
                errorMessage == "Firebase: Error (auth/invalid-email)."
              ) {
                let errorMsg = "Invalid Email Address";
                generateErrorMessage(errorMsg);
                setUserInfo("");
              } else if (
                errorMessage ==
                "Firebase: Password should be at least 6 characters (auth/weak-password)."
              ) {
                let errorMsg = "Password should be at least 6 characters";
                generateErrorMessage(errorMsg);
                setUserInfo("");
              }
            });
        } else {
          let errorMessage = "Email Already Registered Sign in With Google";
          generateErrorMessage(errorMessage);
        }
      };
      preventDuplicates();
      setLoading(false);
    }
  };
  const checkIfUserIsLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem("userInfo");
      if (value) {
        setUserInfo(value);
        setIsLoggedIn(true);
      }
    } catch {
      (e) => {};
    }
  };
  useEffect(() => {
    checkTheme();
    checkIfUserIsLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        Loading,
        setLoading,
        errorMsg,
        errorType,
        userInfo,
        setIsLoggedIn,
        setUserInfo,
        login,
        signout,
        isLoggedIn,
        categoryModalVisible,
        setCategoryModalVisible,
        theme,
        setTheme,
        changeTheme,
        setIsLoggedIn,
        signUpWithEmailAndPassword,
        generateErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
