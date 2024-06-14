import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import UnderLine from './UnderLine'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { blackText, blueText, colorTheme, grayText } from '../constant'
import { useNavigation } from '@react-navigation/native'

export default function HospitalProfileCard({ isNavigate, isHeartTrue }) {
    const [like, setlike] = useState(isHeartTrue)
    const navigation = useNavigation()
    return (
        <Pressable style={styles.subContainer} onPress={(() => isNavigate ? navigation.navigate('Hospital') : null)}>
            <ImageBackground source={require('../assets/img/hospital.jpg')} resizeMode='cover' style={{ flex: 1, height: 150 }} borderTopLeftRadius={30} borderTopRightRadius={30}>
                <View style={{ backgroundColor: 'white', borderRadius: 50, width: '50%', position: 'absolute', bottom: 10, right: 10, paddingHorizontal: 10, paddingVertical: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <MaterialCommunityIcons name={"star"} size={20} color={"#EF802F"} />
                        <Text style={[styles.smallText, { color: 'black', marginRight: 5 }]}>4.5</Text>
                        <Text style={[styles.smallText, { color: 'black' }]}>(1K+ Reviews)</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', position: 'absolute', top: 15, right: 15, borderRadius: 30 }}>
                    <MaterialCommunityIcons name={like ? "cards-heart" : 'cards-heart-outline'} size={25} color={"#EF802F"} style={{ padding: 5 }} onPress={() => { like ? setlike(false) : setlike(true) }} />
                </View>
            </ImageBackground>
            <View style={{ padding: 10, borderWidth: 0.5, borderColor: colorTheme.borderColor, borderBottomEndRadius: 15, borderBottomLeftRadius: 15 }}>
                <Text style={styles.bigText}>Serenity Wellness Clinic</Text>
                <Text style={[styles.smallText, { color: 'black', fontSize: 13 }]}>Dentist, Skin Care</Text>
                <UnderLine marginTop={10} />
                <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name={"location-on"} size={20} color={colorTheme.primaryColor} />
                    <Text style={[styles.smallText, { color: 'black', fontSize: 13 }]}>8502 Preston Rd, Inglewood, Maine 98380</Text>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name={"watch-later"} size={20} color={colorTheme.primaryColor} />
                    <Text style={[styles.smallText, { color: 'black', fontSize: 13 }]}>15 min</Text>
                    <View style={{ width: 5, height: 5, marginHorizontal: 5, backgroundColor: "gray", borderRadius: 5 }} />
                    <Text style={[styles.smallText, { color: 'black', fontSize: 13 }]}>1.5Km</Text>
                </View>
            </View>
        </Pressable>
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
        borderWidth: 1,
        borderColor: "#d3d2d6",
        textAlignVertical: 'top',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        width: "90%",
        marginLeft: 15,
        paddingHorizontal: 5

    },
    childrenSTyle: {
        // backgroundColor: 'red',
        flexGrow: 1,
        alignSelf: 'flex-end'
    },
})