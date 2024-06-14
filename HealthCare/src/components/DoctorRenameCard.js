import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UnderLine from './UnderLine'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function DoctorDetailCard(props) {
    return (
        <View>
            <View style={{ flexDirection: "row", marginTop: 15, justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Image source={require('../assets/img/health.jpg')} resizeMode='contain' style={[styles.image, { width: 40, height: 40 }]} />
                    <Text style={[styles.smallText, { color: "black", fontWeight: "500", marginLeft: 10 }]}>{props.name}</Text>
                </View>
                <View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <MaterialCommunityIcons name="star" color={"#EF802F"} size={30} />
                        <Text style={[styles.smallText, { color: "black", fontWeight: "500", marginLeft: 2 }]}>{props.rating}</Text>
                    </View>
                    <Text style={[styles.smallText, { fontSize: 12 }]}>{props.time} months ago</Text>
                </View>
            </View>
            <Text style={[styles.smallText, { fontSize: 12 }]}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe, totam quos ipsam debitis ratione sint et voluptate harum! Officiis molestias atque impedit dolor totam modi neque laborum dicta, ducimus eos!
            </Text>
            <UnderLine marginTop={10} />
        </View>
    )
}

const styles = StyleSheet.create({})