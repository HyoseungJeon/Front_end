import AxiosClient from "./AxiosClient";

class CommonCodeApi {
    constructor(){
        this.client = new AxiosClient('/code');
    }

    async save(commonCodeList) {
        return await this.client.post('/save', commonCodeList);
    }

    async list() {
        return await this.client.post('/list');
    }

    async dropdown() {
        //const data = (await this.client.get('/find', {code: code})).data;
        return await this.client.get('/dropdown');
    }
    
}

const instance = new CommonCodeApi();

export default instance;