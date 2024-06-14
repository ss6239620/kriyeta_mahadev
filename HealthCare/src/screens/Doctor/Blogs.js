import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { blackText, blueText, colorTheme, grayText } from '../../constant';
import Header from '../../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { BlogServices } from '../../services/BlogsServices';

const icon=["link","image","play-circle-outline","poll"]

const App = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    function handleNext(){
        BlogServices.PostBlog(title,body)
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Header leftIconName header={'Blogs'} titleMargin={30} />
            </View>
            {/* Main Content */}
            <View style={styles.content}>
                <View style={styles.textInput}>
                    <TextInput
                        placeholder='Title'
                        onChangeText={(text) => setTitle(text)}
                        value={title}
                        multiline
                        style={{ width: "92%" }}
                    />
                </View>
                <View style={[styles.textInput, { marginTop: 15, }]}>
                    <TextInput
                        placeholder='body text'
                        onChangeText={(text) => setBody(text)}
                        value={body}
                        style={{ width: "92%" }}
                        multiline
                    />
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',width:'60%' }}>
                        {icon.map((_, index) => (
                            <MaterialIcons name={_} color={'black'} size={30} key={index} />
                        ))}
                    </View>
                    <TouchableOpacity 
                    onPress={()=>{handleNext()}}
                    style={{ backgroundColor: colorTheme.primaryColor, borderRadius: 25, alignItems: 'center' }}>
                        <Text style={[styles.smallText, { fontSize: 17, fontWeight: 'normal', color: 'white', paddingHorizontal: 10, paddingVertical: 5 }]}>Next</Text>
                    </TouchableOpacity>
                </View>
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
        marginBottom:5,
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
