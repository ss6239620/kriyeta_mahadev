import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colorTheme, blackText, blueText, grayText, API_URL } from '../../constant'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { navigate } from '../../services/navRef'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HorizontalDate from '../../components/HorizontalDate'
import axios from 'axios'


const bubbleButton = [
    [
        {
            color: '#7166F9',
            name: 'Chat',
            icon: 'wechat',
            route: 'DoctorChatRoom'

        },
        {
            color: '#FF7854',
            name: 'Blogs',
            icon: 'edit-note',
            route: 'Blogs'
        },
    ],
    [
        {
            color: '#FEA725',
            name: 'VideoChat',
            icon: 'videocam',
            route: 'DoctorVideoCall'
        },
        {
            color: '#68EEBE',
            name: 'Patient Analysis',
            icon: 'bar-chart',
            route: 'PatientDataAnalysis'
        },
    ],
]


const Bubble = ({ data }) => {
    return (
        <TouchableOpacity
            onPress={() => { navigate(data.route) }}
            style={{ marginTop: 20, width: "48%", height: 140, backgroundColor: data.color, borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 7 }}>
            <View style={{ backgroundColor: 'white', borderRadius: 10 }}>
                <MaterialIcons name={data.icon} color={colorTheme.primaryColor} size={40} style={{ padding: 6, }} />
            </View>
            <Text style={[styles.bigText, { color: '#fff', fontWeight: '300' }]}>{data.name}</Text>
        </TouchableOpacity>
    )
}
export default function DoctorHome({navigation}) {
    const [appointmentLoad, setappointmentLoad] = useState(false)
    const [appointmentData, setappointmentData] = useState([])
    const [userInfoData, setuserInfoData] = useState([])

    async function handleLogout(params) {
        await AsyncStorage.removeItem("userToken")
        await AsyncStorage.removeItem("isDoctor")
        navigate('GetStarted')
    }
    async function getAllAppointment() {
        try {
            setappointmentLoad(false)
            const token = await AsyncStorage.getItem("doctorToken");
            const config = {
                headers: {
                    'auth-token': token,
                }
            }

            const res = await axios.get(`${API_URL}/doctor/fetchallappoinments`, config)
            console.log('appointment---->', res.data);
            // After updating permission, fetch all files again
            setappointmentData(res.data)
            setappointmentLoad(true)
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function findUserInfo() {
        try {
            console.log('getting user data ...');
            const token = await AsyncStorage.getItem("doctorToken");
            const body={
                _id: "660d238d020552a30ae9f099"
            }
            const config = {
                headers: {
                    'auth-token': token,
                }
            }

            const res = await axios.post(`${API_URL}/user/fetchuserdetails`,body, config)
            console.log('userInfo---->', res.data);
            // After updating permission, fetch all files again
            setuserInfoData(res.data)
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        getAllAppointment()
    }, [])

    const ApointmentCard = ({ data }) => {
        return (
            <Pressable
            onPress={()=>{navigation.navigate('DoctorAppointmentDetailScreen',{data:data})}}
             style={{
                backgroundColor: 'white',
                borderRadius: 10,
                marginVertical: 20,
                elevation: 3,
                width: '98%',
                alignSelf: 'center'
            }}>
                <View style={{ flex: 1, flexDirection: 'row', margin: 15 }}>
                    <Image source={require('../../assets/img/health.jpg')} style={{
                        width: '40%',
                        height: '100%',
                        marginRight: 5,
                        borderRadius: 10
                    }} />
                    <View
                        style={{ flex: 1, flexDirection: 'column' }}
                    >
                        <Text numberOfLines={2} style={[styles.boldText, { flexShrink: 1, fontSize: 15, fontWeight: '700' }]}>{data.user.name}</Text>
                        <Text numberOfLines={3} style={[styles.grayText, { flexShrink: 1, fontSize: 12 }]}>
                            {data.user.email}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styles.smallText,]}>Time</Text>
                            <Text style={[styles.smallText,]}>06:00 PM</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        )
    }

    const [search, setsearch] = useState('')
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.subContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <MaterialIcons name='notifications-active' size={30} color={colorTheme.iconWithBlueBackGround} />
                    <Image source={require('../../assets/img/Doctor.jpg')} style={styles.image} />
                </View>
                <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.bigText, { fontSize: 30, fontWeight: 'bold' }]}>Find </Text>
                    <Text style={[styles.bigText, { fontSize: 25, fontWeight: '500', color: '#A0A4A8' }]}>Your appointments </Text>
                </View>
                <View style={styles.textInput}>
                    <MaterialIcons name="search" color={colorTheme.primaryColor} size={25} />
                    <TextInput
                        placeholder='Search appointments..'
                        onChangeText={(text) => setsearch(text)}
                        value={search}
                        style={{ height: 48, width: "92%" }}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                    <Text style={styles.bigText}>Today</Text>
                    <TouchableOpacity
                        onPress={handleLogout}
                        style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: 96, height: 30, backgroundColor: colorTheme.primaryColor, borderRadius: 50 }}>
                        <MaterialCommunityIcons name="plus-thick" color="white" size={15} />
                        <Text style={[styles.smallText, { color: "white", marginLeft: 5 }]}>Add</Text>
                    </TouchableOpacity>
                </View>
                <HorizontalDate />
                {bubbleButton.map((row, index) => (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {row.map((item, i) => (
                            <Bubble key={i} data={item} />
                        ))}
                    </View>
                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[styles.bigText, { marginTop: 10, }]} onPress={findUserInfo}>Today's Appointments</Text>
                </View>
                {appointmentLoad ? appointmentData.map((data, index) => (
                    <ApointmentCard data={data} key={index} />
                )) : <ActivityIndicator size={'large'} style={{marginVertical:15}} />}
                <View style={{marginBottom:20}} />
            </ScrollView>
        </View>
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
        marginVertical: 20,
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
    textInput: {
        borderRadius: 10,
        backgroundColor: "white",
        padding: 5,
        borderWidth: 1,
        borderColor: "#d3d2d6",
        // height: 200,
        textAlignVertical: 'top',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 0.2,
        borderColor: "red"
    },
})