import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {  blackText, blueText, grayText, colorTheme } from '../../constant'
import Header from '../../components/Header'
import RadioButton from '../../components/RadioButton'

export default function CancelBooking() {
    const [selected, setselected] = useState(null)
    const reasons = ["Schedule Change", "Weather Condition", "Unexpected Work", "ChildCare Issue", "Travel Delays", "Other"]

    const handlePress = (value) => {
        setselected(value === selected ? null : value)
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.subContainer}>
                <Header header={"Cancel Booking"} leftIconName marginTop={10} titleMargin={15} />
                <Text style={[styles.smallText, { marginTop: 20 }]}>Please select the reason for cancellations</Text>
                {reasons.map((reason, index) => {
                    return (
                        <View style={{ flexDirection: "row", marginTop: 20 }}>
                            <TouchableOpacity
                                style={{}}
                                onPress={() => { handlePress(reason) }}
                            >
                                <RadioButton selected={reason===selected} />
                            </TouchableOpacity>
                            <Text style={[styles.bigText, { marginLeft: 10 }]}>{reason}</Text>
                        </View>
                    )
                })}
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
                // onPress={() => navigation.navigate('PaymentMethod')}
                >
                    <Text style={[styles.smallText, { color: "white", alignSelf: 'center' }]}>Cancel Appointment</Text>
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
        borderRadius: 10,
        backgroundColor: "white",
        padding: 7,
        borderWidth: 1,
        borderColor: "#d3d2d6",
        height: 200,
        textAlignVertical: 'top',
    },
})