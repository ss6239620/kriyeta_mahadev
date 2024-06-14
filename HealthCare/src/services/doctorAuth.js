import axios from "axios";
import { API_URL } from "../constant";
import { setAuthAsyncStorage, setDocAsyncStorage } from "./getAuthAsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "./navRef";

async function Signup(username, email, password) {
    await AsyncStorage.setItem('isDoctor', JSON.stringify({ isdoctor: true }));
    console.log(username);
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/doctor/`, {
            name: username,
            email: email,
            password: password,
        }).then(async (res) => {
            try {
                await setAuthAsyncStorage(res)
                resolve(res)
            } catch (error) {
                reject(error)
            }
        }).catch((err) => {
            reject(err)
            console.log(err.response.data);
        })
    })
}
async function Login(email, password) {
    console.log('in login');
    await AsyncStorage.setItem('isDoctor', JSON.stringify({ isdoctor: true }));
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/doctor/login`, {
            email: email,
            password: password,
        }).then(async (response) => {
            try {
                await setAuthAsyncStorage(response)
                // console.log(response);
                resolve(response)
            } catch (e) { reject(e) }
        }).catch((err) => {
            console.log(err.response.data);
            reject(err)
        })
    })
}

async function ProfileComplete(uniqueid, specialization, experience, yrofgraduatio, type, loaction, about, fees, govno, phone,availibility,slot,days) {
    const token = await AsyncStorage.getItem("userToken");
    const body = {
        uniqueid: uniqueid,
        specialization: specialization,
        experience: experience,
        yrofgraduation: yrofgraduatio,
        type: type,
        loaction: loaction,
        about: about,
        fees: fees,
        govno: govno,
        number: phone,
        availibility:availibility,
        slot:slot,
        days:days
    }
    const config = {
        headers: {
            'auth-token': token,
        }
    }
    return new Promise((resolve, reject) => {
        console.log(token);
        axios.post(`${API_URL}/doctor/doctorinfo`, body, config
        ).then(async (response) => {
            try {
                // await setAuthAsyncStorage(response)
                console.log(response.data);
                resolve(response)
            } catch (err) {
                console.log();
                reject(e)
            }
        }).catch((err) => {
            console.log(err.response.data);
            reject(err)
        })
    })
}

export const doctorServices = {
    Signup, Login, ProfileComplete
}