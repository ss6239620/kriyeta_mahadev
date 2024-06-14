import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { colorTheme } from '../../constant'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function TimeTextInput({ inputTitle, isRequire, style, isiconRequire,textInputParams,handleChange }) {
    const [date, setdate] = useState(new Date())
    const [show, setshow] = useState(false)
    const [text, setText] = useState('')

    function onChange(event, selectedDate) {
        setshow(false); // Close the modal after selecting date
        const currentDate = selectedDate || date;
        setdate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate =  tempDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        setText(fDate);
        handleChange(textInputParams, fDate);
    }

    return (
        <View>
            <View style={{ ...style }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: colorTheme.blue, fontSize: 15, fontWeight: '400', marginLeft: 5 }}>{inputTitle}</Text>
                    {isRequire &&
                        <Text style={{ color: 'red', marginLeft: 5 }}>*</Text>
                    }
                    {
                        isiconRequire && <MaterialCommunityIcons name={'alert-circle-outline'} color={"black"} size={20} style={{marginLeft:5}} />
                    }
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: colorTheme.borderColor, borderBottomWidth: 1 }} onPress={() => setshow(true)}>
                    <Text style={{ marginLeft: 5,color:'gray',fontSize:15,fontWeight:'400' }}>{text === '' ? 'Enter Date' : text}</Text>
                    <MaterialCommunityIcons name={'clock-time-four'} color={colorTheme.primaryColor} size={25} style={{ padding: 5 }} onPress={() => setshow(true)} />
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                    testId='dateTimePicker'
                    value={date}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({})
