import axios from "axios"
import { API_URL } from "../constant"
import { getJWTToken, resetAuthAsyncStorage, setAuthAsyncStorage } from "./getAuthAsyncStorage"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { navigate } from "./navRef"


async function Login(email, password) {
    await AsyncStorage.setItem('isDoctor', JSON.stringify({ isdoctor: false }))
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/user/login`, {
            email: email,
            password: password,
        }).then(async (response) => {
            try {
                await setAuthAsyncStorage(response)
                // console.log(response);
                resolve(response)
            } catch (e) { reject(e) }
        }).catch((err) => {
            reject(err)
        })
    })
}

async function Logout(getState) {
    return new Promise((resolve, reject) => {
        const currestState = getState();
        const { token } = currestState.auth;
        axios.get(`${API_URL}/user/logout`, {
            headers: {
                'auth-token': { token },
            },
        }).then(async (res) => {
            resolve(res);
            await resetAuthAsyncStorage();
        }).catch((err) => reject(err));
    })
}

async function Signup(username, email, password) {
    await AsyncStorage.setItem('isDoctor', JSON.stringify({ isdoctor: false }))
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/user`, {
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

async function ForgotPassword(email) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/user/forgotPassword`, {
            email: email
        }).then(async (res) => {
            try {
                resolve(res)
            } catch (error) {
                reject(error)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

async function VerifyToken(email, token) {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/user/verify`, {
            email: email,
            userToken: token
        }).then(async (res) => {
            try {
                resolve(res)
            } catch (error) {
                reject(error)
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

async function ProfileComplete(bloodGroup, age, gender, phone) {
    console.log('in profile');
    const token = await AsyncStorage.getItem("userToken");
    const body = {
        bloodgroup: gender,
        age: age,
        gender: bloodGroup,
        number: phone
    }
    const config = {
        headers: {
            'auth-token': token,
        }
    }
    return new Promise((resolve, reject) => {

        console.log(token);
        axios.post(`${API_URL}/user/updateuser`, body, config
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

async function OlddiseaseForm(deases, from, consultation, isrecovered) {
    console.log('in OLDDISEASE');
    const token = await AsyncStorage.getItem("userToken");
    const body = {
        deases: "AB",
        from: "10",
        consultation: "10",
        isrecovered: "male"
    }
    const config = {
        headers: {
            'auth-token': token,
        }
    }
    return new Promise((resolve, reject) => {
        console.log(token);
        axios.post(`${API_URL}/user/updateuserdeases`, body, config
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

export const userServices = {
    Logout, Login, Signup, ForgotPassword, VerifyToken, ProfileComplete, OlddiseaseForm
}