import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_URL, blackText, blueText, colorTheme, grayText } from '../../constant'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'



const NotificationModal = ({ modalVisible, setModalVisible }) => {
    // const [search, setSearch] = useState('')
    // const [isRead, setIsRead] = useState(false)
    const [notifyData, setnotifyData] = useState([])
    const [fetchnotification, setfetchnotification] = useState(false)
    const [fetchrequestPermission, setfetchrequestPermission] = useState([])
    const [loadrequest, setloadrequest] = useState(false)


    function Notification({ iconBackGroundColor, iconColor, iconName, Date, isDate, data, request }) {
        return (
            <>
                {!request ?
                    <View style={{}}>
                        {isDate ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 30, alignItems: 'center' }}>
                                <Text style={[styles.bigText, { color: "gray" }]}>Today</Text>
                                <Text style={[styles.blueText, { fontSize: 15 }]} onPress={() => updateReadStatus(data._id)}>Mark as read</Text>
                            </View>
                            : null
                        }
                        <View style={{ flexDirection: "row", elevation: 1, borderRadius: 10, padding: 10, marginBottom: 10, backgroundColor: data.readstatus === 'unread' ? 'white' : colorTheme.borderColor }}>
                            <View style={{ backgroundColor: iconBackGroundColor, borderRadius: 50, width: 50, height: 50 }}>
                                <MaterialIcons name={iconName} size={20} color={iconColor} style={{ padding: 15 }} />
                            </View>
                            <View style={{ width: '80%', marginLeft: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.bigText}>{data.title}</Text>
                                    <Text style={{}}>1h</Text>
                                </View>
                                <Text style={[styles.smallText,]}>{data.prescription[0]}</Text>
                                <Text style={[styles.smallText,]}>{data.prescription[1]}</Text>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={{}}>
                        {isDate ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 30, alignItems: 'center' }}>
                                <Text style={[styles.bigText, { color: "gray" }]}>Request for Document</Text>
                            </View>
                            : null
                        }
                        <View style={{ flexDirection: "row", elevation: 1, borderRadius: 10, padding: 10, marginBottom: 10, backgroundColor: 'white' }}>
                            <View style={{ backgroundColor: iconBackGroundColor, borderRadius: 50, width: 50, height: 50 }}>
                                <MaterialIcons name={iconName} size={20} color={iconColor} style={{ padding: 15 }} />
                            </View>
                            <View style={{ width: '80%', marginLeft: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{}}>
                                    <Text style={styles.bigText}>{data.doctor.name}</Text>
                                    <Text style={[styles.smallText,]}>{data.doctor.email}</Text>
                                    {/* <Text style={{}}>1h</Text> */}
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity
                                    onPress={()=>updatePermission(data.ehr)}
                                     style={{ borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 50, padding: 5, marginRight: 10 }}>
                                        <MaterialIcons name='check' size={25} color='green' />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 50, padding: 5 }}>
                                        <Entypo name='cross' size={25} color='red' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </>
        )
    }

    async function getAllNotification(params) {
        try {
            setfetchnotification(false)
            console.log('fetching notification...');
            const token = await AsyncStorage.getItem("userToken");
            const config = {
                headers: {
                    'auth-token': token,
                }
            }
            const res = await axios.get(`${API_URL}/user/getprescription`, config)
            console.log(res.data);
            setnotifyData(res.data)
            setfetchnotification(true)
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function updateReadStatus(id) {
        try {
            const token = await AsyncStorage.getItem("userToken");
            const config = {
                headers: {
                    'auth-token': token,
                }
            }
            const body = {
                '_id': id
            }
            const res = await axios.post(`${API_URL}/user/prescriptionstatus`, body, config)
            console.log('status---->', res.data);
            // After updating permission, fetch all files again
            getAllNotification();
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function getPermissionRequest(params) {
        try {
            setloadrequest(false)
            console.log('fetching request...');
            const token = await AsyncStorage.getItem("userToken");
            const config = {
                headers: {
                    'auth-token': token,
                }
            }
            const res = await axios.get(`${API_URL}/user/getpermissioninfo`, config)
            console.log(res.data);
            setfetchrequestPermission(res.data)
            setloadrequest(true)
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function updatePermission(id) {
        try {
            const token = await AsyncStorage.getItem("userToken");
            const config = {
                headers: {
                    'auth-token': token,
                }
            }
            const body = {
                'ehr': id
            }
            const res = await axios.post(`${API_URL}/user/editpermission`, body, config)
            console.log('permission---->', res.data);
            // After updating permission, fetch all files again
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        getAllNotification()
        getPermissionRequest()
    }, [])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>

            <View style={styles.container}>
                {fetchnotification && loadrequest ?
                    <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
                        <View
                            style={{ flexDirection: "row", alignItems: "center", marginTop: 10, justifyContent: 'space-between' }}
                        >
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                                style={{ width: 35, height: 35, backgroundColor: "white", justifyContent: "center", alignItems: "center", borderRadius: 50, borderWidth: 1, borderColor: colorTheme.borderColor }}>
                                <Ionicons name={"chevron-back"} size={20} color={colorTheme.primaryColor} />
                            </Pressable>
                            <Text style={[styles.bigText, { fontFamily: "NotoSans_ExtraCondensed-Bold" }]} >Notification</Text>
                            <View style={{ backgroundColor: colorTheme.primaryColor, borderRadius: 50 }}>
                                <Text style={[styles.smallText, { color: "white", padding: 8 }]}>2 NEW</Text>
                            </View>
                        </View>
                        {
                            notifyData.map((data, index) => (
                                <Notification key={index} iconName={'notifications'} iconColor={"#1ce823"} iconBackGroundColor={'#c1f7c3'} isDate Date={'Today'} data={data} />
                            ))

                        }
                        {
                            fetchrequestPermission.map((data, index) => (
                                <Notification key={index} iconName={'notifications'} iconColor={"#1ce823"} iconBackGroundColor={'#c1f7c3'} isDate Date={'Today'} data={data} request />
                            ))

                        }
                    </ScrollView>
                    : <ActivityIndicator size={30} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.appBackGroundColor
    },
    subContainer: {
        width: "90%",
        height: "auto",
        alignSelf: "center",
    },
    textInput: {
        height: 50,
        borderRadius: 10,
        backgroundColor: "white",
        padding: 7,
        borderWidth: 1,
        borderColor: colorTheme.borderColor,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        justifyContent: "space-between"
    },
    bigText: {
        fontSize: blackText.fontSize,
        color: blackText.color,
        fontWeight: blackText.fontWeight,
    },
    smallText: {
        fontSize: grayText.fontSize,
        color: grayText.color,
        fontWeight: grayText.fontWeight
    },
    blueText: {
        fontSize: blueText.fontSize,
        color: blueText.color,
        fontWeight: blueText.fontWeight,
    },
})

export default NotificationModal;