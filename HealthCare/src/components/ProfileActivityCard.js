import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colorTheme } from '../constant'

export default function ProfileActivityCard() {
    return (
        <View style={[styles.subContainer, { marginTop: 10, height: 96, backgroundColor: "white", borderRadius: 20 }]}>
            <View style={{ margin: 15 }}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', height: 32, alignItems: "center" }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 32, height: 32, backgroundColor: colorTheme.iconBackGroundColor, justifyContent: "center", alignItems: "center", borderRadius: 10, marginRight: 10 }}>
                            <MaterialIcons name="date-range" size={20} color={colorTheme.primaryColor} />
                        </View>
                        <Text style={{ fontSize: 15, color: 'black', fontWeight: '600', marginTop: 5 }}>Medical History</Text>
                    </View>
                    <View style={{ width: 96, height: 30, borderRadius: 50, backgroundColor: colorTheme.primaryColor, justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: '400', color: "white", marginRight: 5 }}>Read</Text>
                        <MaterialIcons name="arrow-forward-ios" size={15} color={"white"} />
                    </View>
                </View>
                <View style={{ marginTop: 15 }}>
                    <Text style={{ fontSize: 15, fontWeight: "500" }}>Check Your All Medical History</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    subContainer: {
        // backgroundColor: "red",
        width: "90%",
        alignSelf: "center",
        elevation:2
      }
})