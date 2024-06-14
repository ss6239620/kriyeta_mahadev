import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { blackText, blueText, colorTheme, grayText } from '../../constant'
import Header from '../../components/Header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import UnderLine from '../../components/UnderLine'
import WebView from 'react-native-webview'
import DoctorRenameCard from '../../components/DoctorRenameCard'
import DoctorProfileCard from '../../components/DoctorProfileCard'
import AllDoctorProfileCards from '../../components/AllDoctorProfileCards'

export default function DoctorDetail({ navigation, route }) {
    const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const { data } = route.params;
    const [like, setLike] = useState(false)
    const [search, setSearch] = useState('')
    const [textShown, setTextShown] = useState(false)
    const [lengthMore, setLengthMore] = useState(false)

    const toggleNumberOfLines = () => {
        setTextShown(!textShown)
    }
    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 4)
    }, [])
    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={[styles.subContainer, { marginTop: 2 }]}>
                    <Header header={"Doctor Details"} leftIconName={"chevron-back"} rightIconName={"share-social-outline"} />
                </View>
                <AllDoctorProfileCards data={data} />
                <View style={styles.subContainer}>
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
                                <View style={{ width: 50, height: 50, backgroundColor: colorTheme.iconBackGroundColor, justifyContent: "center", alignItems: "center", borderRadius: 50 }}>
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
                        <View style={{ marginTop: 30 }}>
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
                    </View>
                </View>
                <View style={styles.subContainer}>
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
                    <UnderLine marginTop={15} />
                </View>
                <View style={styles.subContainer}>
                    <View style={{ height: "auto" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.bigText}>Address</Text>
                            <Text style={styles.blueText}>View on Map</Text>
                        </View>
                        <UnderLine marginTop={5} />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                            <Text style={styles.bigText}>Reviews</Text>
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
                        <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
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
                        <UnderLine marginTop={10} />
                        <DoctorRenameCard name={"Dale Thiel"} rating={4.9} time={22} />
                        <DoctorRenameCard name={"Tiffany Nitzsche"} rating={3.9} time={30} />

                    </View>
                </View>
            </ScrollView >
            <View style={{
                width: "100%",
                height: 60,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                elevation: 1,
                // backgroundColor:'white',
                justifyContent: "center",
                alignItems: "center"
            }}>
                <TouchableOpacity style={{ backgroundColor: blueText.color, width: "90%", height: 40, borderRadius: 50, justifyContent: "center" }} onPress={() => navigation.navigate('BookAppointment')}>
                    <Text style={[styles.smallText, { color: "white", alignSelf: 'center' }]}>Book Appointment</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.appBackGroundColor,
        // marginTop: 10,
    },
    subContainer: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: "white",
        marginTop: 20
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "red"
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
})