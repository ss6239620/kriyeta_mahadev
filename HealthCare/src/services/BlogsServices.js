import axios from "axios";
import { API_URL } from "../constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function PostBlog(title, titleBody) {
    console.log('inside blogs');
    const token = await AsyncStorage.getItem("doctorToken");
    console.log(token);
    const body = {
        "title":"65cb89c7c108c144e836d1f0",
        "description":"65cb89c7c108c144e836d1f0"
      }
    const config = {
        headers: {
            'auth-token': token,
        }
    }

    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/blog/postblog`,body,config)
            .then(async (response) => {
                try {
                    console.log(response.data);
                    // console.log(response);
                    resolve(response)
                } catch (e) { reject(e) }
            }).catch((err) => {
                console.log(err.response.data);
                reject(err)
            })
    })
}

export const BlogServices = { PostBlog }