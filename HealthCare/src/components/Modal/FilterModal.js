import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { blackText, blueText, colorTheme, grayText } from '../../constant'
import RadioButton from '../RadioButton'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

function Stars({ numberOfFullStar, numberOfNoStar }) {
    return (
        <>
            {Array.from({ length: numberOfFullStar }, (_, index) => {
                return (
                    <View style={{ marginRight: 5 }} key={index}>
                        <Ionicons name={"star"} size={25} color={"#EF802F"} />
                    </View>
                )
            })}
            {
                Array.from({ length: numberOfNoStar }, (_, index) => {
                    return (
                        <View style={{ marginRight: 5 }} key={index}>
                            <Ionicons name={"star-outline"} size={25} color={"#EF802F"} />
                        </View>
                    )
                })
            }
        </>
    )
}


export default function FilterModal({ modalVisible, setModalVisible }) {
    const [selected, setselected] = useState(null)
    const [Slider, setSlider] = useState([2, 100])
    const [SelectInstantBook, setSelectInstantBook] = useState(false)

    const handleRadioButton = (option) => {
        setselected(option === selected ? null : option)
    }
    const handleSLider = (value) => {
        setSlider(value);
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.container}>
                <ScrollView style={styles.subContainer}>
                    <Pressable
                        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <MaterialIcons name="keyboard-arrow-down" color={colorTheme.primaryColor} size={35} style={{ marginRight: 10 }} />
                        <Text style={styles.bigText}>Apply Filter</Text>
                    </Pressable>

                    <Text style={[styles.bigText, { marginTop: 30 }]}>Speciality</Text>
                    <ScrollView horizontal={true} style={{ flexDirection: "row", marginTop: 10 }} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity style={{ backgroundColor: colorTheme.primaryColor, borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 15, justifyContent: "center", alignItems: "center", marginRight: 5, flexDirection: "row" }}>
                            <View style={{ margin: 10, }}>
                                <Text style={[styles.smallText, { fontWeight: '500', color: "white" }]}>All</Text>
                            </View>
                        </TouchableOpacity>
                        {[1, 2, 3].map((num, index) => {
                            return (
                                <TouchableOpacity style={{ width: 100, height: 40, borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 15, justifyContent: "center", alignItems: "center", marginRight: 5 }} key={index}>
                                    {/* <View style={{ margin: 0 }}> */}
                                    <Text style={[styles.smallText, { fontWeight: '500' }]}>Filter</Text>
                                    {/* </View> */}
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                    <Text style={[styles.bigText, { marginTop: 20 }]}>Review</Text>
                    {[1, 2, 3, 4, 5, 6].map((rating, i) => {
                        // console.log(index)
                        return (
                            <View key={i} style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Stars numberOfFullStar={5 - i} numberOfNoStar={i} />
                                    <Text style={[styles.bigText, { fontSize: 15, marginLeft: 5 }]}>rating is {5 - i} </Text>
                                </View>
                                <TouchableOpacity onPress={() => { handleRadioButton(rating) }}>
                                    <RadioButton selected={rating === selected} />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                    <Text style={[styles.bigText, { marginTop: 30 }]}>Distance (km)</Text>
                    <View style={{}}>
                        <MultiSlider
                            values={Slider}
                            onValuesChange={handleSLider}
                            sliderLength={300}
                            min={10}
                            max={90}
                            step={5}
                            allowOverlap={false}
                            snapped={true}
                            markerStyle={{ backgroundColor: colorTheme.primaryColor, width: 25, height: 25, borderWidth: 2, borderColor: "white" }}
                            trackStyle={{ backgroundColor: grayText.color, width: 10, borderWidth: 1.5, borderColor: grayText.color }}
                            selectedStyle={{ backgroundColor: colorTheme.primaryColor, borderWidth: 1.5, borderColor: colorTheme.primaryColor }}
                            containerStyle={{ alignSelf: "center" }}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text>2</Text>
                            <Text>7</Text>
                            <Text>22</Text>
                            <Text>30</Text>
                            <Text>45</Text>
                            <Text>60</Text>
                            <Text>70</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",marginTop:10,justifyContent:"space-between",alignItems:"center"}}>
                        <View style={{}}>
                            <Text style={[styles.bigText,]}>Instant Book</Text>
                            <Text style={styles.smallText}>Book without Waiting for the host to respond</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{SelectInstantBook?setSelectInstantBook(false):setSelectInstantBook(true)}}>
                            <RadioButton selected={SelectInstantBook}/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={{
                    width: "100%",
                    height: 70,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    elevation: 1,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    flexDirection: "row"

                }}>
                    <TouchableOpacity
                        style={{ width: "40%", backgroundColor: colorTheme.iconBackGroundColor, height: 40, borderRadius: 50, justifyContent: "center" }}
                        // onPress={() => navigation.navigate('PatientDetails')}
                    >
                        <Text style={[styles.smallText, { color: blueText.color, alignSelf: 'center' }]}>Reset Filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: "40%", backgroundColor: blueText.color, height: 40, borderRadius: 50, justifyContent: "center" }}
                        // onPress={() => navigation.navigate('PatientDetails')}
                    >
                        <Text style={[styles.smallText, { color: "white", alignSelf: 'center' }]}>Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
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
    textInput: {
        height: 50,
        borderRadius: 10,
        backgroundColor: "white",
        padding: 7,
        borderWidth: 1,
        borderColor: colorTheme.borderColor,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        justifyContent: "space-between"
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
})