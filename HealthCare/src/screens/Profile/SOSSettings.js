import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import ContactCard from '../../components/ContactCard';
import { colorTheme } from '../../constant';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactsList = () => {
    const [contacts, setContacts] = useState([]);
    const [phoneNumber, setphoneNumber] = useState([]);

    useEffect(() => {
        async function handlePermission(params) {
            const checkPemission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
            if (!checkPemission) {
                let status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
                if (status === 'denied' || status === 'never_ask_again') {
                    throw Error('Permissions not granted to access Contacts')
                }
                Contacts.getAll().then(contacts => {
                    setContacts(contacts);
                });
            } else {
                console.log("Permission already granted");
                Contacts.getAll().then(contacts => {
                    setContacts(contacts);
                });
            }
        }
        handlePermission()
    }, []);

    async function handleUpdate() {
        try {
            const updatedPhoneNumbers = phoneNumber.map(num => num.replace(/\s/g, ''));
            await AsyncStorage.setItem("SOSNumber", JSON.stringify({ phoneNumber: updatedPhoneNumbers }));
            console.log('number Saved');
        } catch (error) {
            console.log(error);
        }
    }

    const keyExtractor = (item, idx) => {
        return item?.recordID?.toString() || idx.toString();
    };

    const renderItem = ({ item, index }) => {
        return <ContactCard contact={item} setphoneNumber={setphoneNumber} />;
    };

    const isSaveDisabled = phoneNumber.length === 0;

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Header leftIconName header={'SOS Settings'} titleMargin={30} />
                <FlatList
                    data={contacts}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    style={styles.list}
                />
                <TouchableOpacity
                    onPress={handleUpdate}
                    style={[styles.footerButton, isSaveDisabled && styles.disabledButton]}
                    disabled={isSaveDisabled}
                >
                    <Text style={styles.footerButtonText}>Save Emergency Contact</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        // marginTop: 10,
    },
    footerButton: {
        position: 'absolute',
        bottom: 70,
        alignSelf: 'center',
        backgroundColor: colorTheme.primaryColor,
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    footerButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    container: {
        flex: 1,
        backgroundColor: colorTheme.appBackGroundColor
    },
    subContainer: {
        width: "90%",
        height: "auto",
        alignSelf: "center",
    },
});

export default ContactsList;
