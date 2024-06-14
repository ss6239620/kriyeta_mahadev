import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { blackText, blueText, colorTheme, grayText } from '../constant';

const getFormattedDate = (date) => {
    return date.getDate();
};

const HorizontalDate = () => {
    const today = new Date();
    const days = [];
    
    // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDayOfWeek = today.getDay();

    // Get the date for the previous Monday
    const previousMonday = new Date(today);
    previousMonday.setDate(previousMonday.getDate() - currentDayOfWeek + 1);

    // Push dates for the week starting from previous Monday
    for (let i = -1; i < 6; i++) {
        const currentDate = new Date(previousMonday);
        currentDate.setDate(previousMonday.getDate() + i);
        days.push(getFormattedDate(currentDate));
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentOffset={{ x: 1 * (41.2 + 5) }} // Adjusted the content offset to center the current date
        >
            {days.map((day, index) => (
                <View style={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    height: 60,
                    width: 41.2,
                    backgroundColor: index === currentDayOfWeek ? colorTheme.iconBackGroundColor : "white",
                    borderRadius: 50,
                    marginRight: 5
                }} key={index}>
                    <Text style={[index === currentDayOfWeek ? styles.blueText : styles.bigText, { marginTop: 5, }]}>{day}</Text>
                    <Text style={[styles.smallText, { marginBottom: 10, color: index === currentDayOfWeek ? blueText.color : grayText.color }]}>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index]}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorTheme.appBackGroundColor
    },
    subContainer: {
        width: "90%",
        height: "auto",
        alignSelf: "center",
        marginVertical: 20,
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
        padding: 5,
        borderWidth: 1,
        borderColor: "#d3d2d6",
        // height: 200,
        textAlignVertical: 'top',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 0.2,
        borderColor: "red"
    },
})

export default HorizontalDate;
