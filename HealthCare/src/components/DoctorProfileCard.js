import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { blackText, blueText, color, colorTheme, grayText } from '../constant'

export default function DoctorProfileCard({ isHeartTrue, onUpdate, isHeartRequire, isButtonRequire, data }) {
    // console.log(likes);
    const [like, setLike] = useState(isHeartTrue)
    const handleUnlike = () => {
        setLike(false)
        onUpdate ?
            onUpdate(true)
            : null
    }
    return (
        // <View style={[styles.subContainer, { elevation: 2, borderRadius: 20 }]}>
        <View style={{ padding: 10 }}>
            <View style={{ margin: 15, flexDirection: "row", height: 100, justifyContent: 'center', alignItems: "center", }}>
                {!data.image === null ?
                    <Image source={data.image} resizeMode='contain' style={styles.image} />
                    :
                    <Image source={require('../assets/img/DocData/d4.jpeg')} resizeMode='contain' style={styles.image} />
                }
                <View style={{ width: "60%", marginLeft: 16, height: 100 }}>
                    <Text style={styles.bigText}>{data.name}</Text>
                    <Text style={[styles.smallText, { marginTop: 1 }]}>DenTist</Text>
                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 5 }}>
                        <MaterialIcons name="location-pin" color={colorTheme.primaryColor} size={25} />
                        <Text style={styles.smallText}>New York,USA</Text>
                    </View>
                    <Pressable style={{ marginTop: 5, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }} onPress={() => { like ? handleUnlike() : setLike(true) }}>
                        <View style={{ flexDirection: 'row' }}>
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <View style={{}} key={index}>
                                    <MaterialCommunityIcons name={"star"} size={20} color={"#EF802F"} />
                                </View>
                            ))}
                            <Text>4.5</Text>
                        </View>
                        {isHeartRequire ?
                            <MaterialCommunityIcons name={like ? "heart" : "heart-outline"} color={like ? "red" : "#5a585e"} size={30} />
                            : null}
                    </Pressable>
                </View>
            </View>
            {isButtonRequire ?
                <View style={{ backgroundColor: colorTheme.iconWithBlueBackGround, borderRadius: 10, marginTop: 10 }}>
                    <Text style={[, { textAlign: 'center', padding: 12 }]}>Make Appointment</Text>
                </View>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    subContainer: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: "white",
        marginTop: 20
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "red"
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