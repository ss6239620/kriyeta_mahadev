import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, } from 'react-native';
import { blackText, blueText, colorTheme, grayText } from '../../constant';
import Header from '../Header';
import DoctorProfileCard from '../DoctorProfileCard';
import HospitalProfileCard from '../HospitalProfileCard';


const TopHospitalModal = ({ modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Header leftIconName header={'Top Hospitals'} rightIconName={'search'} isModal setModalVisible={setModalVisible} />
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ flexDirection: "row", marginTop: 30 }}>
                        <TouchableOpacity style={{ borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 15, justifyContent: "center", alignItems: "center", marginRight: 5, flexDirection: "row" }}>
                            <Text style={[styles.smallText, { fontWeight: '500', paddingHorizontal: 15 }]}>All</Text>
                        </TouchableOpacity>
                        {[1, 2, 3, 4, 5].map((num, index) => {
                            return (
                                <TouchableOpacity style={{ borderWidth: 1, borderColor: colorTheme.borderColor, borderRadius: 15, justifyContent: "center", alignItems: "center", marginRight: 5, }} key={index}>
                                    <Text style={[styles.smallText, { fontWeight: '500', paddingHorizontal: 20, paddingVertical: 5 }]}>Filter</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
                {/* Main Content */}
                <ScrollView showsVerticalScrollIndicator={false} >
                    {[1, 2, 3, 4].map((_, index) => (
                        <View key={index}style={{ marginTop:10 }}>
                            <HospitalProfileCard   />
                        </View>
                    ))}
                </ScrollView>
                {/* Footer */}
                <View style={styles.footer}>
                </View>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colorTheme.appBackGroundColor,
        flex: 1,
        justifyContent: 'space-between',
    },
    header: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 5
    },
    content: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
    },
    footer: {
        padding: 10,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center'
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
    image: {
        width: 110,
        height: 110,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: colorTheme.primaryColor
    },
});

export default TopHospitalModal;
