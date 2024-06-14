import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getJWTToken() {
    const token = await AsyncStorage.getItem('userToken')
    return token
}

const value = {
    name: "Chimezie",
    job: "Software Developer"
};


export async function setAuthAsyncStorage(response) {
    console.log(response.data.jwtdata);
    try {
        await AsyncStorage.setItem("userToken", response.data.jwtdata);
    } catch (error) {
        console.log(error);
    }

    const savedUser = await AsyncStorage.getItem("userToken");
    
    console.log(savedUser);
}

export async function setDocAsyncStorage(response) {
    console.log(response.data.jwtdata);
    try {
        await AsyncStorage.setItem("doctorToken", response.data.jwtdata);
    } catch (error) {
        console.log(error);
    }

    const savedUser = await AsyncStorage.getItem("doctorToken");
    
    console.log('saved',savedUser);
}


export async function resetAuthAsyncStorage() {
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('userToken');
}

