import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Modal } from 'react-native';
import { Pressable } from 'react-native';
import { AuthContext } from '../utils/AuthContext';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native';

const AddCategoryModal = () => {
    const [task,setTask] = useState("")
    const {categoryModalVisible,setCategoryModalVisible,theme} = useContext(AuthContext)
  return (
    <View>
     <Modal
        animationType="slide"
        transparent={true}
        visible={categoryModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setCategoryModalVisible(!categoryModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView} className={theme === "light" ? "bg-[#202124] py-2 px-4 rounded-2xl":"bg-white p-2 px-4 rounded-2xl"}>
            <Text className={theme==="light" ?"text-2xl font-semibold text-[#ffd72c] ":"text-2xl font-semibold text-[#ffd72c] "}>Add New Task</Text>
            <View className="bg-[#e7e5e5] py-3 px-6 rounded-full my-2 flex flex-row items-center ">
            <Feather name="mail" size={24} color={Colors.secondary} />
            <TextInput
              className="flex-grow ml-2"
              placeholder="Youremail@example.com"
              onChangeText={(email) => setEmail(email)}

            />
          </View>
            <Pressable
              style={[styles.button]}
              className="bg-red-600 text-white flex flex-row items-center justify-center space-x-2 my-2"
              onPress={() => setCategoryModalVisible(!categoryModalVisible)}>
              <Text className="text-white font-semibold">Cancel</Text>
              <MaterialIcons name="cancel" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default AddCategoryModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    modalView: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
})