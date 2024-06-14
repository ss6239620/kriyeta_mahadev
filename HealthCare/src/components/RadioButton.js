import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color, colorTheme } from '../constant'

export default function RadioButton({style,selected}) {
    return (
        <View style={[{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: colorTheme.primaryColor,
            alignItems: 'center',
            justifyContent: 'center',
        }, style]}>
            {
                selected ?
                    <View style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: colorTheme.primaryColor,
                    }} />
                    : null
            }
        </View>
    )
}

const styles = StyleSheet.create({})