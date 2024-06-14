import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { blueText, blackText, grayText, colorTheme } from '../../constant'
import Header from '../../components/Header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function Chat({navigation}) {
  const [search, setSearch] = useState('')
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Header header={"Chat"} leftIconName={true} titleMargin={60} textColor={"white"} marginTop={10} />
        <View style={styles.textInput}>
          <MaterialIcons name="search" color={colorTheme.primaryColor} size={25} />
          <TextInput
            placeholder='Search Doctor'
            onChangeText={setSearch}
            value={search}
            style={{ height: 48, width: "92%" }}
          />
        </View>
      </View>
      <View style={{
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        elevation: 1,
        backgroundColor: 'white',
      }}>
        <ScrollView style={[styles.subContainer,{}]} horizontal showsHorizontalScrollIndicator={false}>
          {
            [1, 2, 3, 4, 5, 6].map((_, index) => {
              return (
                <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center",height:90 }} key={index}>
                  <Image source={require('../../assets/img/health.jpg')} resizeMode='contain' style={styles.image} />
                </View>
              )
            })
          }
        </ScrollView>
        <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 8].map((_, index) => {
            return (
              <TouchableOpacity 
              key={index} 
              style={[{ marginTop: 10, backgroundColor: "white", elevation: 2, borderRadius: 10, marginBottom: 5, }]}
              onPress={()=>{navigation.navigate("Message")}}
              >
                <View style={{ flexDirection: "row", justifyContent: "space-between" ,margin:10}}>
                  <View style={{ flexDirection: "row", width: "50%", }}>
                    <Image source={require('../../assets/img/health.jpg')} resizeMode='contain' style={styles.image} />
                    <View style={{ justifyContent: "center" }}>
                      <Text style={styles.bigText}>Carla Schoen</Text>
                      <Text>Lorem ipsum dolor sit amet consectetur...</Text>
                    </View>
                  </View>
                  <Text >10:34 PM</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorTheme.primaryColor
  },
  subContainer: {
    width: "90%",
    height: "auto",
    alignSelf: "center",
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
    width: "100%",
    height: 48,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 7,
    borderWidth: 1,
    borderColor: colorTheme.borderColor,
    flexDirection: "row",
    // justifyContent:"center",
    alignItems: "center",
    marginTop: 30, marginBottom: 30
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colorTheme.primaryColor,
    marginRight: 10
  },
})