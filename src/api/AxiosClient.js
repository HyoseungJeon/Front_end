import axios from 'axios';
import store from '../store/';

let CancelToken = axios.CancelToken;
let source = null;

class AxiosClient {
    constructor(baseUrl){
        this.baseUrl = baseUrl;
        this.client = axios.create({
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
            ,timeout : 5000
        })
        this.multipartFormDataClient = axios.create({
            headers:{
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
            },
        })
        this.excelClient = axios.create({
            responseType: 'blob',
        })
    }

    async post(url, data) {
        store.state.loading = true;
        return new Promise((resolve, reject) => {
            if(!source){
                source = CancelToken.source();
            }else{
                source.cancel();
                source = CancelToken.source();
            }
            this.client.post(this.baseUrl + url, data, {cancelToken : source.token})
            .then(response => {
                store.state.loading = false;
                resolve(response);
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    return;
                }
                store.state.loading = false
                reject(error);
            })
        })
    }

    async get(url, params) {
        store.state.loading = true;
        return new Promise((resolve, reject) => {
            if(!source){
                source = CancelToken.source();
            }else{
                source.cancel();
                source = CancelToken.source();
            }
            this.client.get(this.baseUrl + url, {params: params,
            cancelToken : source.token})
            .then(response => {
                store.state.loading = false;
                resolve(response);
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    return;
                }
                store.state.loading = false;
                reject(error);
            })
        })
    }
    
    async put(url, data) {
        store.state.loading = true;
        return new Promise((resolve, reject) => {
            if(!source){
                source = CancelToken.source();
            }else{
                source.cancel();
                source = CancelToken.source();
            }
            this.client.put(this.baseUrl + url, data, {cancelToken : source.token})
            .then(response => {
                store.state.loading = false;
                resolve(response);
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    return;
                }
                store.state.loading = false
                reject(error);
            })
        })
    }

    async delete(url, params) {
        store.state.loading = true;
        return new Promise((resolve, reject) => {
            if(!source){
                source = CancelToken.source();
            }else{
                source.cancel();
                source = CancelToken.source();
            }
            this.client.delete(this.baseUrl + url, {params: params,
            cancelToken : source.token})
            .then(response => {
                store.state.loading = false;
                resolve(response);
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    return;
                }
                store.state.loading = false
                reject(error);
            })
        })
    }

    async postMultiPartForm(url, data){
        store.state.loading = true;
        return new Promise((resolve, reject) => {
            if(!source){
                source = CancelToken.source();
            }else{
                source.cancel();
                source = CancelToken.source();
            }
            this.multipartFormDataClient.post(this.baseUrl + url, data, {cancelToken : source.token})
            .then(response => {
                store.state.loading = false;
                resolve(response);
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    return;
                }
                store.state.loading = false
                reject(error);
            })
        })
    }

    async postExceltype(url, data){
        store.state.loading = true;
        return new Promise((resolve, reject) => {
            if(!source){
                source = CancelToken.source();
            }else{
                source.cancel();
                source = CancelToken.source();
            }
            this.excelClient.post(this.baseUrl + url, data, {cancelToken : source.token})
            .then(response => {
                store.state.loading = false;
                resolve(response);
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    return;
                }
                store.state.loading = false
                reject(error);
            })
        })
    }
}


export default AxiosClient;