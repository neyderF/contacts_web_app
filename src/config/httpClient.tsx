import axios from "axios";

export const httpClient = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 30000,
    headers: {
        "Content-Type": "application/json", // content type
        'Accept': '*/*'
    }
});


export const authToken = (token: string | null) => {
    if (token) {
        httpClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {

        delete httpClient.defaults.headers.common["Authorization"];
    }

}
