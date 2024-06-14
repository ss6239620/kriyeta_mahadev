import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { API_URL, colorTheme } from '../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { navigate } from '../../services/navRef';

const DoctorPrescription = () => {
    const [inputs, setInputs] = useState([""]);
    const [title, setTitle] = useState([]);

    const handleTitle = (text) => {
        setTitle(text);
    };

    const handleAddInput = () => {
        setInputs([...inputs, ""]);
    };
    const handleChangeText = (index, newText) => {
        const updatedInputs = [...inputs];
        updatedInputs[index] = newText;
        setInputs(updatedInputs);
    };

    async function uploadPrescription(title,arr) {
        console.log(arr);
        try {
          const token = await AsyncStorage.getItem("doctorToken");
          const config = {
            headers: {
              'auth-token': token,
            }
          }
          const body = {
            userid: "660b895bec9ecb03b6f61047",   
            title: title,
            "prescription": arr
          }
          const res = await axios.post(`${API_URL}/doctor/postprescription`, body, config)
          console.log('prescript---->',res.data);
          navigate('DoctorHome')
          // After updating permission, fetch all files again
        } catch (error) {
          console.log(error.response.data);
        }
      }

    return (
        <>
            <ScrollView style={styles.container}>
                <TouchableOpacity>
                    <AntDesign name="left" color='black' size={25} />
                </TouchableOpacity>
                <Text style={styles.header} >Add Your Prescription</Text>
                <View >
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '400' }}>Title</Text>
                    <TextInput
                        style={styles.textInput1}
                        onChangeText={handleTitle}
                        value={title}
                        placeholder="Enter Prescription Title ..."
                    />
                </View>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: '400' }}>Prescription</Text>
                {inputs.map((text, index) => (
                    <View key={index} style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput2}
                            value={text ? text : ''}
                            onChangeText={(newText) => handleChangeText(index, newText)}
                            placeholder='Enter Prescription'
                        />
                        <TouchableOpacity onPress={handleAddInput} style={styles.addButton}>
                            <View style={{ backgroundColor: colorTheme.primaryColor, padding: 5, borderRadius: 10, color: '#407CE2' }}>
                                <AntDesign name="plus" color='black' size={25} />
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity onPress={()=>uploadPrescription(title,inputs)} >
                    <View style={styles.submit}>
                        <Text style={{ color: 'black' }}>Submit</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 30,
    },
    header: {
        fontSize: 21,
        fontWeight: '700',
        color: 'black',
        marginVertical: 20
    },
    textInputContainer: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput1: {
        height: 50,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 15,
        borderRadius: 15,
        marginBottom: 20,

    },
    textInput2: {
        height: 50,
        width:'85%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 15,
        borderRadius: 15,
    },
    addButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20
    },
    submit: {
        width: '100%',
        height: 40,
        backgroundColor: '#407CE2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 50

    }
});

export default DoctorPrescription;