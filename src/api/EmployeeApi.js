import AxiosClient from "./AxiosClient";

class EmployeeApi {
    constructor(){
        this.client = new AxiosClient('/employee');
    }

    async register(employee) {
        return this.client.post('/register', employee);
    }

    async find(employeeId) {
        //const data = (await this.client.get('/find', {employeeId: employeeId})).data;
        return await this.client.get('/find', {employeeId: employeeId});
    }

    async list(condition) {
        return this.client.post('/list', condition);
    }

    async modify(employee) {
        return this.client.post('/modify', employee);
    }

    async retire(employeeId) {
        return this.client.post('/retire', {employeeId: employeeId});
    }
    
    async remove(employeeId) {
        //const data = (await this.client.get('/remove', {employeeId: employeeId})).data;
        return await this.client.get('/remove', {employeeId: employeeId});
    }
}

const instance = new EmployeeApi();

export default instance;