import axios from "axios";
import { API_AIML_URL } from "../constant";

async function ChatBot(query) {
    console.log(query);
    const body = {
        query: query
    }

    return new Promise((resolve, reject) => {
        axios.post(`${API_AIML_URL}/ask`, body)
            .then(async (response) => {
                try {
                    // console.log(response.data);
                    // console.log(response);
                    resolve(response)
                } catch (e) { reject(e) }
            }).catch((err) => {
                console.log(err.response.data);
                reject(err)
            })
    })
}

export const mlservices = { ChatBot }