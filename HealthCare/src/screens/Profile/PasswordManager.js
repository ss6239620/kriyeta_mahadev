import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { blackText, blueText, colorTheme, grayText } from '../../constant';
import Header from '../../components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const App = () => {
    const [password, setPassword] = useState('')
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Header leftIconName header={'Your Profile'} titleMargin={30} />
            </View>
            {/* Main Content */}
            <ScrollView style={styles.content}>
                <View style={{ marginBottom: 10, marginTop: 20 }}>
                    <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Current Password</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder='Password'
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry
                        />
                        <MaterialCommunityIcons name={"eye-off"} color={"gray"} size={25} />
                    </View>
                </View>
                <Text style={[styles.smallText, { color: colorTheme.primaryColor, textAlign: 'right' }]}>Forgot Password?</Text>
                <View style={{ marginBottom: 10, marginTop: 20 }}>
                    <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>New Password</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder='Password'
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry
                        />
                        <MaterialCommunityIcons name={"eye-off"} color={"gray"} size={25} />
                    </View>
                </View>
                <View style={{ marginBottom: 10, marginTop: 20 }}>
                    <Text style={[styles.smallText, { color: 'black', marginBottom: 5 }]}>Confirm New Password</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder='Password'
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry
                        />
                        <MaterialCommunityIcons name={"eye-off"} color={"gray"} size={25} />
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={{ backgroundColor: blueText.color, padding: 15, width: '100%', borderRadius: 50, justifyContent: "center", }}
                // onPress={() => navigation.goBack()}
                >
                    <Text style={[styles.smallText, { color: "white", alignSelf: 'center' }]}>Change Password</Text>
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
        alignSelf: 'center'
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
        textAlignVertical: 'top',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 7
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
