import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {  colorTheme } from '../constant'

export default function UnderLine({marginTop}) {
    return (
        <View style={{ backgroundColor: colorTheme.borderColor, height: 1, marginTop: marginTop }} />
    )
}

const styles = StyleSheet.create({})