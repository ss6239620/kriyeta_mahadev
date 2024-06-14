import { Image, ImageBackground, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colorTheme, blackText, blueText, grayText } from '../../constant'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {mediaDevices} from 'react-native-webrtc'

const VideoCall = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </View> */}

      {/* Main Content */}
      <ImageBackground source={require('../../assets/img/Doctor.jpg')} style={styles.backGroundImage}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
          <View style={{ backgroundColor: "white", borderRadius: 50, width: 60, height: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'red', width: 10, height: 10, borderRadius: 10, marginRight: 5 }} />
            <Text>Live</Text>
          </View>
          <Image source={require('../../assets/img/Doctor.jpg')} resizeMode='cover' style={{ width: 100, height: 140, borderRadius: 10 }} />
        </View>
      </ImageBackground>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={{ padding: 10, backgroundColor: colorTheme.iconWithBlueBackGround, elevation: 2, borderRadius: 10 }}>
          <MaterialCommunityIcons name={"volume-high"} size={25} color={"white"} />
        </View>
        <View style={{ padding: 10, backgroundColor: colorTheme.iconWithBlueBackGround, elevation: 2, borderRadius: 10 }}>
          <MaterialCommunityIcons name={"microphone-off"} size={25} color={"white"} />
        </View>
        <View style={{ padding: 18, backgroundColor: "#fa2f55", elevation: 2, borderRadius: 50 }}>
          <MaterialCommunityIcons name={"phone-hangup"} size={25} color={"white"} />
        </View>
        <View style={{ padding: 10, backgroundColor: colorTheme.iconWithBlueBackGround, elevation: 2, borderRadius: 10 }}>
          <MaterialCommunityIcons name={"chat-plus"} size={25} color={"white"} />
        </View>
        <View style={{ padding: 10, backgroundColor: colorTheme.iconWithBlueBackGround, elevation: 2, borderRadius: 10 }}>
          <MaterialCommunityIcons name={"video-off"} size={25} color={"white"} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: 'lightblue',
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: colorTheme.primaryColor,
    alignItems: 'center',
    padding: 10,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backGroundImage: {
    flex: 1,
    resizeMode: 'contain'
  }
});

export default VideoCall;
