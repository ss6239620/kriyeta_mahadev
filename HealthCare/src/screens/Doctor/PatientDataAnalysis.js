import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'

import { navigate } from '../../services/navRef'
import Header from '../../components/Header'
import { API_URL, colorTheme } from '../../constant'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'


export default function PatientDataAnalysis({navigation}) {
  const [search, setsearch] = useState('')
  const [loading, setloading] = useState(false)
  const [searchResult, setsearchResult] = useState([])

  async function getAllSearchResult(name) {
    try {
      console.log('searching....');
      setloading(false)
      const token = await AsyncStorage.getItem("doctorToken");
      const body = {

        name: name
      }
      const config = {
        headers: {
          'auth-token': token,
        }
      }

      const res = await axios.post(`${API_URL}/doctor/searchuser`, body, config)
      console.log('search result---->', res.data);
      // After updating permission, fetch all files again
      setsearchResult(res.data)
      setloading(true)
    } catch (error) {
      console.log(error.response.data);
    }
  }
  return (
    <View style={{ backgroundColor: colorTheme.appBackGroundColor, flex: 1 }}>
      <ScrollView>
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <Header leftIconName header={'Search Patient'} rightIconName={'share-social-outline'} />
        </View>
        <View style={{ gap: 5, justifyContent: 'center', alignItems: 'center', marginVertical: 20, flexDirection: 'row' }}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search Patient's Name"
            value={search}
            onChangeText={(text) => setsearch(text)}
          />
          <TouchableOpacity
            onPress={() => getAllSearchResult(search)}
            style={{ borderWidth: 1, borderColor: 'lightgray', padding: 7, borderRadius: 10 }}>
            <Feather name="search" color='black' size={30} />
          </TouchableOpacity>
        </View>
        {loading && searchResult.map((data,index) => (
          <TouchableOpacity style={styles.PersonList} key={index} onPress={() => navigation.navigate('PatientInfo',{data:data})}>
            <View>
              <FontAwesome name="user-circle" color='lightgray' size={70} />
            </View>
            <View>
              <Text style={{ fontSize: 20, color: 'black', fontWeight: '600' }}>{data.name}</Text>
              <Text>{data.email}</Text>
              <View style={{ flexDirection: 'row', marginTop: 7, alignItems: 'center' }}>
                <Ionicons name="call" color='blue' size={15} />
                <Text style={{ color: 'blue', marginBottom: 2 }}> +91-9145833375</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchBar: {
    width: '75%',
    borderColor: 'lightgray',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  PersonList: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 15,
    borderRadius: 15,
    gap: 30,
    flexDirection: 'row',
    marginBottom: 15
  }
})