import axios from 'axios';
import store from '../store/';

class AxiosClient {
    constructor(baseUrl){
        this.baseUrl = baseUrl;
        this.client = axios.create({
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        })
        this.clientMultipartFormData = axios.create({
            headers:{
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
            }
        })
    }

    async post(url, data) {
        store.state.loading = true;
        return new Promise(() => {
            this.client.post(this.baseUrl + url, data)
            .then(
                store.state.loading = false
            )
            .catch(
                store.state.loading = false
            )
        })
    }

    async get(url, params) {
        store.state.loading = true;
        return new Promise(() => {
            this.client.get(this.baseUrl + url, {params: params})
            .then(
                store.state.loading = false
            )
            .catch(
                store.state.loading = false
            )
        })
    }

    async put(url, data) {
        store.state.loading = true;
        return new Promise(() => {
            this.client.put(this.baseUrl + url, data)
            .then(
                store.state.loading = false
            )
            .catch(
                store.state.loading = false
            )
        })
    }

    async delete(url, params) {
        store.state.loading = true;
        return new Promise(() => {
            this.client.delete(this.baseUrl + url, {params: params})
            .then(
                store.state.loading = false
            )
            .catch(
                store.state.loading = false
            )
        })
    }

    async postMultiPartForm(url, data){
        store.state.loading = true;
        return new Promise(() => {
            this.client.post(this.baseUrl + url, data)
            .then(
                store.state.loading = false
            )
            .catch(
                store.state.loading = false
            )
        })
        
    }
}

export default AxiosClient;