import { EmployeeApi } from "@/api"
import { Employee } from "@/model";
import { EmployeeTrimUtil, SwalUtil } from "@/util";
import { EmployeeSearchDto } from "~/model/dto";
import swal from 'sweetalert'

const EmployeeStore = {
    state : {
        registerEmployee : new Employee(),
        tempEmployee : new Employee(),
        originEmployee : new Employee(),
        employeeList : [],
        employeeInfoFormsCheck : false,
        employeeSkillCheck : true,
        employeeSearchDto : new EmployeeSearchDto(),
        employeeImage : null,
    },
    getters : {
        getRegisterEmployee(state){
            return state.registerEmployee
        },
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
            state.employeeImage = 'defalut'
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
        employeeRegister({dispatch, state }, employee){
            return new Promise((resolve, reject) => {
                employee = EmployeeTrimUtil.employeeTrim(employee);
                EmployeeApi.register(employee)
                .then(response => {
                    console.log(response);
                    let employeeId = response.data;
                    let imageResponse = dispatch('employeeUploadImage',employeeId)
                    swal({
                        title: "성공",
                        text: '저장이 완료되었습니다.',
                        icon: "success",
                        timer : 2000,
                    }).then( () =>{
                        resolve(imageResponse);
                        state.registerEmployee = new Employee();
                    })
                })
                .catch(error =>{
                    if(error.response.status === 400){
                        SwalUtil.error(error.response.data);
                        reject(error);
                    }else{
                        SwalUtil.serverError();
                        reject(error);
                    }
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
                    SwalUtil.serverError();
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
                    SwalUtil.serverError();
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
                    SwalUtil.serverError();
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
                    SwalUtil.serverError();
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
                    SwalUtil.serverError();
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
                    SwalUtil.serverError();
                    reject(error);
                })
            })
        },

        employeeModify({commit, state, dispatch}){
            let isChangedImage = state.originEmployee.imageUrl !== state.tempEmployee.imageUrl ? true : false
            state.tempEmployee.imageUrl = state.originEmployee.imageUrl 
            return new Promise((resolve, reject) => {
                EmployeeApi.modify(state.tempEmployee)
                .then(response => {
                    if(isChangedImage){
                        console.log("called modify image upload")
                        dispatch('employeeUploadImage',state.tempEmployee.employeeId)
                    }
                    commit('setTempEmployee', response.data)
                    SwalUtil.serverSuccess('업데이트 완료')
                    resolve(response.status);
                })
                .catch(error =>{
                    SwalUtil.error("사원 정보 수정이 실패하였습니다.");
                    state.employeeImage = null
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
                    SwalUtil.serverError();
                    reject(error);
                })
            })
        }
    }
}

export default EmployeeStore
