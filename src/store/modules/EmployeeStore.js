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
                    if(error.response.status === 400 && error.response.data === '주민등록번호가 중복됩니다.'){
                        SwalUtil.error("이미 등록된 사원입니다.");
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
                    SwalUtil.error("사진 업로드에 실패하였습니다.");
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
                    console.log(typeof error);
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

        employeeListDownload({state}){
            return new Promise((resolve, reject) => {
                //employeeList에 있는 employee들에서 employeeId만 추출해 배열로 만들기
                let employeeIds = [];
                if(state.employeeList){
                    state.employeeList.forEach(employee => {
                        employeeIds.push(employee.employeeId)
                    })
                }

                EmployeeApi.downloadList(employeeIds)
                .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'employeeList.xlsx');
                    document.body.appendChild(link);
                    link.click();
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
            return new Promise((resolve, reject) => {
                state.tempEmployee = EmployeeTrimUtil.employeeTrim(state.tempEmployee);
                EmployeeApi.modify(state.tempEmployee)
                .then(response => {
                    if(state.originEmployee.imageUrl !== state.tempEmployee.imageUrl){
                        console.log("called modify image upload")
                        dispatch('employeeUploadImage',state.tempEmployee.employeeId)
                    }
                    commit('setTempEmployee', response.data)
                    SwalUtil.serverSuccess('업데이트 완료')
                    resolve(response.status);
                })
                .catch(error =>{
                    SwalUtil.error("사원 정보 수정이 실패하였습니다.");
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
