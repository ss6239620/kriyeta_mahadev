import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { colorTheme, blackText, blueText, grayText } from '../../constant'
import Header from '../../components/Header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { TabView, SceneMap, TabBar, } from 'react-native-tab-view';
import UnderLine from '../../components/UnderLine'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const FAQ_Queries = [
    "How do I schedule an appointment?",
    "Can I reschedule or cancel appointments?",
    "How do i receive appointment reminders?",
    "How to checked Pre-Booked Appointment?",
    "How do I pay for appointments?",
    "Is telemedicine available through the app?",
    "How to add reviews?"
]

const Contact = [
    {
        title: "Customer Service",
        subTitle: "Lorem ipsum dolor sit",
        iconName: 'headphones'
    },
    {
        title: "Whatsapp",
        subTitle: "+91 7718833236",
        iconName: 'whatsapp'
    },
    {
        title: "Website",
        subTitle: "www.example.com",
        iconName: 'web'
    },
    {
        title: "Facebook",
        subTitle: "www.facebook.com/healthcare",
        iconName: 'twitter'
    },
    {
        title: "Instagram",
        subTitle: "www.instagram.com/healthcare",
        iconName: 'instagram'
    },
]


function FAQTab() {
    const [QueryOpen, setQueryOpen] = useState(null)
    const handleOpener = (option) => {
        setQueryOpen(QueryOpen === option ? null : option)
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10 }} >
            {FAQ_Queries.map((_, index) => {
                return (
                    <Pressable
                     key={index} 
                     onPress={() => { handleOpener(_) }} 
                     style={[styles.subContainer, { elevation: 2, backgroundColor: 'white', marginBottom: 20, borderRadius: 5 }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 8 }}>
                            <Text style={[styles.smallText, { color: "black" }]}>{_}</Text>
                            <MaterialIcons name={'keyboard-arrow-up'} size={25} color={colorTheme.primaryColor} />
                        </View>
                        {QueryOpen === _ ?
                            <>
                                <UnderLine marginTop={5} />
                                <Text style={[styles.smallText, { fontSize: 12, fontWeight: '600', padding: 8 }]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, quibusdam? Hic ratione numquam natus odio itaque amet, atque doloribus culpa deleniti totam modi sed iste qui animi vero error quo.</Text>
                            </> : null
                        }
                    </Pressable>
                )
            })}
        </ScrollView>
    )
}

function ContactUs(params) {
    const [ContactOpen, setContactOpen] = useState(null)
    const handleOpener = (option) => {
        setContactOpen(ContactOpen === option ? null : option)
    }
    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={[styles.subContainer,{marginTop:10}]}>
                {Contact.map((_, index) => {
                    return (
                        <Pressable
                         key={index} 
                         onPress={() => { handleOpener(_) }}
                         style={{ backgroundColor: "white", elevation: 2, borderRadius: 5, marginTop: 10, marginBottom: 5 }}>
                            <View style={{ flexDirection: "row", padding: 10, }}>
                                <MaterialCommunityIcons name={_.iconName} color={colorTheme.primaryColor} size={25} />
                                <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center", width: '90%', paddingHorizontal: 10 }}>
                                    <Text style={styles.bigText}>{_.title}</Text>
                                    <MaterialIcons name={'keyboard-arrow-down'} color={colorTheme.primaryColor} size={30} />
                                </View>
                            </View>
                            {ContactOpen === _ ?
                                <>
                                    <UnderLine marginTop={5} />
                                    <Text style={[styles.smallText, { fontSize: 12, fontWeight: '600', padding: 8 }]}>{_.subTitle}</Text>
                                </>
                                : null
                            }
                        </Pressable>
                    )
                })}

            </View>
        </ScrollView>
    )
}

export default function Template() {
    const [name, setName] = useState('')

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'FAQ' },
        { key: 'second', title: 'Contact Us' },
    ]);


    const renderScene = SceneMap({
        first: FAQTab,
        second: ContactUs,
    });

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Header leftIconName header={'Help Center'} titleMargin={30} />
                <View style={{ marginTop: 40 }}>
                    <View style={styles.textInput}>
                        <MaterialIcons name="search" color={colorTheme.primaryColor} size={25} />
                        <TextInput
                            placeholder='Search'
                            onChangeText={(text) => setName(text)}
                            value={name}
                        />
                    </View>
                </View>
            </View>

            {/* tabBar */}
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                style={{ width: "98%", alignSelf: 'center' }}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        renderLabel={({ route, color }) => (
                            <Text style={[styles.bigText, { color: "black", margin: 8, fontSize: 14, }]}>
                                {route.title}
                            </Text>
                        )}
                        style={{ backgroundColor: 'white' }}
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
        // justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 10
    },
})