import axios from "axios";


const BASE_URL = 'https://pixabay.com/api/';
const API_KEY ='31210662-8b396391b135a1b3bec6a0b8b';

export const useApi = ()=> {
    const fetchImages =  (query, page)=>{
        return  axios.get(`${BASE_URL}`, {
            params: {
                key: API_KEY,
                q: query,
                page: page,
                per_page: 12,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true",
            }}
            )
        }
        return { fetchImages };
}