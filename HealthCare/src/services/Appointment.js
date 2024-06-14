import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../constant";
import { navigate } from "./navRef";

async function BookAppointment() {
    console.log('in BookAppointment');
    const token = await AsyncStorage.getItem("userToken");
    const body = {
        doctor: "6630f4d40688518c76cf8e1d",
        date: "10",
        time: "male",
        customschedule: "male",
        package: "male",
        duration: "male",
        problem: "male"
    }
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
                console.log(response.data);
                resolve(response)
                navigate('PaymentMethod')
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

export const appointmentServices = {
    BookAppointment,fetchAllDoc
}