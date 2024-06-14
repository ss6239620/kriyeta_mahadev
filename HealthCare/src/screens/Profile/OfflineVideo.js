import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { blackText, blueText, colorTheme, grayText } from '../../constant';
import Header from '../../components/Header';
import Video from 'react-native-video';
import { useState } from 'react';

const MyComponent = () => {
    const [video1, setvideo1] = useState(true)
    const [video2, setvideo2] = useState(true)
    const [video3, setvideo3] = useState(true)
    const [video4, setvideo4] = useState(true)
    return (
        // <Video  
        //     source={require('../../assets/videos/test.mp4')}                  // the video file
        //     paused={false}                  // make it start    
        //     style={styles.video}  // any style you want
        //     repeat={true}                   // make it a loop
        // />
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Header leftIconName header={'Offline Videos'} titleMargin={30} />
            </View>
            {/* Main Content */}
            <ScrollView style={styles.content}>
                <Pressable
                    onPress={() => video1 ? setvideo1(false) : setvideo1(true)}
                    style={{ marginTop: 20 }}>
                    <Video
                        source={require('../../assets/videos/cpr1.mp4')}                  // the video file
                        paused={video1}                  // make it start    
                        style={styles.video}  // any style you want
                        repeat={true}
                        resizeMode="contain"
                    />
                    <Text style={[styles.bigText]}>Openchest CPR</Text>
                </Pressable>
                <Pressable
                    onPress={() => video2 ? setvideo2(false) : setvideo2(true)}

                    style={{ marginTop: 20 }}>
                    <Video
                        source={require('../../assets/videos/firstaid.mp4')}                  // the video file
                        paused={video2}                  // make it start    
                        style={styles.video}  // any style you want
                        repeat={true}
                        resizeMode="contain"
                    />
                    <Text style={[styles.bigText]}>FirstAidMedthod</Text>
                </Pressable>
                <Pressable
                    onPress={() => video3 ? setvideo3(false) : setvideo3(true)}

                    style={{ marginTop: 20 }}>
                    <Video
                        source={require('../../assets/videos/cpr3.mp4')}                  // the video file
                        paused={true}                  // make it start    
                        style={styles.video}  // any style you want
                        repeat={true}
                        resizeMode="contain"
                    />
                    <Text style={[styles.bigText]}>Infant CPR</Text>
                </Pressable>
                <Pressable
                    onPress={() => video4 ? setvideo4(false) : setvideo4(true)}

                    style={{ marginTop: 20 }}>
                    <Video
                        source={require('../../assets/videos/cpr2.mp4')}                  // the video file
                        paused={true}                  // make it start    
                        style={styles.video}  // any style you want
                        repeat={true}
                        resizeMode="contain"
                    />
                    <Text style={[styles.bigText]}>Child CPR</Text>
                </Pressable>
            </ScrollView>
            {/* Footer */}

        </View>
    )
}
const styles = StyleSheet.create({
    video: {
        height: 200,
        width: '100%',
        borderRadius: 25,
    },
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
        // marginTop: 30
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
})


export default MyComponent