import axios from 'axios';

class AxiosClient {
    constructor(baseUrl){
        this.baseUrl = baseUrl;
        this.client = axios.create({
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        })
    }

    async post(url, data) {
        return this.client.post(this.baseUrl + url, data);
    }

    async get(url, params) {
        return this.client.get(this.baseUrl + url, {params: params});
    }

    async put(url, data) {
        return this.client.put(this.baseUrl + url, data)
    }

    async delete(url, params) {
        return this.client.delete(this.baseUrl + url, {params: params});
    }
}

export default AxiosClient;