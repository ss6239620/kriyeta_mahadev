import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colorTheme, blackText, blueText, grayText } from '../../constant'
import Header from '../../components/Header'
import LottieView from 'lottie-react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { ForgotPassword } from '../../store/actions/auth'


export default function ForgetPassword() {

    const auth = useSelector((state) => state.auth)
    const { errorMessage } = auth

    const [input, setInput] = useState('')
    const [choice, setchoice] = useState(null)
    const dispatch = useDispatch()
    const handleChoice = (option) => {
        setchoice(option === choice ? null : option)
    }
    const handleClick = () => {
        dispatch(ForgotPassword(input))
    }
    const navigation = useNavigation()
    return (
        <ScrollView style={styles.container}>
            <View style={styles.subContainer}>
                <Header header={'Forgot Password'} leftIconName />
                <LottieView source={require("../../assets/json/log_in.json")} autoPlay loop style={{ height: 220, marginTop: 20 }} />
                {!choice ?
                    <View>
                        <Text style={[styles.smallText, { color: 'black', fontSize: 16.5, marginTop: 5 }]}>Select which contact details should we use to reset your password</Text>
                        <TouchableOpacity
                            onPress={() => handleChoice('SMS')}
                            style={{ backgroundColor: 'white', borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 20, marginTop: 20 }}>
                            <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: colorTheme.iconBackGroundColor, borderRadius: 50 }}>
                                    <MaterialCommunityIcons name={'chat-processing'} color={colorTheme.primaryColor} size={30} style={{ padding: 15 }} />
                                </View>
                                <View style={{ justifyContent: 'space-between', marginLeft: 20 }}>
                                    <Text style={[styles.smallText, { fontSize: 12 }]}>via SMS</Text>
                                    <Text style={[styles.smallText, { color: 'black', fontSize: 15.5 }]}>+1 111******99</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleChoice('Email')}
                            style={{ backgroundColor: 'white', borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 20, marginTop: 20 }}>
                            <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: colorTheme.iconBackGroundColor, borderRadius: 50 }}>
                                    <MaterialCommunityIcons name={'email'} color={colorTheme.primaryColor} size={30} style={{ padding: 15 }} />
                                </View>
                                <View style={{ justifyContent: 'space-between', marginLeft: 20 }}>
                                    <Text style={[styles.smallText, { fontSize: 12 }]}>via Email</Text>
                                    <Text style={[styles.smallText, { color: 'black', fontSize: 15.5 }]}>and***lay@yourdomain.com</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        {errorMessage &&
                            <Text style={[styles.smallText, { color: 'red', textAlign: 'center', marginBottom: 10 }]}>{errorMessage}</Text>
                        }
                        <Text style={[styles.smallText, { color: 'black', fontSize: 16.5, marginVertical: 5, textAlign: 'center' }]}>{`Enter Your ${choice === 'Email' ? "Email" : "SMS"} so we could reach you`}</Text>
                        <View style={styles.textInput}>
                            {choice === 'Email' ?
                                <TextInput
                                    placeholder={'Enter Email'}
                                    onChangeText={(text) => setInput(text)}
                                    value={input}
                                    style={{}}
                                    keyboardType={'email-address'}
                                /> :
                                <TextInput
                                    placeholder={'Enter SMS'}
                                    onChangeText={(text) => setInput(text)}
                                    value={input}
                                    style={{}}
                                    keyboardType={'number-pad'}
                                />
                            }
                        </View>
                        <TouchableOpacity
                            onPress={handleClick}
                            style={{ backgroundColor: colorTheme.primaryColor, marginTop: 25, borderRadius: 50, elevation: 5 }}>
                            <Text style={{ padding: 15, textAlign: 'center', color: 'white' }}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.appBackGroundColor,
        padding: 10
    },
    subContainer: {
        // width: "90%",
        height: "auto",
        // alignSelf: "center",
        // padding: 10
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
        textAlignVertical: 'top',
    },
})