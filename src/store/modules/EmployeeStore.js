import { EmployeeApi } from "@/api"
import { Employee } from "@/model";
import { EmployeeTrimUtil } from "@/util";
import { EmployeeSearchDto } from "../../model/dto";


const EmployeeStore = {
    state : {
        registerEmployee : new Employee(),
        employee : new Employee(),
        employeeList : [],
        employeeInfoFormsCheck : false,
        employeeSkillCheck : true,
        employeeSearchDto : new EmployeeSearchDto(),
    },
    getters : {
        getRegisterEmployee : (state) => {
            return state.registerEmployee;
        },
        getEmployee : (state) => {
            return state.employee;
        },
        getEmployeeSearchDto : (state) => {
            return state.employeeSearchDto;
        },
        getEmployeeList : (state) => {
            return state.employeeList;
        },
        getEmployeeInfoFormsCheck : (state) => {
            return state.employeeInfoFormsCheck;
        },
        getEmployeeSkillCheck : (state) => {
            return state.employeeSkillCheck;
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
        setEmployeeInfoFormsCheck : (state, payload) => {
            state.employeeInfoFormsCheck = payload;
        },
        setEmployeeSkillCheck : (state, payload) => {
            state.employeeSkillCheck = payload;
        },
        clearEmployeeSearchDto : (state) => {
            state.employeeSearchDto = new EmployeeSearchDto();
        }
    },
    actions : {
        employeeRegister(context, employee){
            return new Promise((resolve, reject) => {
                employee = EmployeeTrimUtil.employeeTrim(employee);
                EmployeeApi.register(employee)
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

        employeeSearchByName({commit}, employeeSearchDto){
            return new Promise((resolve, reject) => {
                console.log(employeeSearchDto);
                EmployeeApi.list(employeeSearchDto)
                .then(response => {
                    commit('setEmployeeList', response.data);
                    resolve(response.status);
                })
                .catch(error => {
                    reject(error);
                })
            })
        },

        employeeSearchByHireDate({commit}, employeeSearchDto){
            return new Promise((resolve, reject) => {
                EmployeeApi.list(employeeSearchDto)
                .then(response => {
                    commit('setEmployeeList', response.data);
                    resolve(response.status);
                })
                .catch(error => {
                    reject(error);
                })
            })
        },

        employeeSearchByRetireDate({commit}, employeeSearchDto){
            return new Promise((resolve, reject) => {
                EmployeeApi.list(employeeSearchDto)
                .then(response => {
                    commit('setEmployeeList', response.data);
                    resolve(response.status);
                })
                .catch(error => {
                    reject(error);
                })
            })
        },

        employeeSearchByPosition({commit}, employeeSearchDto){
            return new Promise((resolve, reject) => {
                EmployeeApi.list(employeeSearchDto)
                .then(response => {
                    commit('setEmployeeList', response.data);
                    resolve(response.status);
                })
                .catch(error => {
                    reject(error);
                })
            })
        },

        employeeSearchByDepartment({commit}, employeeSearchDto){
            return new Promise((resolve, reject) => {
                EmployeeApi.list(employeeSearchDto)
                .then(response => {
                    commit('setEmployeeList', response.data);
                    resolve(response.status);
                })
                .catch(error => {
                    reject(error);
                })
            })
        },
        
        employeeSearchByDepartmentAndPosition({commit}, employeeSearchDto){
            return new Promise((resolve, reject) => {
                EmployeeApi.list(employeeSearchDto)
                .then(response => {
                    commit('setEmployeeList', response.data);
                    resolve(response.status);
                })
                .catch(error => {
                    reject(error);
                })
            })
        },
        employeeModify({commit}, employee){
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
