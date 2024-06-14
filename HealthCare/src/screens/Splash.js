import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native'
import { colorTheme } from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ navigation }) {
  useEffect(() => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem("userToken");
      const doctor = await AsyncStorage.getItem("isDoctor");
      const isDoctor = JSON.parse(doctor)
      token ?
        isDoctor.isdoctor ?
          navigation.navigate('DoctorHome')
          :
          navigation.navigate('BottomTab')
        :
        navigation.navigate("GetStarted")
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