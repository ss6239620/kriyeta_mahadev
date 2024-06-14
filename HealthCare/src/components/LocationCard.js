import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { grayText, colorTheme } from '../constant'
import UnderLine from './UnderLine'

export default function LocationCard() {
    return (
        <View style={{ backgroundColor: "white", elevation: 2, borderRadius: 10,marginTop:10 }}>
            <View style={{ margin: 15, justifyContent: "flex-start", alignItems: "center", flexDirection: 'row', marginTop: 5 }}>
                <View>
                    <MaterialIcons name={"location-on"} size={30} color={colorTheme.primaryColor} style={{ marginRight: 10 }} />
                    <Text>1.5Km</Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={[styles.smallText, { color: "black", fontSize: 15 }]}>Golden Avenue</Text>
                    <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    smallText: {
        fontSize: grayText.fontSize,
        color: grayText.color,
        fontWeight: grayText.fontWeight
      },
})