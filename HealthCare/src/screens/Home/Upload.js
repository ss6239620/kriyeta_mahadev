import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { BACKEND_URL } from '../constant';
import axios from 'axios';

export default function Upload() {
    const [selectImage, setselectedImage] = useState('')
    const [numberOfTreeCount, setnumberOfTreeCount] = useState('')
    const [photo, setphoto] = useState(null)
    const navigation = useNavigation();
    let options = {
        storageOptions: {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
        }
    }

    async function handleClick(params) {
        try {
            const formData = new FormData();
            formData.append('image', {
                name: photo.fileName,
                type: photo.type,
                uri: selectImage
            });
            console.log(formData);
            const res = await axios({
                method: "POST",
                url: `${BACKEND_URL}/ml/count/`,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: formData // Use data instead of datas
            });
            setnumberOfTreeCount(res.data.object_count)
        } catch (error) {
            console.log(error);
        }
    }

    const ImagePicker = () => {
        launchImageLibrary(options, response => {
            setselectedImage(response.assets[0].uri)
            setphoto(response.assets[0])
            console.log("imagepath-->", selectImage)
            console.log("filename", response.assets[0].fileName)
        })
    }
    return (
        <View style={styles.container}>
            <View style={{ marginTop: 20 }}>
                <Text style={styles.heading}>Upload Image For Processing...</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => { ImagePicker(); }}>
                    <Text style={styles.buttonText}>UPLOAD</Text>
                </TouchableOpacity>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.treeButton} onPress={handleClick}>
                        <Text style={{ fontSize: 12, color: 'black', fontWeight: 'bold' }}>TREE COUNT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.additionalButton} onPress={() => { /* Handle green cover action */ }}>
                        <Text style={{ fontSize: 12, color: 'black', fontWeight: 'bold' }}>GREEN COVER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fireButton} onPress={() => { /* Handle fire detection action */ }}>
                        <Text style={{ fontSize: 12, color: 'black', fontWeight: 'bold' }}>FIRE DETECTION</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ display: 'flex', justifyContent: 'center', marginTop: 10, height: 400, width: '100%' }}>
                <Image style={{ marginLeft: 10, height: 300, width: 375 }} source={{ uri: selectImage }} />
            </View>
            {numberOfTreeCount && <Text style={{ marginTop: -45, color: 'red', fontSize: 19, fontWeight: '600' }}>{numberOfTreeCount}</Text>}
            <Text style={styles.quote}> "Plant a tree for tomorrow!!" </Text>
            <View style={styles.container}>
                <View style={styles.tabContainer}>
                    <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('friend')}>
                        <Ionicons name="logo-wechat" size={25} color='white' />
                        <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'white' }}>TreeBot</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('plant')}>
                        <Entypo name="tree" size={25} color="white" />
                        <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'white' }}>Tree</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('map')}>
                        <MaterialIcons name="settings" size={25} color="white" />
                        <Text style={{ fontSize: 10, fontWeight: 'bold', color: 'white' }}>Settings</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    heading: {
        marginLeft: 35,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    },
    buttonContainer: {
        marginLeft: 125,
        justifyContent: 'center',
        marginTop: 10,
        width: '80%',
        borderRadius: 5,
        backgroundColor: '#71b637',
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: 10,
        width: '95%',
        height: 50,
        backgroundColor: '#71b637',
        elevation: 10,
        borderRadius: 15,
        position: 'absolute',
        marginBottom: 10,
        bottom: 0,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        color: '#71b637',
        fontSize: 10,
    },
    treeButton: {
        marginTop: 20,
        marginRight: 5,
        borderRadius: 5,
        backgroundColor: '#71b637',
        padding: 10,
        alignItems: 'center',
    },
    additionalButton: {
        marginTop: 20,
        marginLeft: 2,
        borderRadius: 5,
        backgroundColor: '#71b637',
        padding: 10,
        alignItems: 'center',
    },
    fireButton: {
        marginTop: 20,
        marginLeft: 7,
        borderRadius: 5,
        backgroundColor: '#71b637',
        padding: 10,
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    quote: {
        marginTop: 100,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#71b637',
        textAlign: 'center',
    }
});
