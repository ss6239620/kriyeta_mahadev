import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {  blackText, blueText, grayText, colorTheme } from '../../constant'
import DoctorProfileCard from '../../components/DoctorProfileCard'
import Header from '../../components/Header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import RadioButton from '../../components/RadioButton'


const scheduleAppointMent = [
    {
        title: "Date",
        subTitle: "August 24, 2023"
    },
    {
        title: "Time",
        subTitle: "10:00 - 10:30 (30 minutes)"
    },
    {
        title: "Booking For",
        subTitle: "self"
    }
]

const paitientInfo = [
    {
        title: "Full Name",
        subTitle: "John Doe"
    },
    {
        title: "Age",
        subTitle: "27"
    },
    {
        title: "Gender",
        subTitle: "Male"
    },
    {
        title: "Problem",
        subTitle: "Lorem ipsum dolor "
    }
]

function SelectPackage({ packageTitle, icon, packagedesc, price, radioRequire }) {
    const [onClickRadio, setonClickRadio] = useState(false)
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 3, backgroundColor: "white", borderRadius: 10, marginTop: 15, marginBottom: 5 }}>
            <View style={{ flexDirection: "row", margin: 10, width: "50%" }}>
                <View style={{ width: 50, height: 50, backgroundColor: colorTheme.iconBackGroundColor, justifyContent: "center", alignItems: "center", borderRadius: 50, marginRight: 5 }}>
                    <MaterialIcons name={icon} color={colorTheme.primaryColor} size={30} />
                </View>
                <View style={{ justifyContent: "center", alignItems: "flex-start", flex: 1, flexWrap: 'wrap' }}>
                    <Text style={[styles.smallText, { fontSize: 16, color: "black" }]}>{packageTitle}</Text>
                    <Text >{packagedesc}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", margin: 10 }}>
                <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
                    <Text style={[styles.smallText, { fontSize: 16, color: "black" }]}>${price}</Text>
                    <Text style={[styles.smallText, { color: "green" }]}>Paid</Text>
                </View>
            </View>
            {radioRequire ?
                <TouchableOpacity
                    onPress={() => { onClickRadio ? setonClickRadio(false) : setonClickRadio(true) }}
                    style={{ alignItems: "center", justifyContent: "center", marginLeft: 5 }}
                >
                    <RadioButton selected={onClickRadio} />
                </TouchableOpacity>
                : null}
            <View>
            </View>
        </View>
    )
}

function GridInformationCard({ data }) {
    return (
        <View style={{ marginTop: 5 }}>
            {
                data.map((_, index) => {
                    return (
                        <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                            <Text style={styles.smallText}>{_.title}</Text>
                            <Text style={[styles.bigText, { fontSize: 14 }]}>{_.subTitle}</Text>
                        </View>
                    )
                })
            }
        </View>

    )
}

function ServiceModal({ modalVisible, setModalVisible }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Location Closed');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Pressable
                        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <MaterialIcons name="keyboard-arrow-down" color={colorTheme.primaryColor} size={35} style={{ marginRight: 10 }} />
                        <Text style={styles.bigText}>Select Location</Text>
                    </Pressable>
                    <View style={{ marginTop: 30 }}>
                        <SelectPackage packageTitle={"Messaging"} packagedesc={"Chat With Doctor"} price={"20"} icon={"message"} radioRequire />
                        <SelectPackage packageTitle={"Voice Call"} packagedesc={"Voice Call With Doctor"} price={"50"} icon={"wifi-calling-3"} radioRequire />
                        <SelectPackage packageTitle={"Video Call"} packagedesc={"Video Call With DIrector"} price={"100"} icon={"video-call"} radioRequire />
                        <SelectPackage packageTitle={"In Person"} packagedesc={"In Person Visit With DIrector"} price={"150"} icon={"person"} radioRequire />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default function RescheduledAppointment() {
    const [search, setSearch] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            {
                modalVisible?
                <ServiceModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                :null
            }
            <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
                <Header header={"Reschedule Appointment"} leftIconName marginTop={15} titleMargin={-30} />
                <View style={{ elevation: 3, backgroundColor: "white", borderRadius: 10 }}>
                    <DoctorProfileCard />
                </View>
                <Text style={[styles.bigText, { marginTop: 40 }]}>Scheduled Appointment</Text>
                <GridInformationCard data={scheduleAppointMent} />
                <Text style={[styles.bigText, { marginTop: 40 }]}>Patient Information</Text>
                <GridInformationCard data={paitientInfo} />
                <Text style={[styles.bigText, { marginTop: 40 }]}>Service Information</Text>
                <SelectPackage packageTitle={"In Person"} packagedesc={"In Person Visit With DIrector"} price={"150"} icon={"person"} />
                <Text style={[styles.bigText, { marginTop: 20 }]}>Change Service</Text>
                <Pressable 
                style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 1, backgroundColor: "white", borderColor: colorTheme.borderColor, borderWidth: 1, height: 45, borderRadius: 10, marginTop: 5 }}
                onPress={()=>{setModalVisible(true)}}
                >
                    <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                        <MaterialIcons name={"watch-later"} size={25} color={colorTheme.primaryColor} style={{ marginLeft: 10 }} />
                        <Text style={[styles.grayText, { marginLeft: 5 }]}>30 Minutes</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-down" color={colorTheme.primaryColor} size={35} style={{}} />
                </Pressable>
                <Text style={[styles.bigText, { marginTop: 20 }]}>Reschedule Time</Text>
                <View style={styles.textInput}>
                    <MaterialIcons name="access-time" color={colorTheme.primaryColor} size={25} />
                    <TextInput
                        placeholder='10:00 AM'
                        onChangeText={(text) => setSearch(text)}
                        value={search}
                        style={{ height: 48, width: "92%" }}
                    />
                </View>
            </ScrollView>
            <View style={{
                width: "100%",
                height: 70,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                elevation: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <TouchableOpacity
                    style={{ backgroundColor: blueText.color, width: "90%", height: 40, borderRadius: 50, justifyContent: "center" }}
                // onPress={() => navigation.navigate('PaymentMethod')}
                >
                    <Text style={[styles.smallText, { color: "white", alignSelf: 'center' }]}>Confirm</Text>
                </TouchableOpacity>
            </View>
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
        // width: "80%",
        height: 48,
        borderRadius: 10,
        backgroundColor: "white",
        padding: 7,
        borderWidth: 1,
        borderColor: colorTheme.borderColor,
        flexDirection: "row",
        // justifyContent:"center",
        alignItems: "center"
    },
})