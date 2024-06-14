import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { colorTheme, blackText, blueText, grayText } from '../../constant'
import LottieView from 'lottie-react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StackActions, useNavigation } from '@react-navigation/native'


export default function Template({  }) {
    const navigation=useNavigation()
    
    return (
        <View style={styles.container}>
            <View style={styles.bubble2}></View>
            <View style={styles.bubble3}></View>
            <View style={styles.subContainer}>
                <TouchableOpacity onPress={()=>{navigation.navigate('BottomTab')}} style={{ width: 50, height: 30, backgroundColor: "white", justifyContent: "center", alignItems: 'center', borderRadius: 50, borderWidth: 1, borderColor: colorTheme.borderColor, alignSelf: 'flex-end' }}>
                    <Text style={[styles.smallText, { color: colorTheme.primaryColor, fontWeight: 'bold', fontSize: 15 }]}>Skip</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.subContainer}>
                <LottieView source={require("../../assets/json/signup.json")} autoPlay loop style={{ width: 360, height: 350, }} />
            </View>
            <View style={styles.subContainer}>

                <View style={{ alignItems: "center", margin: 10 }}>
                    <Text style={styles.bigText}>We Take Care Of Your Health</Text>
                    <Text style={styles.smallText}>Through care and expertise, healthcare shapes destinies, fostering wellness and resilience for humanity's journey.</Text>
                </View>
            </View>
            <View style={styles.subContainer}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('LoginChoice') }}
                    style={{ backgroundColor: colorTheme.primaryColor, width: 60, height: 60, borderRadius: 50, elevation: 2, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons size={40} name={"arrow-right-thick"} color={"white"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.appBackGroundColor,
        justifyContent: "space-around",
        alignItems: "center"
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
        fontWeight: grayText.fontWeight,
        textAlign: "center"
    },
    blueText: {
        fontSize: blueText.fontSize,
        color: blueText.color,
        fontWeight: blueText.fontWeight,
        textAlign: "center"
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
    bubble2: {
        width: 150,
        height: 150,
        backgroundColor: colorTheme.primaryColor,
        borderRadius: 250,
        position: 'absolute',
        top: "10%",
        right: "-15%",
    },
    bubble3: {
        width: 350,
        height: 350,
        backgroundColor: colorTheme.primaryColor,
        borderRadius: 550,
        position: 'absolute',
        bottom: "-30%",
        left: "-40%",
    },
})