import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { blackText, blueText, colorTheme, grayText } from '../../constant'
import Header from '../../components/Header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import RadioButton from '../../components/RadioButton'
import { appointmentServices } from '../../services/Appointment'

function SelectPackage({packageTitle,icon,packagedesc,price}) {
    const [onClickRadio, setonClickRadio] = useState(false)
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 3, backgroundColor: "white", borderRadius: 10, marginTop: 15, marginBottom: 5 }}>
            <View style={{ flexDirection: "row", margin: 10,width:"50%" }}>
                <View style={{ width: 50, height: 50, backgroundColor: colorTheme.iconBackGroundColor, justifyContent: "center", alignItems: "center", borderRadius: 50, marginRight: 5 }}>
                    <MaterialIcons name={icon} color={colorTheme.primaryColor} size={30} />
                </View>
                <View style={{ justifyContent: "center", alignItems: "flex-start",flex:1,flexWrap:'wrap' }}>
                    <Text style={[styles.smallText, { fontSize: 16, color: "black" }]}>{packageTitle}</Text>
                    <Text >{packagedesc}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", margin: 10 }}>
                <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
                    <Text style={[styles.smallText, { fontSize: 16, color: "black" }]}>${price}</Text>
                    <Text style={styles.smallText}>/30 minutes</Text>
                </View>
                <TouchableOpacity
                    onPress={() => { onClickRadio ? setonClickRadio(false) : setonClickRadio(true) }}
                    style={{ alignItems: "center", justifyContent: "center", marginLeft: 5 }}
                >
                    <RadioButton selected={onClickRadio} />
                </TouchableOpacity>
            </View>
            <View>
            </View>
        </View>
    )
}

export default function SelectAppointmentPackage({navigation}) {
    function handleNext(params) {
        appointmentServices.BookAppointment()
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.subContainer}>
                    <Header header={"Select Package"} leftIconName titleMargin={30} />
                    <Text style={[styles.bigText, { marginTop: 25 }]}>Select Duration</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 1, backgroundColor: "white", borderColor: colorTheme.borderColor, borderWidth: 1, height: 45, borderRadius: 10, marginTop: 15 }}>
                        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <MaterialIcons name={"watch-later"} size={25} color={colorTheme.primaryColor} style={{ marginLeft: 10 }} />
                            <Text style={[styles.grayText, { marginLeft: 5 }]}>30 Minutes</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-down" color={colorTheme.primaryColor} size={35} style={{}} />
                    </View>
                    <Text style={[styles.bigText, { marginTop: 25 }]}>Select Package</Text>
                    <SelectPackage packageTitle={"Free Doctor Consultion"} packagedesc={"Chat With Doctor"} price={'0'} icon={"message"}/>
                    <SelectPackage packageTitle={"Messaging"} packagedesc={"Chat With Doctor"} price={"20"} icon={"message"}/>
                    <SelectPackage packageTitle={"Voice Call"} packagedesc={"Voice Call With Doctor"} price={"50"} icon={"wifi-calling-3"}/>
                    <SelectPackage packageTitle={"Video Call"} packagedesc={"Video Call With DIrector"} price={"100"} icon={"video-call"}/>
                    <SelectPackage packageTitle={"In Person"} packagedesc={"In Person Visit With DIrector"} price={"150"} icon={"person"}/>
                </View>
            </ScrollView>
            <View style={{
                width: "100%",
                height: 70,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                elevation: 1,
                // backgroundColor:'white',
                justifyContent: "center",
                alignItems: "center"
            }}>
                <TouchableOpacity
                    style={{ backgroundColor: blueText.color, width: "90%", height: 40, borderRadius: 50, justifyContent: "center" }}
                onPress={() => handleNext()}
                >
                    <Text style={[styles.smallText, { color: "white", alignSelf: 'center' }]}>Next</Text>
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
        alignSelf: "center"
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