import { Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Pressable, Dimensions, FlatList, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colorTheme } from '../../constant'
import DoctorCard from '../../components/DoctorCard'
import ArticleCard from '../../components/ArticleCard'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import LocationModal from '../../components/Modal/LocationModal'
import FilterModal from '../../components/Modal/FilterModal'
import NotificationModal from '../../components/Modal/NotificationModal'
import Carousel from '../../components/Carousel'
import Category from '../../components/Modal/CategoryModal'
import TopDoctorModal from '../../components/Modal/TopDoctorModal'
import TopHospitalModal from '../../components/Modal/TopHospitalModal'
import HospitalProfileCard from '../../components/HospitalProfileCard'
import { sendSmsData } from '../../components/SendSMS'
import { articlesServices } from '../../services/Article'
import Contacts from 'react-native-contacts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LottieView from 'lottie-react-native'
import { appointmentServices } from '../../services/Appointment'

const data = [
  {
    name: 'Dr.Narayanankutty',
    job: "Heart Surgeon",
    image: require('../../assets/img/DocData/d3.jpeg')
  },
  {
    name: 'Dr Dileep Damodaran',
    job: "Neaurologist",
    image: require('../../assets/img/DocData/d4.jpeg')
  },
  {
    name: 'Dr. Gautam Verma',
    job: "Cardiologist",
    image: require('../../assets/img/DocData/d2.jpeg')
  },
];


function Test(params) {
  // PayNow()
}

async function SendSOS(params) {
  // sendSmsData(SMSDATA)
  const phoneno = await AsyncStorage.getItem('SOSNumber')
  const phone = JSON.parse(phoneno)

  const SMSDATA = phone.phoneNumber.map(number => ({
    phone: number,
    msg: "Hello there is medical emergency pls contact me immediatlely"
  }));

  sendSmsData(SMSDATA)
}


