import AxiosClient from "./AxiosClient";

class CommonCodeApi {
    constructor(){
        this.client = new AxiosClient('/code');
    }

    async register(commonCode) {
        return this.client.post('/register', {commonCode : commonCode});
    }

    async list() {
        return this.client.post('/list');
    }

    async modify(commonCode) {
        return this.client.post('/modify', {commonCode : commonCode});
    }

    async remove(code) {
        const data = (await this.client.get('/find', {code: code})).data;
        return data;
    }
}

const instance = new CommonCodeApi();

export default instance;