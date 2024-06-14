import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ContactCard = ({ contact, setphoneNumber }) => {
    // Check if contact object is null or undefined
    const [isSelected, setIsSelected] = useState(false);

    function handlePress() {
        if (isSelected) {
            // If already selected, remove from list
            setphoneNumber(prevnum => prevnum.filter(number => number !== contact?.phoneNumbers[0]?.number));
        } else {
            // If not selected, add to list
            console.log('aaddred');
            setphoneNumber(prevnum => [...prevnum, contact?.phoneNumbers[0]?.number]);
        }
        setIsSelected(!isSelected);
    }

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.contactCon, isSelected && styles.selected]}>
            <View style={styles.imgCon}>
                <View style={styles.placeholder}>
                    <Text style={styles.txt}>{contact?.givenName?.[0]}</Text>
                </View>
            </View>
            <View style={styles.contactDat}>
                <Text style={styles.name}>
                    {contact?.givenName} {contact?.middleName && contact?.middleName + ' '}
                    {contact?.familyName}
                </Text>
                {contact?.phoneNumbers?.[0]?.number && (
                    <Text style={styles.phoneNumber}>
                        {contact?.phoneNumbers[0]?.number}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contactCon: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d9d9d9',
        marginTop:5
    },
    selected: {
        backgroundColor: '#ccc',
    },
    imgCon: {},
    placeholder: {
        width: 55,
        height: 55,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: '#d9d9d9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contactDat: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 5,
    },
    txt: {
        fontSize: 18,
    },
    name: {
        fontSize: 16,
    },
    phoneNumber: {
        color: '#888',
    },

});

export default ContactCard;
