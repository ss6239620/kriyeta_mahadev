import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colorTheme, blackText, blueText, grayText } from '../../constant'
import Header from '../../components/Header'


export default function Template() {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.subContainer} showsVerticalScrollIndicator={false}>
                <Header leftIconName header={'Privacy Policy'} titleMargin={25} />
                <Text style={[styles.bigText, { color: colorTheme.primaryColor, marginTop: 20 }]}>Cancelation Policy</Text>
                <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio consequatur provident rerum ad voluptatem atque amet blanditiis similique quod veritatis magnam, ut itaque maiores exercitationem in adipisci rem suscipit. Et.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio consequatur provident rerum ad voluptatem atque amet blanditiis similique quod veritatis magnam
                </Text>
                <Text style={[styles.bigText, { color: colorTheme.primaryColor, marginTop: 20 }]}>Terms & Conditions</Text>
                <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio consequatur provident rerum ad voluptatem atque amet blanditiis similique quod veritatis magnam, ut itaque maiores exercitationem in adipisci rem suscipit. Et.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, atque ipsam voluptates possimus a quisquam animi, laudantium, cumque nulla ut doloribus ea voluptate in? Minus aspernatur illo eum officia quibusdam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, atque ipsam voluptates possimus a quisquam animi, laudantium, cumque nulla ut doloribus ea voluptate in? Minus aspernatur illo eum officia quibusdam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, atque ipsam voluptates possimus a quisquam animi, laudantium, cumque nulla ut doloribus ea voluptate in? Minus aspernatur illo eum officia quibusdam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, atque ipsam voluptates possimus a quisquam animi, laudantium, cumque nulla ut doloribus ea voluptate in? Minus aspernatur illo eum officia quibusdam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, atque ipsam voluptates possimus a quisquam animi, laudantium, cumque nulla ut doloribus ea voluptate in? Minus aspernatur illo eum officia quibusdam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, atque ipsam voluptates possimus a quisquam animi, laudantium, cumque nulla ut doloribus ea voluptate in? Minus aspernatur illo eum officia quibusdam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, atque ipsam voluptates possimus a quisquam animi, laudantium, cumque nulla ut doloribus ea voluptate in? Minus aspernatur illo eum officia quibusdam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, atque ipsam voluptates possimus a quisquam animi, laudantium, cumque nulla ut doloribus ea voluptate in? Minus aspernatur illo eum officia quibusdam.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, atque ipsam voluptates possimus a quisquam animi, laudantium, cumque nulla ut doloribus ea voluptate in? Minus aspernatur illo eum officia quibusdam.
                </Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.appBackGroundColor
    },
    subContainer: {
        width: "90%",
        height: "auto",
        alignSelf: "center",
        // backgroundColor:"red"
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
        borderRadius: 10,
        backgroundColor: "white",
        padding: 7,
        borderWidth: 1,
        borderColor: "#d3d2d6",
        height: 200,
        textAlignVertical: 'top',
    },
})