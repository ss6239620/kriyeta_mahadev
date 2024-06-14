import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colorTheme, blackText, blueText, grayText } from '../../constant'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function Blogs() {
    const [search, setsearch] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                    <MaterialIcons name={"cancel"} color={'black'} size={35} />
                    <View style={{ backgroundColor: colorTheme.primaryColor, borderRadius: 25, alignItems: 'center' }}>
                        <Text style={[styles.smallText, { fontSize: 17, fontWeight: 'normal', color: 'white', paddingHorizontal: 10, paddingVertical: 5 }]}>Next</Text>
                    </View>
                </View>
                <View style={styles.textInput}>
                    <TextInput
                        placeholder='Title'
                        onChangeText={(text) => setsearch(text)}
                        value={search}
                        multiline
                        style={{ width: "92%" }}
                    />
                </View>
                <View style={[styles.textInput,{marginTop:15}]}>
                <TextInput
                    placeholder='body text'
                    onChangeText={(text) => setsearch(text)}
                    value={search}
                    style={{ width: "92%" }}
                />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.appBackGroundColor
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
        borderRadius: 5,
        backgroundColor: "white",
        // padding: 7,
        borderWidth: 0.2,
        borderColor: "#d3d2d6",
        // height: 200,
        textAlignVertical: 'top',
        alignItems: 'center',
        marginTop: 30
    },
})