import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { blackText, blueText, colorTheme, grayText } from '../constant';
import Header from './Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import WebView from 'react-native-webview';

const PatientInfo = ({ navigation, route }) => {
    const data = route.params.data
    return (
        <View style={styles.container}>
            {/* Header */}
                <View style={styles.header}>
                    <Header leftIconName header={'Patient Profile'} titleMargin={30} />
                </View>
                {/* Main Content */}
                <View style={styles.content}>
                    <View style={styles.UserData} onPress={() => navigate('PatientInfo')}>
                        <View>
                            <FontAwesome name="user-circle" color='lightgray' size={100} />
                        </View>
                        <View>
                            <Text style={{ fontSize: 22, color: 'black', fontWeight: '600' }}>{data.name}</Text>
                            <Text>{data.email}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                <Ionicons name="call" color='blue' size={15} />
                                <Text style={{ color: 'blue', marginBottom: 2 }}> +91-9145833375</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Entypo name="location-pin" color='lightgray' size={25} />
                                <Text style={{ marginTop: 4 }}>800m Away</Text>
                            </View>
                        </View>
                    </View>
                    {/* About Section Done */}
                    <Text style={{ color: 'black', fontSize: 20, fontWeight: '500', paddingHorizontal: 20 }}>About</Text>
                    <Text style={{ paddingHorizontal: 20 }}>{data.name}, 21, avid runner, maintains balanced diet, active lifestyle.
                    </Text>
                    {/* About Section Ends */}
                    <WebView
                        source={{ uri: 'https://patienthealthhistorytelehealth.streamlit.app/' }}
                        style={{ marginTop:10}}
                        originWhitelist={['*']}
                        scalesPageToFit={true}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                    />
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
        marginTop: 20
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
    UserData: {
        padding: 15,
        borderRadius: 20,
        gap: 50,
        flexDirection: 'row',
        // marginBottom: 5,
        justifyContent: 'space-around',
        borderWidth:1,
        borderColor:colorTheme.borderColor,
        marginBottom:5
    }
});

export default PatientInfo;