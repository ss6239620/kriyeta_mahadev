import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { blackText, colorTheme } from '../../constant'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ArticleCard from '../../components/ArticleCard'
import LottieView from 'lottie-react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { WebView } from 'react-native-webview'


export default function Profile() {
  const navigation = useNavigation()
  const [search, setSearch] = useState('')
  return (
    <ScrollView style={styles.container}>
      <View style={styles.subContainer}>
        {/* <View style={styles.search}>
          <ImageBackground source={require('../assets/img/search.jpeg')} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} imageStyle={{ borderRadius: 20 }}>
            <View>
              <Text style={{ fontSize: 25, color: '#091F44', fontWeight: "500" }}>Search insulin</Text>
              <Text style={{ textAlign: 'center', fontSize: 30, color: "red", fontWeight: "700" }}>Quickly</Text>
            </View>
            <View style={{ width: '90%', position: 'absolute', bottom: 15 }}>
              <TextInput
                placeholder='Search'
                onChangeText={(text)=>setSearch(text)}
                value={search}
                style={styles.textInput}
              />
            </View>
          </ImageBackground>
        </View> */}
        <View style={{ backgroundColor: "white", elevation: 3, borderRadius: 10, alignSelf: "center", width: "90%", alignItems: "center" }}>
          <LottieView source={require("../../assets/json/search.json")} autoPlay loop style={{ width: 360, height: 200, }} />
          <View style={styles.textInput}>
            <MaterialIcons name="search" color={colorTheme.primaryColor} size={25} />
            <TextInput
              placeholder='Search here..'
              onChangeText={(text) => setSearch(text)}
              value={search}
              style={{ height: 48, width: "92%" }}
            />
          </View>
        </View>
        <View style={styles.category}>
          <TouchableOpacity
            onPress={() => { navigation.navigate("SearchResult") }}
            style={{ backgroundColor: "#FAE9E9", elevation: 3, width: 100, justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
            <Ionicons name='person' size={25} color={"#E35F47"} />
            <Text style={[styles.bigText]}>Doctors</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { navigation.navigate("VideoCall") }}
            style={{ backgroundColor: "#EAF2FF", elevation: 3, width: 100, justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
            <MaterialCommunityIcons name='pill' size={25} color={"#1648CE"} />
            <Text style={[styles.bigText]}>Pharmacy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { navigation.navigate("DoctorHome") }}
            style={{ backgroundColor: "#E4F8EB", elevation: 3, width: 100, justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
            <MaterialCommunityIcons name='hospital-building' size={25} color={"#117639"} />
            <Text style={[styles.bigText]}>Hospitals</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.symptom}>
          <Text style={[styles.bigText, { color: "#6A788E", fontWeight: "600" }]}>Your Symptomps</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ marginTop: 5, height: 48, justifyContent: "space-around", alignItems: "center", flexDirection: "row" }} >
              <TouchableOpacity style={{ width: 130, height: 48, backgroundColor: "white", borderRadius: 15, justifyContent: "center", alignItems: "center", marginRight: 10, elevation: 2 }}>
                <Text style={[styles.bigText, { fontWeight: '500' }]}>🤮 Headache</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 130, height: 48, backgroundColor: "white", borderRadius: 15, justifyContent: "center", alignItems: "center", marginRight: 10, elevation: 2 }}>
                <Text style={[styles.bigText, { fontWeight: '500' }]}>🤮 Nausea</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 130, height: 48, backgroundColor: "white", borderRadius: 15, justifyContent: "center", alignItems: "center", marginRight: 10, elevation: 2 }}>
                <Text style={[styles.bigText, { fontWeight: '500' }]}>🤮 Diarrahea</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View style={{
          width: "90%",
          marginTop: 15,
          marginBottom: 5
        }}>
          <Text style={[styles.bigText, { color: "#6A788E", fontWeight: "600", textAlign: "left" }]}>Find NearBy DOctors</Text>
        </View>
        <View style={{ width: '90%', marginTop: 10, height: 600 }}>
          <WebView
            originWhitelist={['*']}
            source={{
              html: `
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d15053.894860220578!2d72.8395422!3d19.3919278!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1696074814477!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              `,
            }}
            style={{ flex: 1 }}
            onError={(error) => console.error('WebView error:', error)}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'column' }}>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.appBackGroundColor
  },
  subContainer: {
    alignItems: 'center',
    marginTop: 10
  },
  search: {
    width: '90%',
    height: 219,
    // borderRadius: 10
  },
  textInput: {
    width: "95%",
    height: 48,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 7,
    borderWidth: 1,
    borderColor: "#d3d2d6",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },
  category: {
    height: 88,
    width: "90%",
    // backgroundColor:"red",
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: "space-around",
    // alignItems:"center"
  },
  symptom: {
    width: "90%",
    marginTop: 15,
    height: 76,
  },
  bigText: {
    fontSize: 15,
    fontWeight: blackText.fontWeight,
    color: blackText.color
  },
})