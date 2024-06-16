import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colorTheme, blackText, blueText, grayText } from '../../constant'
import Header from '../../components/Header'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import UnderLine from '../../components/UnderLine'
import { useNavigation } from '@react-navigation/native'
import Logout from './LogOut'

function InfoCard({ iconName, title, isNavigate, navigateTo }) {
  const navigation = useNavigation()
  return (
    <>
      <Pressable
        onPress={() => { isNavigate ? navigation.navigate(navigateTo) : null }}
        style={{ flexDirection: "row", padding: 10 }}>
        <MaterialCommunityIcons name={iconName} color={colorTheme.primaryColor} size={30} />
        <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center", width: '90%', paddingHorizontal: 10 }}>
          <Text style={styles.bigText}>{title}</Text>
          <MaterialIcons name={'arrow-forward-ios'} color={colorTheme.primaryColor} size={23} onPress={() => { isNavigate ? navigation.navigate(navigateTo) : null }} />
        </View>
      </Pressable>
      <UnderLine />
    </>
  )
}

const profileIcon = [
  {
    name: 'account',
    title: 'Your Profile',
    screen: 'EditProfile'
  },
  {
    name: 'credit-card',
    title: 'Payment Methods',
    screen: 'PaymentMethod'
  },
  {
    name: 'heart-outline',
    title: 'Favourite',
    screen: 'Favorites'
  },
  {
    name: 'file-document',
    title: 'Electronic Report Upload',
    screen: 'ElectronicReport'
  },
  {
    name: 'alarm',
    title: 'Remainder',
    screen: 'Remainder'
  },
  {
    name: 'video',
    title: 'View Offline Videos',
    screen: 'OfflineVideo'
  },
  {
    name: 'account',
    title: 'Settings',
    screen: 'Settings'
  },
  {
    name: 'account',
    title: 'SOS Settings',
    screen: 'SOSSettings'
  },
  {
    name: 'help',
    title: 'Help Center',
    screen: 'HelpCenter'
  },
  {
    name: 'lock',
    title: 'Privacy Policy',
    screen: 'PrivacyPolicy'
  },
]


export default function Profile() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigatation=useNavigation()
  return (
    <View style={styles.container}>
      <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
        <Header leftIconName header={'Profile'} marginTop={10} titleMargin={40} />
        <View style={{ marginVertical: 15, justifyContent: 'center', alignItems: 'center', }}>
          <View>
            <Image source={require('../../assets/img/user.jpg')} resizeMode='contain' style={styles.image} />
            <View style={{ position: "absolute", bottom: 0, right: 0, backgroundColor: colorTheme.primaryColor, borderRadius: 40 }}>
              <MaterialCommunityIcons name={'pencil-plus'} color={"white"} size={25} style={{ padding: 5 }} onPress={()=>navigatation.navigate('LoginChoice')} />
            </View>
          </View>
          <Text style={[styles.bigText, { marginTop: 10 }]}>Esther Howard</Text>
        </View>
        {profileIcon.map((_, index) => (
          <InfoCard iconName={_.name} title={_.title} key={index} isNavigate navigateTo={_.screen} />
        ))}
        <Pressable
          onPress={() => { setModalVisible(true) }}
          style={{ flexDirection: "row", padding: 10 }}>
          <MaterialCommunityIcons name={"logout"} color={colorTheme.primaryColor} size={30} />
          <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center", width: '90%', paddingHorizontal: 10 }}>
            <Text style={styles.bigText}>Logout</Text>
            <MaterialIcons name={'arrow-forward-ios'} color={colorTheme.primaryColor} size={23} onPress={() => { setModalVisible(true) }} />
          </View>
        </Pressable>
      </ScrollView>
      {
        modalVisible ?
          <Logout modalVisible={modalVisible} setModalVisible={setModalVisible} />
          : null
      }
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
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export { InfoCard }