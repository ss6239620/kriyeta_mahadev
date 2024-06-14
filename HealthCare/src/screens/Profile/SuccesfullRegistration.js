import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { colorTheme, blackText, blueText, grayText } from '../../constant'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'


export default function SuccessFullRegistration() {
    const navigation=useNavigation()
    useEffect(() => {
        setTimeout(() => {
          navigation.navigate("BottomTab")
        }, 1000);
      }, [])
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../../assets/json/success.json')}
                autoPlay
                loop
                style={{ width: 400, height: 400 }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.appBackGroundColor,
        alignItems: 'center',
        justifyContent: 'center'
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