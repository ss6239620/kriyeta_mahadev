import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Entypo from 'react-native-vector-icons/Entypo'
import LottieView from 'lottie-react-native'

export default function RejectedDoctorTab({ appointmentData }) {
  const navigate = useNavigation()
  return (
    <>
      {
        appointmentData.map((data, index) => (
          <View key={index}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                marginBottom: 10,
                marginTop: 10,
                elevation: 3,
                width: '98%',
                alignSelf: 'center',
                height: 90
                // padding:10
              }}>
              <View style={{ flex: 1, flexDirection: 'row', margin: 15 }}>
              <LottieView
                    source={require('../../assets/json/doc/profile.json')}
                    autoPlay
                    loop
                    style={{ width: 60, height: 60 }}
                />
                <View
                  style={{ flex: 1, flexDirection: 'column' }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text numberOfLines={2} style={[styles.boldText, { flexShrink: 1, fontSize: 15, fontWeight: '700' }]}>{data.user.name}</Text>
                    <Entypo name='cross' size ={20} color='red'/>
                  </View>
                  <Text numberOfLines={3} style={[styles.grayText, { flexShrink: 1, fontSize: 12 }]}>
                    {data.user.email}
                  </Text>
                  <View style={{}}>
                    <Text style={[styles.smallText,]}>{data.slot}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))
      }
    </>
  )
}

const styles = StyleSheet.create({})