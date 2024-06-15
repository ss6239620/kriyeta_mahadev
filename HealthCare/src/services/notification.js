import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constant';

async function register() {
    console.log('in fetchalldoc');
    const jwtToken = await AsyncStorage.getItem("userToken");
    const token = await messaging().getToken();
    const body= {
        token:token
    }
    console.log(token);
    const config = {
        headers: {
            'auth-token': jwtToken,
        }
    }
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/firebase/register`,body, config
        ).then(async (response) => {
            try {
                resolve(response)
            } catch (err) {
                console.log(err);
                reject(e)
            }
        }).catch((err) => {
            console.log(err.response.data);
            reject(err)
        })
    })
}

export const  notificationServices={
    register
}