import { EmployeeApi } from "@/api"
import { Employee } from "@/model";

const EmployeeStore = {
    state : {
        registerEmployee : new Employee(),
        employee : new Employee(),
        employeeList : [],
    },
    getters : {
        getRegisterEmployee : (state) => {
            return state.registerEmployee;
        },
        getEmployee : (state) => {
            return state.employee;
        },
        getEmployeeList : (state) => {
            return state.employeeList;
        }
    },
    mutations : {
        setEmployee : (state, payload) => {
            state.employee = payload;
        },
        setEmployeeList : (state, payload) => {
            state.employeeList = payload;
        },
        updateEmployee : (state, payload) => {
            state.employee = payload;
        },
        retireEmployee : (state, payload) => {
            state.employee = payload;

        },
    },
    actions : {
        register(context, employee){
            
            return new Promise((resolve, reject) => {
                EmployeeApi.register(employee)
                .then(response => {
                    resolve(response.status);
                })
                .catch(error =>{
                    reject(error);
                })
            })
        },
        find({commit}, employeeId){
            return new Promise((resolve, reject) => {
                EmployeeApi.find(employeeId)
                .then(response =>{
                    commit('setEmployee', response.data);
                    resolve(response.status);
                })
                .catch(error =>{
                    reject(error);
                })
            })
        },
        list({commit}, condition){
            return new Promise((resolve, reject) => {
                EmployeeApi.list(condition)
                .then(response => {
                    commit('setEmployeeList', response.data);
                    resolve(response.status);
                })
                .catch(error =>{
                    reject(error);
                })
            })
        },
        modify({commit}, employee){
            return new Promise((resolve, reject) => {
                EmployeeApi.modify(employee)
                .then(response => {
                    commit('updateEmployee', response.data)
                    resolve(response.status);
                })
                .catch(error =>{
                    reject(error);
                })
            })
        },
        retire({commit}, employeeId){
            return new Promise((resolve, reject) => {
                EmployeeApi.retire(employeeId)
                .then(response => {
                    commit('retireEmployee', response.data)
                    resolve(response.status);
                })
                .catch(error =>{
                    reject(error);
                })
            })
        },
        remove(context, employeeId){
            return new Promise((resolve, reject) => {
                EmployeeApi.remove(employeeId)
                .then(response =>{
                    resolve(response.status);
                })
                .catch(error => {
                    reject(error);
                })
            })
        }
    }
}

export default EmployeeStore