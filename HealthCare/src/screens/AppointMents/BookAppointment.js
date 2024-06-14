import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { blackText, blueText,  colorTheme, grayText } from '../../constant'
import Header from '../../components/Header'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AllDoctorProfileCards from '../../components/AllDoctorProfileCards'

const days = ["Mon", "Tue", "Wed", "Th", "Fr", "Sat", "Sun"]

export default function BookAppointment({navigation,route}) {
    const [customSchedule, setCustomSchedule] = useState('')
    const [selectDay, setSelectDay] = useState(0)
    const [selectTime, setSelectTime] = useState(0)
    // const data = [
    //     {
    //       name: 'Dr.Narayanankutty',
    //       job: "Heart Surgeon",
    //       image: require('../../assets/img/DocData/d3.jpeg')
    //     },
    //     {
    //       name: 'Dr Dileep Damodaran',
    //       job: "Neaurologist",
    //       image: require('../../assets/img/DocData/d4.jpeg')
    //     },
    //     {
    //       name: 'Dr. Gautam Verma',
    //       job: "Cardiologist",
    //       image: require('../../assets/img/DocData/d2.jpeg')
    //     },
    //   ];
      const {data}= route.params
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={[styles.subContainer,]}>
                    <Header header={"Book Appointment"} leftIconName={"chevron-back"} titleMargin={30} />
                </View>
                <AllDoctorProfileCards data={data} />
                <View style={[styles.subContainer, { marginTop: 30 }]}>
                    <View style={{ height: 'auto', }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                            <View>
                                <View style={{ width: 50, height: 50, backgroundColor: colorTheme.iconBackGroundColor, justifyContent: "center", alignItems: "center", borderRadius: 50 }}>
                                    <MaterialCommunityIcons name="account-group" color={colorTheme.primaryColor} size={30} />
                                </View>
                                <Text style={[styles.bigText, { color: blueText.color, textAlign: 'center' }]}>7,500+</Text>
                                <Text style={[styles.smallText, { textAlign: "center" }]}>Patients</Text>
                            </View>
                            <View>
                                <View style={{ width: 50, height: 50, backgroundColor:colorTheme.iconBackGroundColor, justifyContent: "center", alignItems: "center", borderRadius: 50 }}>
                                    <MaterialCommunityIcons name="bag-checked" color={colorTheme.primaryColor} size={30} />
                                </View>
                                <Text style={[styles.bigText, { color: blueText.color, textAlign: "center" }]}>10+</Text>
                                <Text style={[styles.smallText, { textAlign: "center" }]}>Years Exp.</Text>
                            </View>
                            <View>
                                <View style={{ width: 50, height: 50, backgroundColor: colorTheme.iconBackGroundColor, justifyContent: "center", alignItems: "center", borderRadius: 50 }}>
                                    <MaterialCommunityIcons name="star" color={colorTheme.primaryColor} size={30} />
                                </View>
                                <Text style={[styles.bigText, { color: blueText.color, textAlign: "center" }]}>4.9+</Text>
                                <Text style={[styles.smallText, { textAlign: "center" }]}>Rating</Text>
                            </View>
                            <View>
                                <View style={{ width: 50, height: 50, backgroundColor: colorTheme.iconBackGroundColor, justifyContent: "center", alignItems: "center", borderRadius: 50 }}>
                                    <MaterialCommunityIcons name="comment-processing" color={colorTheme.primaryColor} size={30} />
                                </View>
                                <Text style={[styles.bigText, { color: blueText.color, textAlign: "center" }]}>4,956</Text>
                                <Text style={[styles.smallText, { textAlign: "center" }]}>Review</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.smallText, { lineHeight: 40,marginTop:30 }]}>Book Appointment</Text>
                    <Text style={[styles.bigText, { fontWeight: "700", fontSize: 18 }]}>Day</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ flexDirection: "row", marginTop: 10 }}>
                        {data.days.map((day, index) => {
                            return (
                                <Pressable 
                                key={index} 
                                style={{ width: 100, height: 40, borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 15, justifyContent: "center", alignItems: "center", marginRight: 5, backgroundColor: index === selectDay ? colorTheme.primaryColor : "white" }}
                                onPress={() => setSelectDay(index)}
                                >
                                    <Text style={[styles.smallText, { fontWeight: '300', color: index === selectDay ? "white" : "black" }]}>{day}</Text>
                           
                                </Pressable>
                            )
                        })}
                    </ScrollView>
                    <Text style={[styles.bigText, { fontWeight: "700", fontSize: 18, lineHeight: 30, marginTop: 10, }]}>Time Slots</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderWidth:1,padding:10,borderColor:colorTheme.borderColor,borderRadius:10,backgroundColor:colorTheme.borderColor}}>
                        <Text style={[styles.smallText,{fontSize:15,}]}>5:00PM - 6:00 PM</Text>
                        <Text>N.A</Text>
                    </View>
                    <View style={styles.textInput}>
                        <View>
                            <TextInput
                                placeholder='Want a custom schedule?'
                                onChangeText={setCustomSchedule}
                                value={customSchedule}
                                style={{ height: 48, width: "92%" }}
                            />
                        </View>
                        <Text style={[styles.blueText, { fontSize: 14 }]}>Request Schedule</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{
                width: "100%",
                height: 70,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                elevation: 1,
                // backgroundColor:'white',
                justifyContent: "center",
                alignItems: "center"
            }}>
                <TouchableOpacity
                    style={{ backgroundColor: blueText.color, width: "90%", height: 40, borderRadius: 50, justifyContent: "center" }}
                onPress={() => navigation.navigate('SelectAppointmentPackage')}
                >
                    <Text style={[styles.smallText, { color: "white", alignSelf: 'center' }]}>Make Appointment</Text>
                </TouchableOpacity>
            </View>
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
        alignSelf: "center"
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
        height: 40,
        borderRadius: 50,
        backgroundColor: colorTheme.backgroundColor,
        padding: 7,
        borderWidth: 1,
        borderColor: colorTheme.borderColor,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        justifyContent: "space-between"
    },
})