import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { blackText, blueText, colorTheme, grayText } from '../../constant';
import Header from '../../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { userServices } from '../../services/userAuth';

const CompleteProfile = ({ navigation }) => {
    const [gender, setGender] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [age, setage] = useState('')
    const [phone, setPhone] = useState('')

    function handleUpdate(params) {
        userServices.ProfileComplete(bloodGroup, age, gender, phone)
        navigation.navigate('Olddisease', { phone: phone })
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
                {/* Header */}
                <View style={{}}>
                    <ImageBackground
                        source={require('../../assets/img/profile.jpg')}
                        resizeMode="cover"
                        style={{
                            width: '100%', // Set the width to fill the container
                            height: 180,   // Set the height according to your requirement    // Align text horizontally
                            alignItems: 'center',
                        }}
                        borderBottomLeftRadius={50}
                        borderBottomRightRadius={50}
                    >
                        <View style={styles.header}>
                            <Header leftIconName header={'Profile Setup'} titleMargin={30} textColor={'#fff'} />
                            <View style={{ margin: 60, alignSelf: 'center' }}>
                                <Image source={require('../../assets/img/user.jpg')} resizeMode='cover' style={styles.image} />
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                {/* Main Content */}
                <View style={styles.content}>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Bloodgroup</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='AB(positive)'
                                onChangeText={(text) => setBloodGroup(text)}
                                value={bloodGroup}
                            />
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Age</Text>
                        <View style={[styles.textInput,]}>
                            <TextInput
                                placeholder='18+'
                                onChangeText={(text) => setage(text)}
                                value={age}
                            />
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Gender</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='Male'
                                onChangeText={(text) => setGender(text)}
                                value={gender}
                            />
                        </View>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Phone no</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder='7718833...'
                                onChangeText={(text) => setPhone(text)}
                                value={phone}
                            />
                        </View>
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
        marginTop: 80
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
