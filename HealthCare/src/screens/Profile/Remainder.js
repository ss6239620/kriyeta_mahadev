import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { blackText, blueText, colorTheme, grayText } from '../../constant';
import Header from '../../components/Header';
import AlarmTimeInput from '../../components/TextInputs/AlarmTimeInput';
import { notificationPopUp } from '../../components/NotificationPopUp';

const Remainder = () => {
    const [time, settime] = useState({
        alarm: 0
    })
    const handleTimeChange = (name, value) => {
        settime(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Header leftIconName header={'Remainder'} titleMargin={30} />
            </View>
            {/* Main Content */}
            <View style={styles.content}>
                    <AlarmTimeInput
                        isRequire={false}
                        textInputParams={'alarm'}
                        handleChange={handleTimeChange}
                    />
                    <TouchableOpacity 
                    onPress={()=>notificationPopUp.onDisplayNotification(time.alarm)}
                    style={{padding:15,backgroundColor:colorTheme.primaryColor,borderRadius:10,marginTop:20,alignItems:'center'}}>
                        <Text style={[styles.smallText,{color:'white'}]}>Set Remainder</Text>
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
        justifyContent:'center'
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
        height: 200,
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

export default Remainder;
