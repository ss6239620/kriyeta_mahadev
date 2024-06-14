import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { blackText, blueText, colorTheme, grayText } from '../../constant';
import Header from '../../components/Header';
import { userServices } from '../../services/userAuth';
import { sendSmsData } from '../../components/SendSMS';

const App = ({ route, navigation }) => {
    const [disease, setdisease] = useState('')
    const [from, setfrom] = useState('')
    const [consultion, setconsultion] = useState('')
    const [isrecovered, setisrecovered] = useState('')

    function generateRandom4DigitNumber() {
        // Generate a random number between 1000 and 9999 (inclusive)
        return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    }



    function handleSubmit(params) {
        userServices.OlddiseaseForm(disease, from, consultion, isrecovered)
        const { phone } = route.params;
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
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Header leftIconName header={'Old Disease'} titleMargin={30} />
            </View>
            {/* Main Content */}
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>disease</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='Fever'
                                onChangeText={(text) => setdisease(text)}
                                value={disease}
                            />
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Date</Text>
                        <View style={[styles.textInput,]}>
                            <TextInput
                                placeholder='11-02-2002'
                                onChangeText={(text) => setfrom(text)}
                                value={from}
                            />
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>consultion from</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='Dr.John Doe'
                                onChangeText={(text) => setconsultion(text)}
                                value={consultion}
                            />
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>isrecovered</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='Yes'
                                onChangeText={(text) => setisrecovered(text)}
                                value={isrecovered}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={{ backgroundColor: blueText.color, padding: 15, width: '100%', borderRadius: 50, justifyContent: "center", }}
                    onPress={() => handleSubmit()}
                >
                    <Text style={[styles.smallText, { color: "white", alignSelf: 'center' }]}>Submit</Text>
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
        marginTop: 5
    },
    content: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
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
        padding: 7,
        borderWidth: 1,
        borderColor: "#d3d2d6",
        // height: 200,
        textAlignVertical: 'top',
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: colorTheme.primaryColor
    },
});

export default App;
