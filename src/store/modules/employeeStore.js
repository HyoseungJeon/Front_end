import { EmployeeApi } from "@/api"
import { Employee } from "@/model";

const EmployeeStore = {
    state : {
        employee : new Employee(),
        employeeList : [],
    },
    getters : {
        getEmployee(state){
            return state.employee;
        },
        getEmployeeList(state){
            return state.employeeList;
        }
    },
    mutations : {
        find : (state, payload) => {
            state.employee = payload;
        },
        list : (state, payload) => {
            state.employeeList = payload;
        },
        modify : (state, payload) => {
            state.employee = payload;
        },
        retire : (state, payload) => {
            state.employee = payload;

        },
    },
    actions : {
        register(context, employee){
            return new Promise((resolve, reject) => {
                EmployeeApi.register(employee)
                .then(response => {
                    resolve(response);
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
                    commit('find', response);
                    resolve(response);
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
                    commit('list', response);
                    resolve(response);
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
                    commit('modify', response)
                    resolve(response);
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
                    commit('retire', response)
                    resolve(response);
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
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
            })
        }
    }
}

export default EmployeeStore