import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../constant";
import { navigate } from "./navRef";

async function BookAppointment(id, time, packages, duration, problem, slot, days) {
    console.log('in BookAppointment');
    console.log('yyyy', days);
    const token = await AsyncStorage.getItem("userToken");
    const body = {
        doctor: id,
        date: "10", //null
        time: time,
        customschedule: "No", //null
        package: packages, //fix
        duration: duration,
        problem: problem, //fixed
        days: days,
        slot: slot,
    }
    // console.log('gddg',typeof days);
    const config = {
        headers: {
            'auth-token': token,
        }
    }
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/user/bookappoinment`, body, config
        ).then(async (response) => {
            try {
                // await setAuthAsyncStorage(response)
                // console.log(response.data);
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

async function fetchAllDoc() {
    console.log('in fetchalldoc');
    const token = await AsyncStorage.getItem("userToken");
    const config = {
        headers: {
            'auth-token': token,
        }
    }
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/user/fetchalldoctors`, config
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

async function acceptReject(id,message) {
    console.log('in acceptReject');
    const token = await AsyncStorage.getItem("doctorToken");
    const body={
        id:id,
        mssg:message
    }
    const config = {
        headers: {
            'auth-token': token,
        }
    }
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/doctor/acceptreject`, body,config
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

async function getSlotDetail(id,days) {
    console.log('in fetchalldoc');
    const token = await AsyncStorage.getItem("userToken");
    const body={
        doctor:id,
        days:days
    }
    const config = {
        headers: {
            'auth-token': token,
        }
    }
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/user/getslotdetail`, body,config
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


export const appointmentServices = {
    BookAppointment, fetchAllDoc, getSlotDetail,acceptReject
}