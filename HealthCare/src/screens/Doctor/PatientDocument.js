import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, colorTheme, blackText, grayText, blueText, FILE_API_URL } from '../../constant';
import axios from 'axios';
import Header from '../../components/Header';
import OpenLink from '../../components/OpenLink';

export default function PatientDocument({ navigation, route }) {
    const [loading, setloading] = useState(false)
    const [documentData, setdocumentData] = useState([])
    const user_id = route.params.user_id

    async function getAllDocument() {
        try {
            console.log('fetching....');
            setloading(false)
            const token = await AsyncStorage.getItem("doctorToken");
            const config = {
                headers: {
                    'auth-token': token,
                }
            }
            const body = {
                user: user_id
            }

            const res = await axios.post(`${API_URL}/doctor/getuserfiles`, body, config)
            console.log('document---->', res.data);
            // After updating permission, fetch all files again
            setdocumentData(res.data)
            setloading(true)
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function requestAccess(ehr,user) {
        try {
            console.log('fetching....');
            const token = await AsyncStorage.getItem("doctorToken");
            const config = {
                headers: {
                    'auth-token': token,
                }
            }
            const body = {
                ehr: ehr,
                user: user,
            }

            const res = await axios.post(`${API_URL}/doctor/requestpermission`, body, config)
            console.log('request send---->', res.data);
            // After updating permission, fetch all files again
        
        } catch (error) {
            console.log(error.response.data);
        }
    }
    
    useEffect(() => {
        getAllDocument()
    }, [])

    return (
        <>
            {!loading ? <ActivityIndicator size={'large'} style={{ justifyContent: 'center', alignItems: 'center' }} /> :
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.subContainer}>
                            <Header leftIconName header={'Patient Documents'} titleMargin={20} />
                            <View style={{ marginVertical: 10 }} />
                            {documentData.map((data, index) => (
                                <View key={index} style={{ backgroundColor: 'white', elevation: 1, marginTop: 10, borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 10, padding: 15 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={[styles.bigText, { marginRight: 10 }]}>{data.title}</Text>
                                        <Text style={{ color: data.permission === 'public' ? 'green' : 'red' }}>{data.permission}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text>{data.user.name}</Text>
                                        <Text>{data.user.email}</Text>
                                    </View>
                                    {data.permission === 'public' && <View style={{marginTop:10}}><OpenLink url={`${FILE_API_URL}/uploads/${data.ehr}`} /></View>}

                                    {data.permission === 'private' &&
                                        <TouchableOpacity
                                        onPress={()=>{requestAccess(data._id,user_id)}}
                                        style={{ backgroundColor: colorTheme.primaryColor, borderRadius: 10, marginTop: 10 }}>
                                            <Text style={{ color: 'white', padding: 10, textAlign: 'center' }}>Request Access</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.appBackGroundColor
    },
    subContainer: {
        width: "90%",
        height: "auto",
        alignSelf: "center",
        // backgroundColor:"red"
    },
    bigText: {
        fontSize: blackText.fontSize,
        color: blackText.color,
        fontWeight: blackText.fontWeight
    },
    smallText: {
        fontSize: grayText.fontSize,
        color: grayText.color,
        fontWeight: grayText.fontWeight
    },
    blueText: {
        fontSize: blueText.fontSize,
        color: blueText.color,
        fontWeight: blueText.fontWeight
    },
})