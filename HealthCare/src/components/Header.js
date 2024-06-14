import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { blackText, colorTheme } from '../constant'
import { useNavigation } from '@react-navigation/native';

export default function Header({ header, leftIconName, rightIconName, titleMargin, textColor, marginTop, children: Children, childrenStyle, isModal, setModalVisible }) {
    const navigation = useNavigation()
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", height: 48, alignItems: 'center', marginTop: marginTop ? marginTop : 5, }}>
            {leftIconName
                ?
                <Pressable
                    onPress={() => { isModal ? setModalVisible(false) : navigation.goBack() }}
                    style={{ width: 35, height: 35, backgroundColor: "white", justifyContent: "center", alignItems: "center", borderRadius: 50, borderWidth: 1, borderColor: colorTheme.borderColor }}>
                    <Ionicons name={"arrow-back"} size={20} color={colorTheme.primaryColor} />
                </Pressable>
                :
                null
            }
            {
                header ?
                    <Text style={{ fontSize: 17, fontWeight: "600", color: textColor ? textColor : blackText.color, textAlign: "center", marginRight: titleMargin, flexGrow: 1 }}>{header}</Text>
                    :
                    <View style={{ ...childrenStyle }}>
                        <Children />
                    </View>
            }
            {rightIconName
                ?
                <View style={{ width: 35, height: 35, backgroundColor: "white", justifyContent: "center", alignItems: "center", borderRadius: 50, borderWidth: 1, borderColor: colorTheme.borderColor }}>
                    <Ionicons name={rightIconName} size={25} color={colorTheme.primaryColor} />
                </View>
                :
                null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    // subContainer: {
    //     // backgroundColor: "red",
    //     width: "90%",
    //     alignSelf: "center",
    //     marginTop: 10
    // }
})