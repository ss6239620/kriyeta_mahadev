import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { appointmentServices } from '../../services/Appointment'
import LottieView from 'lottie-react-native'

export default function PendingDoctorTab({ appointmentData, getAllAppointment }) {
  const navigate = useNavigation()
  function handleConfirm(id, message) {
    appointmentServices.acceptReject(id, message).then(res => {
      getAllAppointment()
      console.log(res.data);
    })
  }
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
                height: 80
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
                  <Text numberOfLines={2} style={[styles.boldText, { flexShrink: 1, fontSize: 15, fontWeight: '700' }]}>{data.user.name}</Text>
                  <Text numberOfLines={3} style={[styles.grayText, { flexShrink: 1, fontSize: 12 }]}>
                    {data.user.email}
                  </Text>
                  <View style={{}}>
                    <Text style={[styles.smallText,]}>{data.slot}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => { handleConfirm(data._id, 'accept') }}
                style={{ padding: 10, borderWidth: 1, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }} >
                <MaterialCommunityIcons name='check' size={20} color='green' />
                <Text>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { handleConfirm(data._id, 'reject') }}
                style={{ padding: 10, borderWidth: 1, borderRadius: 10, flexDirection: 'row', alignItems: 'center', marginLeft: 10 }} >
                <Entypo name='cross' size={20} color='red' />
                <Text>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      }
    </>
  )
}

const styles = StyleSheet.create({})