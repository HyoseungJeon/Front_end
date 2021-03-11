import { EmployeeApi } from "@/api"
import { Employee } from "@/model";
import { EmployeeTrimUtil } from "@/util";

const EmployeeStore = {
    state : {
        registerEmployee : new Employee(),
        employee : new Employee(),
        employeeList : [],
        employeeInfoFormsCheck : false,
        employeeSkillCheck : true,
        employeeImage : null,
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
        },
        getEmployeeInfoFormsCheck : (state) => {
            return state.employeeInfoFormsCheck;
        },
        getEmployeeSkillCheck : (state) => {
            return state.employeeSkillCheck;
        },
        getEmployeeImage(state){
            return state.employeeImage;
        },
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
        setEmployeeInfoFormsCheck : (state, payload) => {
            state.employeeInfoFormsCheck = payload;
        },
        setEmployeeSkillCheck : (state, payload) => {
            state.employeeSkillCheck = payload;
        },
        setEmployeeImage(state, payload){
            state.employeeImage = payload;
        }
    },
    actions : {
        employeeRegister({dispatch}, employee){
            return new Promise((resolve, reject) => {
                employee = EmployeeTrimUtil.employeeTrim(employee);
                EmployeeApi.register(employee)
                .then(response => {
                    let employeeId = response.data.employeeId;
                    resolve(dispatch('employeeUploadImage',employeeId));
                })
                .catch(error =>{
                    reject(error);
                })
            })
        },

        employeeUploadImage({ state }, employeeId){
            return new Promise((resolve, reject) => {
                let formData = new FormData() 
                formData.append('imageFile', state.employeeImage) 
                formData.append('employeeId', employeeId)
                EmployeeApi.uploadImage(formData)
                .then(response => {
                    resolve(response.status);
                })
                .catch(error =>{
                    reject(error);
                })
            })
        },
        employeeFind({commit}, employeeId){
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

        employeeListInit({commit}, condition){
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

        employeeModify({commit}, employee){
            return new Promise((resolve, reject) => {
                EmployeeApi.modify(employee)
                .then(response => {
                    commit('updateEmployee', response.data)
                    // temp, origin image url 비교 및 not compare 시 및 코드 동작 해야함
                    // let employeeId = employee.employeeId;
                    // resolve(dispatch('employeeUploadImage',employeeId));
                    resolve(response.status);
                })
                .catch(error =>{
                    reject(error);
                })
            })
        },

        employeeRetire({commit}, employeeId){
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

        employeeRemove(context, employeeId){
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
