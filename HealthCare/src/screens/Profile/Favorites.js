import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { colorTheme, blackText, blueText, grayText } from '../../constant'
import Header from '../../components/Header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { TabView, SceneMap, TabBar, } from 'react-native-tab-view';
import DoctorProfileCard from '../../components/DoctorProfileCard'
import HospitalProfileCard from '../../components/HospitalProfileCard'
import FavouriteModal from '../../components/Modal/FavouriteModal'

function Doctor(params) {
    const [modalVisible, setModalVisible] = useState(false)
    const update = (value) => {
        setModalVisible(value)
    }
    return (
        <ScrollView contentContainerStyle={[styles.subContainer, { paddingVertical: 10 }]} showsVerticalScrollIndicator={false}>
            {[1, 2, 3, 4].map((_, index) => (
                <View key={index} style={{ backgroundColor: 'white', borderWidth: 0.5, borderColor: colorTheme.borderColor, borderRadius: 10, marginVertical: 5 }}>
                    <DoctorProfileCard isHeartTrue={true} isHeartRequire isButtonRequire onUpdate={update}/>
                </View>
            ))}
            {
                modalVisible?<FavouriteModal modalVisible={modalVisible} setModalVisible={setModalVisible} />:null
            }
        </ScrollView>
    )
}
function Hospital(params) {
    
    return (
        <ScrollView contentContainerStyle={[styles.subContainer, { paddingVertical: 10 }]} showsVerticalScrollIndicator={false}>
            {[1, 2, 3, 4].map((_, index) => (
                <View key={index} style={{ marginVertical: 5 }}>
                    <HospitalProfileCard screen={'Hospital'} isHeartTrue={true} />
                </View>
            ))}
        </ScrollView>
    )
}

function SearchBar(params) {
    const [name, setName] = useState('')

    return (
        <View style={styles.textInput}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons name="search" color={colorTheme.primaryColor} size={25} />
                <TextInput
                    placeholder='Search'
                    onChangeText={(text) => setName(text)}
                    value={name}
                />
            </View>
            <MaterialIcons name="cancel" color={colorTheme.primaryColor} size={25} />
        </View>
    )
}

export default function Template() {
    // tabbar
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Doctor' },
        { key: 'second', title: 'Hospital' },
    ]);

    const renderScene = SceneMap({
        first: Doctor,
        second: Hospital,
    });

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Header leftIconName header={"Favorites"} rightIconName={'search'} marginTop={20} />
            </View>

            {/* tabBar */}
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                style={{ width: "98%", alignSelf: 'center', }}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        renderLabel={({ route, focused }) => (
                            <Text style={[styles.bigText, { color: focused ? colorTheme.primaryColor : colorTheme.borderColor, margin: 8, fontSize: 14, }]}>
                                {route.title}
                            </Text>
                        )}
                        style={{ backgroundColor: 'white', }}
                        indicatorStyle={{ borderWidth: 2, borderColor: colorTheme.primaryColor, borderTopEndRadius: 40, borderTopLeftRadius: 40 }}
                    />
                )}
            />
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
        borderWidth: 1,
        borderColor: "#d3d2d6",
        textAlignVertical: 'top',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        width: "90%",
        marginLeft: 15,
        paddingHorizontal: 5

    },
    childrenSTyle: {
        // backgroundColor: 'red',
        flexGrow: 1,
        alignSelf: 'flex-end'
    },
})