import { EmployeeApi } from "@/api"
import { Employee } from "@/model";
import { EmployeeTrimUtil } from "@/util";
import { EmployeeSearchDto } from "../../model/dto";
import swal from 'sweetalert'

const EmployeeStore = {
    state : {
        tempEmployee : new Employee(),
        originEmployee : new Employee(),
        employeeList : [],
        employeeInfoFormsCheck : false,
        employeeSkillCheck : true,
        employeeSearchDto : new EmployeeSearchDto(),
        employeeImage : null,
    },
    getters : {
        getTempEmployee : (state) => {
            return state.tempEmployee;
        },
        getOriginEmployee : (state) => {
            return state.originEmployee;
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
        },
        getEmployeeImage(state){
            return state.employeeImage;
        },
    },
    mutations : {
        setTempEmployee : (state, payload) => {
            state.originEmployee = JSON.parse(JSON.stringify(payload));
            state.tempEmployee = payload;
        },
        setEmployeeList : (state, payload) => {
            state.employeeList = payload;
            state.employeeSearchDto = new EmployeeSearchDto();
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
                    swal({
                        title: "성공",
                        text: "저장이 완료되었습니다.",
                        icon: "success",
                        timer : 1000,
                    });
                    let employeeId = response.data.employeeId;
                    resolve(dispatch('employeeUploadImage',employeeId));
                })
                .catch(error =>{
                    swal('서버의 상태가 좋지 않습니다.\n잠시 후 다시 시도해주세요.')
                    reject(error);
                })
            })
        },

        employeeUploadImage({ state }, employeeId){
            return new Promise((resolve, reject) => {
                let formData = new FormData() 
                formData.append('imageFile', state.employeeTempImage) 
                formData.append('employeeId', employeeId)
                EmployeeApi.uploadImage(formData)
                .then(response => {
                    resolve(response.status);
                })
                .catch(error =>{
                    swal('서버의 상태가 좋지 않습니다.\n잠시 후 다시 시도해주세요.')
                    reject(error);
                })
            })
        },
      
        employeeFind({commit}, employeeId){
            return new Promise((resolve, reject) => {
                EmployeeApi.find(employeeId)
                .then(response =>{
                    commit('setTempEmployee', response.data);
                    resolve(response.status);
                })
                .catch(error =>{
                    swal('서버의 상태가 좋지 않습니다.\n잠시 후 다시 시도해주세요.')
                    reject(error);
                })
            })
        },
        employeeSearchByName({commit}, searchName){
            return new Promise((resolve, reject) => {
                let tempEmployeeSearchDto = new EmployeeSearchDto()
                tempEmployeeSearchDto.name = searchName
                EmployeeApi.list(tempEmployeeSearchDto)
                .then(response => {
                    commit('setEmployeeList', response.data);
                    resolve(response.status);
                })
                .catch(error =>{
                    console.log(error)
                    swal('서버의 상태가 좋지 않습니다.\n잠시 후 다시 시도해주세요.')
                    reject(error);
                })
            })
        },

        employeeSearchByHireDate({commit}, searchHireDate){
            return new Promise((resolve, reject) => {
                let tempEmployeeSearchDto = new EmployeeSearchDto()
                tempEmployeeSearchDto.hireDateStart = searchHireDate.startDate
                tempEmployeeSearchDto.hireDateEnd = searchHireDate.endDate
                EmployeeApi.list(tempEmployeeSearchDto)
                .then(response => {
                    commit('setEmployeeList', response.data);
                    resolve(response.status);
                })
                .catch(error => {
                    swal('서버의 상태가 좋지 않습니다.\n잠시 후 다시 시도해주세요.')
                    reject(error);
                })
            })
        },

        employeeSearchByConditions({commit, state}){
            return new Promise((resolve, reject) => {
                EmployeeApi.list(state.employeeSearchDto)
                .then(response => {
                    commit('setEmployeeList', response.data);
                    resolve(response.status);
                    
                })
                .catch(error => {
                    swal('서버의 상태가 좋지 않습니다.\n잠시 후 다시 시도해주세요.')
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
                    swal('서버의 상태가 좋지 않습니다.\n잠시 후 다시 시도해주세요.')
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
                    swal('서버의 상태가 좋지 않습니다.\n잠시 후 다시 시도해주세요.')
                    reject(error);
                })
            })
        }
    }
}

export default EmployeeStore
