import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, useWindowDimensions, Image, TextInput, TouchableOpacity } from 'react-native';
import { blackText, blueText, colorTheme, grayText } from '../constant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import UnderLine from '../components/UnderLine';
import { TabView, SceneMap, TabBar, } from 'react-native-tab-view';
import DoctorProfileCard from '../components/DoctorProfileCard';
import DoctorRenameCard from '../components/DoctorRenameCard';

const icon = [
    {
        name: 'web',
        title: "Website"
    },
    {
        name: 'android-messages',
        title: "Message"
    },
    {
        name: 'phone',
        title: "Call"
    },
    {
        name: 'google-maps',
        title: "Direction"
    },
    {
        name: 'share',
        title: "Share"
    },
]

const num_of_specilist = 3


function Specialist(params) {
    return (
        <View style={{ width: '90%', alignSelf: "center" }}>
            <Text style={[styles.bigText, { fontSize: 19, marginTop: 10 }]}>Specialist
                <Text style={[styles.blueText, {}]}> (18)</Text>
            </Text>
            {Array.from({ length: num_of_specilist }, (_, index) => (
                <View key={index} style={{ backgroundColor: 'white', borderWidth: 0.5, borderColor: colorTheme.borderColor, borderRadius: 10, marginVertical: 5 }}>
                    <DoctorProfileCard isButtonRequire isHeartRequire/>
                </View>
            ))}
        </View>
    )
}
function Gallery(params) {
    return (
        <View style={{ padding: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Text style={[styles.bigText, { fontSize: 19, }]}>Gallery
                    <Text style={[styles.blueText, {}]}> (400)</Text>
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name={"images"} size={22} color={colorTheme.primaryColor} />
                    <Text style={[styles.blueText, { fontSize: 15, marginLeft: 5 }]}>add photo</Text>
                </View>
            </View>
            {[Array.from({ length: num_of_specilist }, (_, index) => (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Image source={require('../assets/img/hospital.jpg')} resizeMode='cover' style={styles.image} borderRadius={20} />
                    <Image source={require('../assets/img/hospital.jpg')} resizeMode='cover' style={styles.image} borderRadius={20} />
                </View>
            ))]}
        </View>
    )
}
function Review(params) {
    const [search, setSearch] = useState('')
    return (
        <View style={{ padding: 15 }}>
            <View style={{ height: "auto" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.bigText}>Reviews
                        <Text style={[styles.blueText, { fontSize: 15 }]}> (18)</Text>
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <MaterialCommunityIcons name="pencil-plus" color={colorTheme.primaryColor} size={25} />
                        <Text style={styles.blueText}>add review</Text>
                    </View>
                </View>
                <View style={{ width: '90%', marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={styles.textInput}>
                        <MaterialIcons name="search" color={colorTheme.primaryColor} size={25} />
                        <TextInput
                            placeholder='Search in reviews'
                            onChangeText={setSearch}
                            value={search}
                            style={{ height: 48, width: "92%" }}
                        />
                    </View>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={{ width: 100, height: 30, borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 15, justifyContent: "center", alignItems: "center", marginRight: 5, flexDirection: "row" }}>
                        <FontAwesome name="sliders" color="black" size={20} />
                        <Text style={[styles.smallText, { fontWeight: '500', marginLeft: 5, marginRight: 5 }]}>Filter</Text>
                        <MaterialCommunityIcons name="menu-down" color="black" size={20} />
                    </TouchableOpacity>
                    {[1, 2, 3].map((num, index) => {
                        return (
                            <TouchableOpacity style={{ width: 100, height: 30, borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 15, justifyContent: "center", alignItems: "center", marginRight: 5 }} key={index}>
                                <Text style={[styles.smallText, { fontWeight: '500' }]}>Filter</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <DoctorRenameCard name={"Dale Thiel"} rating={4.9} time={22} />
                <DoctorRenameCard name={"Tiffany Nitzsche"} rating={3.9} time={30} />
                <DoctorRenameCard name={"Prashant Sukla"} rating={3.5} time={4} />
                <DoctorRenameCard name={"John Doe"} rating={4.9} time={4} />
            </View>
        </View>
    )
}
function About(params) {
    const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const [textShown, setTextShown] = useState(false)
    const [lengthMore, setLengthMore] = useState(false)

    const toggleNumberOfLines = () => {
        setTextShown(!textShown)
    }
    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 4)
    }, [])
    return (
        <View style={{ padding: 15 }}>
            <View style={{}}>
                <Text style={styles.bigText}>About</Text>
                <Text
                    style={styles.smallText}
                    onTextLayout={onTextLayout}
                    numberOfLines={textShown ? undefined : 2}
                >
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium ex blanditiis, repellendus, recusandae repudiandae nihil incidunt quisquam quo aut officia et, nesciunt sed tempore explicabo maxime ipsum ratione optio eius.
                </Text>
                {lengthMore ? <Text
                    onPress={toggleNumberOfLines}
                    style={{ lineHeight: 21, marginTop: 0, color: blueText.color, textDecorationLine: 'underline', textAlign: 'right' }}>{textShown ? 'Read Less...' : 'Read More...'}</Text> : null}
            </View>
            <View style={{ height: "auto", }}>
                <Text style={styles.bigText}>Working Hour</Text>
                <UnderLine marginTop={5} />
                {Days.map((day, index) => {
                    return (
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10 }} key={index}>
                            <Text style={styles.smallText}>{day}</Text>
                            <Text style={styles.smallText}>00:00 - 00:00</Text>
                        </View>
                    )
                })}
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between",marginTop:20 }}>
                <Text style={styles.bigText}>Address</Text>
                <Text style={styles.blueText}>View on Map</Text>
            </View>
        </View>
    )
}


const HospitalHeader = () => {
    return (
        <View style={styles.hospitalHeader}>
            <View style={styles.headerButton}>
                <Ionicons name={"arrow-back"} size={22} color={"black"} style={styles.buttonIcon} />
            </View>
            <View style={styles.headerButtonsContainer}>
                <View style={[styles.headerButton, { marginRight: 5 }]}>
                    <Ionicons name={"share-social"} size={22} color={"black"} style={styles.buttonIcon} />
                </View>
                <View style={styles.headerButton}>
                    <Ionicons name={"heart-outline"} size={22} color={"black"} style={styles.buttonIcon} />
                </View>
            </View>
        </View>
    );
};

const Hospital = () => {
    // tabbar
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Doctor' },
        { key: 'second', title: 'Galery' },
        { key: 'third', title: 'Review' },
        { key: 'fourth', title: 'About' },
    ]);

    const renderScene = SceneMap({
        first: Specialist,
        second: Gallery,
        third: Review,
        fourth: About,

    });
    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <ImageBackground source={require('../assets/img/hospital.jpg')} resizeMode='cover' style={styles.headerBackground}>
                    <HospitalHeader />
                </ImageBackground>

                {/* Main Content */}
                <View style={styles.content}>
                    <View style={{ backgroundColor: colorTheme.primaryColor, borderRadius: 50, alignSelf: 'center', position: 'absolute', top: -15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10, paddingVertical: 5 }}>
                            <MaterialCommunityIcons name={"star"} size={20} color={"white"} />
                            <Text style={[styles.smallText, { color: 'black', marginRight: 3 }]}>4.5</Text>
                            <Text style={[styles.smallText, { color: 'black' }]}>(1K+ Reviews)</Text>
                        </View>
                    </View>
                    <View style={{ padding: 20, }}>
                        <Text style={styles.bigText}>Serenity Wellness Clinic</Text>
                        <Text style={[styles.smallText, { color: 'black', fontSize: 13 }]}>Dentist, Skin Care</Text>
                        <UnderLine marginTop={10} />
                        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name={"location-on"} size={20} color={colorTheme.primaryColor} />
                            <Text style={[styles.smallText, { color: 'black', fontSize: 13 }]}>8502 Preston Rd, Inglewood, Maine 98380</Text>
                        </View>
                        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name={"watch-later"} size={20} color={colorTheme.primaryColor} />
                            <Text style={[styles.smallText, { color: 'black', fontSize: 13 }]}>15 min</Text>
                            <View style={{ width: 5, height: 5, marginHorizontal: 5, backgroundColor: "gray", borderRadius: 5 }} />
                            <Text style={[styles.smallText, { color: 'black', fontSize: 13 }]}>1.5Km</Text>
                            <View style={{ width: 5, height: 5, marginHorizontal: 5, backgroundColor: "gray", borderRadius: 5 }} />
                            <Text style={[styles.smallText, { color: 'black', fontSize: 13 }]}>Mon Sun | 11am - 11pm</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                        {icon.map((_, index) => (
                            <View key={index}>
                                <View style={{ width: 50, height: 50, backgroundColor: colorTheme.iconBackGroundColor, justifyContent: "center", alignItems: "center", borderRadius: 50 }}>
                                    <MaterialCommunityIcons name={_.name} color={colorTheme.primaryColor} size={30} />
                                </View>
                                <Text style={[styles.smallText, { textAlign: "center", color: "black" }]}>{_.title}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                {/* tabbar */}
                <View style={{ flexGrow: 1 }}>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                        style={{ width: "98%", alignSelf: 'center', height: num_of_specilist * 245 }}
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
            </ScrollView>
            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={{ backgroundColor: colorTheme.primaryColor, borderRadius: 50 }}>
                    <Text style={{ paddingHorizontal: 100, paddingVertical: 10, color: 'white' }}>Book Appointment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorTheme.appBackGroundColor,
        flex: 1,
        justifyContent: 'space-between',
    },
    headerBackground: {
        width: '100%',
        height: 200, // Adjust the height as needed
    },
    hospitalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: 10,
    },
    headerButton: {
        borderColor: colorTheme.borderColor,
        borderWidth: 1,
        borderRadius: 50,
        padding: 6,
        backgroundColor: 'white'
    },
    headerButtonsContainer: {
        flexDirection: 'row',
    },
    buttonIcon: {
        padding: 3,
    },
    content: {
        // flex: 1,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'white',
        marginTop: -35,
    },
    footer: {
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
        elevation: 10, // Android elevation
        shadowColor: 'black', // iOS shadow color
        shadowOffset: { width: 0, height: 4 }, // iOS shadow offset
        shadowOpacity: 0.3, // iOS shadow opacity
        shadowRadius: 5, // iOS shadow radius
        padding: 15,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
    image: {
        width: '48%',
        height: 190,
    },
    textInput: {
        height: 48,
        borderRadius: 10,
        backgroundColor: "white",
        padding: 7,
        borderWidth: 1,
        borderColor: colorTheme.borderColor,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5
    },
});

export default Hospital;
