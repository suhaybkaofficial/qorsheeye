import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { Modal } from "react-native";
import { Pressable } from "react-native";
import { AuthContext } from "../utils/AuthContext";
import DropDownPicker from "react-native-dropdown-picker";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Colors } from "../constants/Colors";

import { Dropdown } from "react-native-element-dropdown";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebase";
import { ActivityIndicator } from "react-native";
const AddCategoryModal = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("Personal");
  const [isFocus, setIsFocus] = useState(false);
  const [items, setItems] = useState([
    { label: "Personal", value: "Personal" },
    { label: "Work", value: "Work" },
    { label: "Home", value: "Home" },
    { label: "Health & Fitness", value: "Health & Fitness" },
    { label: "Education", value: "Education" },
    { label: "Finance", value: "Finance" },
    { label: "Entertainment", value: "Entertainment" },
    { label: "Reminders", value: "Reminders" },
    { label: "Others", value: "Others" },
  ]);

  const {
    categoryModalVisible,
    setCategoryModalVisible,
    theme,
    addTask,
    Loading,
  } = useContext(AuthContext);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={categoryModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setCategoryModalVisible(!categoryModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={styles.modalView}
            className={
              theme === "light"
                ? "bg-[#202124] py-4 px-6 w-[90%] rounded-2xl mx-6"
                : "bg-white p-4 px-6 w-[90%] rounded-2xl mx-6"
            }
          >
            <Text
              className={
                theme === "light"
                  ? "text-2xl font-semibold text-[#ffd72c] text-center "
                  : "text-2xl font-semibold text-[#ffd72c]  text-center"
              }
            >
              Add New Task
            </Text>
            {/* Task Title */}
            <View className="bg-[#e7e5e5] py-3 px-6 rounded-xl my-2 flex flex-row items-center w-full ">
              <MaterialCommunityIcons
                name="format-list-bulleted-type"
                size={24}
                color={Colors.secondary}
              />
              <TextInput
                numberOfLines={1}
                className="flex-grow ml-2"
                placeholder="Task Title"
                onChangeText={(taskTitle) => setTaskTitle(taskTitle)}
              />
            </View>
            {/* Task Description */}
            <View className="bg-[#e7e5e5] py-3 px-6 rounded-xl my-2 flex flex-row items-center w-full">
              <MaterialCommunityIcons
                name="information"
                size={24}
                color={Colors.secondary}
              />
              <TextInput
                numberOfLines={4}
                className="flex-grow ml-2"
                placeholder="Task Short Description"
                onChangeText={(taskDesc) => setTaskDesc(taskDesc)}
                returnKeyType="done"
                multiline
                textAlignVertical="top"
              />
            </View>
            {/* Task Category */}
            <View className="bg-[#e7e5e5] py-3 px-6 rounded-xl my-2 flex flex-row items-center w-full">
              <MaterialCommunityIcons
                name="format-list-bulleted-type"
                size={24}
                color={Colors.secondary}
              />
              <ScrollView>
                <Dropdown
                  listmode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                  className="flex-grow ml-2"
                  style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                  data={items}
                  search
                  showsVerticalScrollIndicator
                  autoScroll
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? "Select item" : "..."}
                  searchPlaceholder="Search..."
                  value={category}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setCategory(item.value);
                    setIsFocus(false);
                  }}
                />
              </ScrollView>
            </View>
            {!open ? (
              <>
                {Loading ? (
                  <>
                    {theme === "dark" ? (
                      <>
                        <ActivityIndicator size="large" 
                          color={Colors.secondary} className="my-5" />
                      </>
                    ) : (
                      <>
                        <ActivityIndicator
                          size="large"
                          color={Colors.white} className="my-5"
                        />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      style={[styles.button]}
                      onPress={() => addTask(taskTitle, taskDesc, category)}
                      disabled={!taskTitle || !taskDesc || !category}
                      className="bg-[#ffd72c] text-white flex flex-row items-center justify-center space-x-2 my-2 py-3 px-6 rounded-xl"
                    >
                      <Text className="text-black font-semibold">Add Task</Text>
                      <AntDesign name="checksquare" size={24} color="black" />
                    </TouchableOpacity>
                    <Pressable
                      style={[styles.button]}
                      className="bg-red-600 text-white flex flex-row items-center justify-center space-x-2 my-2 py-3 px-6 rounded-xl"
                      onPress={() =>
                        setCategoryModalVisible(!categoryModalVisible)
                      }
                    >
                      <Text className="text-white font-semibold">Cancel</Text>
                      <MaterialIcons name="cancel" size={24} color="white" />
                    </Pressable>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddCategoryModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  button: {
    elevation: 2,
  },
});
