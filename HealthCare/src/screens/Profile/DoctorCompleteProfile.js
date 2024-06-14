import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { blackText, blueText, colorTheme, grayText } from '../../constant';
import Header from '../../components/Header';
import { doctorServices } from '../../services/doctorAuth';
import { sendSmsData } from '../../components/SendSMS';

const CompleteProfile = ({ navigation }) => {
    const [uniqueid, setuniqueid] = useState('')
    const [specialization, setspecialization] = useState('')
    const [experience, setexperience] = useState('')
    const [yrofgraduatio, setyrofgraduatio] = useState('')
    const [type, settype] = useState('')
    const [loaction, setloaction] = useState('')
    const [about, setabout] = useState('')
    const [fees, setfees] = useState('')
    const [govno, setgovno] = useState('')
    const [phone, setPhone] = useState('')

    function generateRandom4DigitNumber() {
        // Generate a random number between 1000 and 9999 (inclusive)
        return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    }

    function handleUpdate(params) {
        doctorServices.ProfileComplete(uniqueid, specialization, experience, yrofgraduatio, type, loaction, about, fees, govno, phone).then(() => {
            const random4DigitNumber = generateRandom4DigitNumber();
            console.log(random4DigitNumber);
            const SMSDATA = [
                {
                    phone: `${phone}`,
                    msg: `Your Otp for registration is ${random4DigitNumber}`
                },
            ]
            sendSmsData(SMSDATA)
            navigation.navigate('VerifyAccount', { verify: random4DigitNumber })
        })
    }
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Header leftIconName header={'Complete Your Profile'} titleMargin={30} />

            </View>
            {/* Main Content */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Registration No.</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder='A36hh'
                            onChangeText={(text) => setuniqueid(text)}
                            value={uniqueid}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>specialization</Text>
                    <View style={[styles.textInput,]}>
                        <TextInput
                            placeholder='Heart surgeon'
                            onChangeText={(text) => setspecialization(text)}
                            value={specialization}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>experience</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder='2 years'
                            onChangeText={(text) => setexperience(text)}
                            value={experience}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>year of graduation</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder='2 years'
                            onChangeText={(text) => setyrofgraduatio(text)}
                            value={yrofgraduatio}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Government or private</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder='Government/private'
                            onChangeText={(text) => settype(text)}
                            value={type}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>loaction</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder='Mumbai'
                            onChangeText={(text) => setloaction(text)}
                            value={loaction}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>fees</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder='$70'
                            onChangeText={(text) => setfees(text)}
                            value={fees}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Is government officer?</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder='yes/no'
                            onChangeText={(text) => setgovno(text)}
                            value={govno}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Phone No</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder='+91 771********'
                            onChangeText={(text) => setPhone(text)}
                            value={phone}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>about</Text>
                    <View style={[styles.textInput, { height: 90 }]}>
                        <TextInput
                            placeholder='I am ....'
                            onChangeText={(text) => setabout(text)}
                            value={about}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={{ backgroundColor: blueText.color, padding: 15, width: '100%', borderRadius: 50, justifyContent: "center", }}
                    onPress={() => handleUpdate()}
                >
                    <Text style={[styles.smallText, { color: "white", alignSelf: 'center' }]}>Update Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
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

        // marginTop: 5
    },
    content: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        marginTop: 30
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
        padding: 0,
        borderWidth: 1,
        borderColor: "#d3d2d6",
        // height: 200,
        textAlignVertical: 'top',
    },
    image: {
        width: 115,
        height: 130,
        borderRadius: 25,
        overflow: "hidden",

    },
});

export default CompleteProfile;