export default function Home({ navigation }) {

  const [article, setarticle] = useState({})
  const [docData, setdocData] = useState([])
  const [articleLoading, setarticleLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [isPost, setIsPost] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModal, setFilterModal] = useState(false)
  const [notificationModal, setNotificationModal] = useState(false)
  const [categoryModalVisible, setcategoryModalVisible] = useState(false);
  const [topDoctorModal, setTopDoctorModal] = useState(false);
  const [topHosPitalModal, setTopHospitalModal] = useState(false);

  useEffect(() => {
    articlesServices.FetchArticles().then((
      res => {
        setarticle(res.data.articles)
        setarticleLoading(true)
      }
    )).catch(err => { console.log('error fetching data'); })
    fetchAllDoc()
  }, [])

  function fetchAllDoc(params) {
    appointmentServices.fetchAllDoc().then(res=>{
      setdocData(res.data)
    })
  }

  function createArr(params) {
   const data= docData.slice(0,2)
   return data
  }




  // articlesServices.FetchArticles()

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          SendSOS()
        }}
        style={styles.fixedComponent}>
        <View style={{ alignItems: 'center', height: 55, justifyContent: 'center' }}>
          <Text style={[styles.boldText, { color: 'white' }]}>SOS</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          // SendSOS()
        }}
        style={styles.fixedComponent1}>
        <View style={styles.iconContainer}>
          <Pressable onPress={() => { navigation.navigate('ChatBot') }}>
            <LottieView
              source={require('../../assets/json/bot.json')}
              autoPlay
              loop
              style={{ width: 90, height: 90 }}
            />
          </Pressable>
        </View>
      </Pressable>
      <ScrollView contentContainerStyle={styles.subcontainer}>
        <>
          {modalVisible
            ?
            <LocationModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
            : null
          }
          {notificationModal
            ?
            <NotificationModal modalVisible={notificationModal} setModalVisible={setNotificationModal} />
            : null
          }
          {
            filterModal
              ?
              <FilterModal modalVisible={filterModal} setModalVisible={setFilterModal} />
              : null
          }
          {
            categoryModalVisible
              ?
              <Category modalVisible={categoryModalVisible} setModalVisible={setcategoryModalVisible} />
              : null
          }
          {
            topDoctorModal
              ?
              <TopDoctorModal modalVisible={topDoctorModal} setModalVisible={setTopDoctorModal} />
              : null
          }
          {
            topHosPitalModal
              ?
              <TopHospitalModal modalVisible={topHosPitalModal} setModalVisible={setTopHospitalModal} />
              : null
          }
        </>
        <View style={{ width: "90%", marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <Text style={{ color: "gray" }}>Location</Text>
            <Pressable
              style={{ flexDirection: "row", alignItems: 'center' }}
              onPress={() => setModalVisible(true)}
            >
              <MaterialIcons name="location-pin" color={colorTheme.primaryColor} size={25} />
              <Text style={{ color: "black", fontSize: 15, fontWeight: "700" }}>New York,USA</Text>
              <MaterialIcons name="keyboard-arrow-down" color={colorTheme.primaryColor} size={25} />
            </Pressable>
          </View>
          <View
            style={{ width: 50, height: 32, backgroundColor: "white", justifyContent: "center", alignItems: "center", borderRadius: 50, flexDirection: 'row' }}>
            <MaterialIcons name="videocam" color={colorTheme.primaryColor} size={25} style={{ marginRight: 10 }} onPress={() => { navigation.navigate("VideoCall") }} />
            <MaterialIcons name="notifications-active" color={colorTheme.primaryColor} size={25} style={{ marginRight: 10 }} onPress={() => setNotificationModal(true)} />
          </View>
        </View>
        <View style={{ width: '90%', marginBottom: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={styles.textInput}>
            <MaterialIcons name="search" color={colorTheme.primaryColor} size={25} />
            <TextInput
              placeholder='Search'
              onChangeText={(text) => setSearch(text)}
              value={search}
              style={{ height: 48, width: "92%" }}
            />
          </View>
          <Pressable
            style={{ width: 45, height: 45, backgroundColor: colorTheme.primaryColor, justifyContent: "center", alignItems: "center", borderRadius: 10 }}
            onPress={() => { setFilterModal(true) }}
          >
            <FontAwesome name="sliders" color="white" size={25} />
          </Pressable>
        </View>
        <View style={{ width: '90%', flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={[styles.grayText, { marginBottom: 8, }]}>Top Specialist</Text>
          <Text
            onPress={() => { setTopDoctorModal(true) }}
            style={[{ color: colorTheme.primaryColor, fontSize: 15 }]}>See All</Text>
        </View>
        <Carousel data={docData.slice(0,2)}>
          <DoctorCard />
        </Carousel>
        <View style={{}}>
          <View style={{ width: '90%', flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
            <Text style={[styles.grayText, { marginBottom: 8, }]}>Doctor Speciality</Text>
            <Text onPress={() => { setcategoryModalVisible(true) }} style={[{ color: colorTheme.primaryColor, fontSize: 15 }]}>See All</Text>
          </View>
          <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'space-around' }}>
            <View style={{ backgroundColor: colorTheme.iconBackGroundColor, padding: 15, borderRadius: 50 }}>
              <FontAwesome5 name="teeth-open" color={colorTheme.primaryColor} size={25} />
            </View>
            <View style={{ backgroundColor: colorTheme.iconBackGroundColor, padding: 15, borderRadius: 50 }}>
              <FontAwesome5 name="heartbeat" color={colorTheme.primaryColor} size={25} />
            </View>
            <View style={{ backgroundColor: colorTheme.iconBackGroundColor, padding: 15, borderRadius: 50 }}>
              <FontAwesome5 name="bone" color={colorTheme.primaryColor} size={25} />
            </View>
            <View style={{ backgroundColor: colorTheme.iconBackGroundColor, padding: 15, borderRadius: 50 }}>
              <FontAwesome5 name="brain" color={colorTheme.primaryColor} size={25} />
            </View>
          </View>
        </View>
        <View>
          <View style={{ width: '90%', flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
            <Text style={[styles.grayText, { marginBottom: 8, }]}>Top Hospitals</Text>
            <Text onPress={() => { setTopHospitalModal(true) }} style={[{ color: colorTheme.primaryColor, fontSize: 15 }]}>See All</Text>
          </View>
        </View>
        <Carousel data={data}>
          <HospitalProfileCard isNavigate />
        </Carousel>
        <View style={[{ width: "90%", }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{ backgroundColor: isPost ? colorTheme.primaryColor : 'white', width: 120, height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colorTheme.primaryColor }}
              onPress={() => { setIsPost(true) }}
            >
              <Text style={{ color: isPost ? "white" : 'black' }}>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: isPost ? "white" : colorTheme.primaryColor, width: 120, height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colorTheme.primaryColor }}
              onPress={() => {
                setIsPost(false)
                // Test()
              }}
            >
              <Text style={{ color: isPost ? "black" : 'white' }}>Articles</Text>
            </TouchableOpacity>
          </View>
          {articleLoading ? article.map((obj, index) => (
            <ArticleCard key={index} title={obj.title} desc={obj.description} image={obj.urlToImage} />
          )) :
            <Text>Loading...</Text>}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: colorTheme.appBackGroundColor
  },
  subcontainer: {
    alignItems: 'center',
    marginTop: 10,

  },
  textInput: {
    width: "80%",
    height: 48,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 7,
    borderWidth: 1,
    borderColor: colorTheme.borderColor,
    flexDirection: "row",
    // justifyContent:"center",
    alignItems: "center"
  },
  grayText: {
    fontSize: 17,
    fontWeight: '700',
    color: "gray"
  },
  boldText: {
    fontSize: 17,
    fontWeight: '700',
    color: "black"
  },
  smallText: {
    fontSize: 12,
    fontWeight: '500',
    color: "black"
  },
  post: {
    width: '90%',
    marginBottom: 3,
    // backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  card: {
    width: "90%",
    height: 112,
    backgroundColor: 'white',
    borderRadius: 10
  },
  image: {
    width: '40%',
    height: '100%',
    marginRight: 5
  },
  fixedComponent: {
    position: 'absolute',
    bottom: 30,
    width: '15%',
    // height:50,
    backgroundColor: 'red',
    zIndex: 1,
    left: 30,
    borderRadius: 30,
    opacity: 0.7

    // Add any other styling properties you need for your fixed component
  },
  fixedComponent1: {
    position: 'absolute',
    bottom: 30,
    width: 80,
    height: 80,
    // backgroundColor: colorTheme.primaryColor,
    zIndex: 20,
    right: 30,
    borderRadius: 50, // half of width and height to make it circular
    opacity: 2,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  iconContainer: {
    width: 60, // Adjust the width and height of the icon container as needed
    height: 60,
    borderRadius: 30, // half of width and height to make it circular
    justifyContent: 'center',
    alignItems: 'center',
  },

})