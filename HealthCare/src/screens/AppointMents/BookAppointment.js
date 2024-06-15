import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { blackText, blueText, colorTheme, grayText } from '../../constant';
import Header from '../../components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AllDoctorProfileCards from '../../components/AllDoctorProfileCards';
import { appointmentServices } from '../../services/Appointment';


export default function BookAppointment({ navigation, route }) {
    const { data } = route.params;

    const [customSchedule, setCustomSchedule] = useState('');
    const [selectDay, setSelectDay] = useState(0);
    const [time, settime] = useState('');
    const [day, setday] = useState(data.days[0])
    const [notavailable, setnotavailable] = useState([])

    function fetchSlots() {
        appointmentServices.getSlotDetail(data.doctor._id, day).then(res => {
            setnotavailable(res.data)
        })
    }

    useEffect(() => {
        fetchSlots()
    }, [day])


    function handleSelect(day, index) {
        setSelectDay(index)
        setday(day)
    }

    function parseTimeString(time) {
        const [t, p] = time.split(/(AM|PM)/),
            [h, m] = t.split(':').map(Number);
        return new Date().setHours(
            (p === 'PM' && h !== 12 ? h + 12 : h % 12) || 0,
            m,
        );
    }

    function generate15MinBlocks(start, end, slot) {
        // console.log(slot,typeof slot);
        const temp = slot * 60000;
        let startTime = parseTimeString(start),
            endTime = parseTimeString(end),
            blocks = [];
        for (let t = startTime; t + temp <= endTime; t += temp)
            blocks.push([new Date(t), new Date(t + temp)]);
        return blocks;
    }

    function formatTime(date) {
        let h = date.getHours(),
            m = date.getMinutes(),
            ampm = h >= 12 ? 'PM' : 'AM';
        return `${h % 12 || 12}:${m < 10 ? '0' + m : m}${ampm}`;
    }

    const text = data.availibility.split(',');

    const timeSlot = data.slot.split(' ');
    

    // generate15MinBlocks(text[0], text[1],15).forEach(([s, e]) => console.log(`Start: ${formatTime(s)}, End: ${formatTime(e)}`));
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={[styles.subContainer]}>
                    <Header
                        header={'Book Appointment'}
                        leftIconName={'chevron-back'}
                        titleMargin={30}
                    />
                </View>
                <AllDoctorProfileCards data={data} />
                <View style={[styles.subContainer, { marginTop: 30 }]}>
                    <View style={{ height: 'auto' }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                            }}>
                            <View>
                                <View
                                    style={{
                                        width: 50,
                                        height: 50,
                                        backgroundColor: colorTheme.iconBackGroundColor,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 50,
                                    }}>
                                    <MaterialCommunityIcons
                                        name="account-group"
                                        color={colorTheme.primaryColor}
                                        size={30}
                                    />
                                </View>
                                <Text
                                    style={[
                                        styles.bigText,
                                        { color: blueText.color, textAlign: 'center' },
                                    ]}>
                                    7,500+
                                </Text>
                                <Text style={[styles.smallText, { textAlign: 'center' }]}>
                                    Patients
                                </Text>
                            </View>
                            <View>
                                <View
                                    style={{
                                        width: 50,
                                        height: 50,
                                        backgroundColor: colorTheme.iconBackGroundColor,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 50,
                                    }}>
                                    <MaterialCommunityIcons
                                        name="bag-checked"
                                        color={colorTheme.primaryColor}
                                        size={30}
                                    />
                                </View>
                                <Text
                                    style={[
                                        styles.bigText,
                                        { color: blueText.color, textAlign: 'center' },
                                    ]}>
                                    10+
                                </Text>
                                <Text style={[styles.smallText, { textAlign: 'center' }]}>
                                    Years Exp.
                                </Text>
                            </View>
                            <View>
                                <View
                                    style={{
                                        width: 50,
                                        height: 50,
                                        backgroundColor: colorTheme.iconBackGroundColor,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 50,
                                    }}>
                                    <MaterialCommunityIcons
                                        name="star"
                                        color={colorTheme.primaryColor}
                                        size={30}
                                    />
                                </View>
                                <Text
                                    style={[
                                        styles.bigText,
                                        { color: blueText.color, textAlign: 'center' },
                                    ]}>
                                    4.9+
                                </Text>
                                <Text style={[styles.smallText, { textAlign: 'center' }]}>
                                    Rating
                                </Text>
                            </View>
                            <View>
                                <View
                                    style={{
                                        width: 50,
                                        height: 50,
                                        backgroundColor: colorTheme.iconBackGroundColor,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 50,
                                    }}>
                                    <MaterialCommunityIcons
                                        name="comment-processing"
                                        color={colorTheme.primaryColor}
                                        size={30}
                                    />
                                </View>
                                <Text
                                    style={[
                                        styles.bigText,
                                        { color: blueText.color, textAlign: 'center' },
                                    ]}>
                                    4,956
                                </Text>
                                <Text style={[styles.smallText, { textAlign: 'center' }]}>
                                    Review
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.smallText, { lineHeight: 40, marginTop: 30 }]}>
                        Book Appointment
                    </Text>
                    <Text style={[styles.bigText, { fontWeight: '700', fontSize: 18 }]}>
                        Day
                    </Text>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={{ flexDirection: 'row', marginTop: 10 }}>
                        {data.days.map((day, index) => {
                            return (
                                <Pressable
                                    key={index}
                                    style={{
                                        width: 100,
                                        height: 40,
                                        borderWidth: 1,
                                        borderColor: colorTheme.borderColor,
                                        borderRadius: 15,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: 5,
                                        backgroundColor:
                                            index === selectDay ? colorTheme.primaryColor : 'white',
                                    }}
                                    onPress={() => { handleSelect(day, index) }}>
                                    <Text
                                        style={[
                                            styles.smallText,
                                            {
                                                fontWeight: '300',
                                                color: index === selectDay ? 'white' : 'black',
                                            },
                                        ]}>
                                        {day}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                    <Text
                        style={[
                            styles.bigText,
                            { fontWeight: '700', fontSize: 18, lineHeight: 30, marginTop: 10 },
                        ]}>
                        Time Slots
                    </Text>
                    {
                        generate15MinBlocks(text[0], text[1], Number(timeSlot[0])).map(
                            ([s, e], index) => {
                                const backgroundColor = notavailable.includes(`${formatTime(s)} - ${formatTime(e)}`) ? colorTheme.borderColor : 'white'
                                return (
                                    <View key={index}>
                                        {backgroundColor === 'white' ? <TouchableOpacity
                                            onPress={() => settime(`${formatTime(s)} - ${formatTime(e)}`)}
                                            style={[{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                borderWidth: 1,
                                                padding: 10,
                                                borderColor: `${formatTime(s)} - ${formatTime(e)}` === time ? colorTheme.primaryColor : colorTheme.borderColor,
                                                borderRadius: 10,
                                                marginBottom: 5,
                                                backgroundColor: backgroundColor
                                            }, {}]}>
                                            <Text style={[styles.smallText, { fontSize: 15 }]}>{`${formatTime(s)} - ${formatTime(e)}`}</Text>
                                            <Text>A</Text>
                                        </TouchableOpacity>:null}
                                        {backgroundColor === colorTheme.borderColor ? <View
                                            onPress={() => settime(`${formatTime(s)} - ${formatTime(e)}`)}
                                            style={[{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                borderWidth: 1,
                                                padding: 10,
                                                borderColor: `${formatTime(s)} - ${formatTime(e)}` === time ? colorTheme.primaryColor : colorTheme.borderColor,
                                                borderRadius: 10,
                                                marginBottom: 5,
                                                backgroundColor: backgroundColor
                                            }, {}]}>
                                            <Text style={[styles.smallText, { fontSize: 15 }]}>{`${formatTime(s)} - ${formatTime(e)}`}</Text>
                                            <Text>A</Text>
                                        </View>:null}
                                    </View>
                                )
                            },
                        )}
                    <View style={styles.textInput}>
                        <View>
                            <TextInput
                                placeholder="Want a custom schedule?"
                                onChangeText={setCustomSchedule}
                                value={customSchedule}
                                style={{ height: 48, width: '92%' }}
                            />
                        </View>
                        <Text style={[styles.blueText, { fontSize: 14 }]}>
                            Request Schedule
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View
                style={{
                    width: '100%',
                    height: 70,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    elevation: 1,
                    // backgroundColor:'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: blueText.color,
                        width: '90%',
                        height: 40,
                        borderRadius: 50,
                        justifyContent: 'center',
                    }}
                    onPress={() => navigation.navigate('SelectAppointmentPackage', { data: { slot: time, data: data, day: day } })}>
                    <Text
                        style={[styles.smallText, { color: 'white', alignSelf: 'center' }]}>
                        Make Appointment
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.appBackGroundColor,
    },
    subContainer: {
        width: '90%',
        height: 'auto',
        alignSelf: 'center',
    },
    bigText: {
        fontSize: blackText.fontSize,
        color: blackText.color,
        fontWeight: blackText.fontWeight,
    },
    smallText: {
        fontSize: grayText.fontSize,
        color: grayText.color,
        fontWeight: grayText.fontWeight,
    },
    blueText: {
        fontSize: blueText.fontSize,
        color: blueText.color,
        fontWeight: blueText.fontWeight,
    },
    textInput: {
        height: 40,
        borderRadius: 50,
        backgroundColor: colorTheme.backgroundColor,
        padding: 7,
        borderWidth: 1,
        borderColor: colorTheme.borderColor,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        justifyContent: 'space-between',
    },
});
