import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { API_URL, blackText, blueText, colorTheme, grayText } from '../../constant';
import Header from '../../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const DoctorAppointmentDetailScreen = ({ navigation, route }) => {
    const user_id = route.params.id
    const [userInfoData, setuserInfoData] = useState({})
    const [isLoading, setisLoading] = useState(true)

    async function findUserInfo() {
        try {
            setisLoading(true)
            console.log('getting user data ...');
            const token = await AsyncStorage.getItem("doctorToken");
            const body = {
                _id: user_id
            }
            const config = {
                headers: {
                    'auth-token': token,
                }
            }

            const res = await axios.post(`${API_URL}/user/fetchuserdetails`, body, config)
            console.log('userInfo---->', res.data);
            // After updating permission, fetch all files again
            setuserInfoData(res.data)
            setisLoading(false)
        } catch (error) {
            console.log(error.response.data);
        }
    }
    useEffect(() => {
        findUserInfo()
    }, [])

    return (
        <>
            {isLoading ? <ActivityIndicator size={'large'} style={{ justifyContent: 'center', alignItems: 'center' }} /> :
                <View style={styles.container}>
                    <ScrollView>
                        {/* Header */}
                        <View style={styles.header}>
                            <Header leftIconName header={'Patient Profile'} titleMargin={30} />
                        </View>
                        {/* Main Content */}
                        <View style={styles.content}>
                            <View style={styles.UserData} onPress={() => navigate('PatientInfo')}>
                                <View>
                                    <FontAwesome name="user-circle" color='lightgray' size={100} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 22, color: 'black', fontWeight: '600' }}>{userInfoData.name}</Text>
                                    <Text>{userInfoData.email}</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                        <Ionicons name="call" color='blue' size={15} />
                                        <Text style={{ color: 'blue', marginBottom: 2 }}> +91-9145833375</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Entypo name="location-pin" color='lightgray' size={25} />
                                        <Text style={{ marginTop: 4 }}>800m Away</Text>
                                    </View>
                                </View>
                            </View>
                            {/* About Section Done */}
                            <Text style={{ color: 'black', fontSize: 20, fontWeight: '500', paddingHorizontal: 20 }}>About</Text>
                            <Text style={{ paddingHorizontal: 20 }}>{userInfoData.name}, 21, avid runner, maintains balanced diet, active lifestyle.
                            </Text>

                            <View style={{ padding: 3, marginTop: 50, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('SymptompAnalyzer')}
                                        style={{ borderColor: colorTheme.borderColor, width: '100%', marginBottom: 10, borderWidth: 1, borderRadius: 20, marginTop: 5, }}>
                                        <LottieView
                                            source={require('../../assets/json/doc/symptomp.json')}
                                            autoPlay
                                            loop
                                            style={{ width: 150, height: 150 }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={[styles.smallText, { textAlign: 'center', fontWeight: '500', color: 'black', fontSize: 16 }]}>Symptom Analyzer</Text>
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('AdvancedAnalyzer')}
                                        style={{ borderColor: colorTheme.borderColor, width: '100%', marginBottom: 10, borderWidth: 1, borderRadius: 20, marginTop: 5, }}>
                                        <LottieView
                                            source={require('../../assets/json/doc/advanced.json')}
                                            autoPlay
                                            loop
                                            style={{ width: 150, height: 150 }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={[styles.smallText, { textAlign: 'center', fontWeight: '500', color: 'black', fontSize: 16 }]}>Advance Analyzer</Text>
                                </View>
                            </View>
                            <View style={{ padding: 3, marginTop: 20, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('PatientDocument',{user_id:user_id})}
                                        style={{ borderColor: colorTheme.borderColor, width: '100%', marginBottom: 10, borderWidth: 1, borderRadius: 20, marginTop: 5, }}>
                                        <LottieView
                                            source={require('../../assets/json/doc/download.json')}
                                            autoPlay
                                            loop
                                            style={{ width: 150, height: 150 }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={[styles.smallText, { textAlign: 'center', fontWeight: '500', color: 'black', fontSize: 16 }]}>Download Document</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorTheme.appBackGroundColor,
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 5
    },
    content: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
    },
    footer: {
        padding: 10,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
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
        padding: 7,
        borderWidth: 1,
        borderColor: "#d3d2d6",
        height: 200,
        textAlignVertical: 'top',
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: colorTheme.primaryColor
    },
    UserData: {
        padding: 15,
        borderRadius: 15,
        gap: 50,
        flexDirection: 'row',
        // marginBottom: 5,
        justifyContent: 'space-around',
        borderWidth:1,
        borderColor:colorTheme.borderColor,
    }
});

export default DoctorAppointmentDetailScreen;