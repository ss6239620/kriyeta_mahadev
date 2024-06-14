import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colorTheme, blackText, blueText, grayText } from '../../constant'
import LottieView from 'lottie-react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/actions/auth'

export default function Template({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = useSelector((state) => state.auth);
    const { errorMessageLogin } = auth
    const dispatch = useDispatch();

    async function handleClick(params) {
        dispatch(login(email, password))
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.subContainer}>
                <LottieView source={require("../../assets/json/log_in.json")} autoPlay loop style={{ height: 200, }} />
                <Text style={[styles.smallText, { textAlign: 'center', marginTop: 50, fontSize: 16, fontWeight: '300', color: 'black', marginBottom: 15 }]}>Login to your account</Text>
                <View style={{ flexDirection: "row", backgroundColor: "white", borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 10, marginBottom: 10 }}>
                    <View
                        style={{ backgroundColor: colorTheme.primaryColor, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons size={25} name={"account"} color={"white"} style={{ margin: 10 }} />
                    </View>
                    <TextInput
                        placeholder='email'
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        style={{ height: 48, width: "85%" }}
                    />
                </View>
                <View style={{ flexDirection: "row", backgroundColor: "white", borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 10, marginBottom: 5 }}>
                    <View
                        style={{ backgroundColor: colorTheme.primaryColor, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons size={25} name={"lock"} color={"white"} style={{ margin: 10 }} />
                    </View>
                    <TextInput
                        placeholder='Password'
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        style={{ height: 48, width: "85%" }}
                    />
                </View>
                <Text
                onPress={()=>{navigation.navigate('ForgetPassword')}}
                 style={[styles.smallText, { color: colorTheme.primaryColor, textAlign: 'right', marginBottom: 10 }]}>Forgot Password?</Text>
                {errorMessageLogin &&
                    <Text style={[styles.smallText, { color: 'red', textAlign: 'center', marginBottom: 10 }]}>{errorMessageLogin}</Text>
                }
                <TouchableOpacity
                    style={{ backgroundColor: colorTheme.primaryColor, borderRadius: 10, justifyContent: 'center', alignItems: "center" }}
                    onPress={() => handleClick()}
                >
                    <Text style={[styles.smallText, { color: "white", margin: 14 }]}>Login</Text>
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{ borderWidth: 1, borderColor: colorTheme.primaryColor, height: 2, width: 50, }} />
                        <Text style={[styles.smallText, { marginLeft: 10, marginRight: 10 }]}>Or Login With</Text>
                        <View style={{ borderWidth: 1, borderColor: colorTheme.primaryColor, height: 2, width: 50, }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 30, }}>
                    <TouchableOpacity onPress={() => { }} style={{ width: 60, height: 60, elevation: 1.5, backgroundColor: "white", borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/img/google.png')} resizeMode='contain' style={styles.image} />
                    </TouchableOpacity>
                    <View style={{ width: 60, height: 60, elevation: 1.5, backgroundColor: "white", borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/img/facebook.png')} resizeMode='contain' style={styles.image} />
                    </View>
                    <View style={{ width: 60, height: 60, elevation: 1.5, backgroundColor: "white", borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../assets/img/twitter.png')} resizeMode='contain' style={styles.image} />
                    </View>
                </View>
                <Text style={[styles.smallText, { textAlign: "center", marginTop: 10, }]}>
                    Don't have an account? <Text onPress={() => { navigation.navigate('SignUp') }} style={[styles.smallText, { color: colorTheme.primaryColor }]}>Sign Up</Text>
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.appBackGroundColor,
        paddingTop:20
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
        // backgroundColor:"red",
        width: "86%"
    },
    image: {
        width: 40,
        height: 40
    },
})