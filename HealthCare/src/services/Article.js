import axios from "axios"
import { HEALTH_NEWS_API_KEY } from "../constant";

function FetchArticles() {
    return new Promise((resolve, reject) => {
        axios.get(
            `
            https://newsapi.org/v2/everything?q=heart&pageSize=10&sortBy=publishedAt&apiKey=bbccd839479b4090953b15b61a3b35fb`
        ).then(async (response) => {
            try {
                resolve(response)
            } catch (e) { reject(e) } 
        }).catch((err) => {
            reject(err)
        })
    })
}


export const articlesServices={
    FetchArticles
}