import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native'
import { colorTheme } from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {
  useEffect(() => {
    setTimeout(async () => {
      const usertoken = await AsyncStorage.getItem("userToken");
      const docToken = await AsyncStorage.getItem("doctorToken");
      const doctor = await AsyncStorage.getItem("isDoctor");

      // const isDoctor = JSON.parse(doctor)
      usertoken ?
        navigation.navigate('BottomTab')
        :
        docToken ?
          navigation.navigate('DoctorHome')
          :navigation.navigate('GetStarted')
    }, 4000);
  }, [])

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/json/doctor.json')}
        autoPlay
        loop
        style={{ width: 150, height: 150 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.appBackGroundColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
})