import AxiosClient from "./AxiosClient";

class CommonCodeApi {
    constructor(){
        this.client = new AxiosClient('/code');
    }

    async register(commonCode) {
        return await this.client.post('/register', {commonCode : commonCode});
    }

    async list() {
        return await this.client.post('/list');
    }

    async modify(commonCode) {
        return await this.client.post('/modify', {commonCode : commonCode});
    }

    async remove(code) {
        //const data = (await this.client.get('/find', {code: code})).data;
        return await this.client.get('/remove', {code: code});
    }

    async dropdown() {
        //const data = (await this.client.get('/find', {code: code})).data;
        return await this.client.get('/dropdown');
    }
    
}

const instance = new CommonCodeApi();

export default instance;