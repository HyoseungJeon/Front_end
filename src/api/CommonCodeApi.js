import AxiosClient from "./AxiosClient";

class CommonCodeApi {
    constructor(){
        this.client = new AxiosClient('/api/code');
    }

    async save(commonCodeList) {
        return await this.client.post('/save', commonCodeList);
    }

    async list() {
        return await this.client.post('/list');
    }

    async dropdown() {
        return await this.client.get('/dropdown');
    }
    
}

const instance = new CommonCodeApi();

export default instance;