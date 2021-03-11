<template>
    <transition name="modal">
        <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSearch)">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container"> 
                    <sui-modal-header>
                        <span class="cotent-header">조건별 검색</span>
                    </sui-modal-header>

                    <sui-modal-content>
                        <div class="modal-body">
                            <ValidationProvider rules="required" v-slot="{errors}">
                            <sui-dropdown
                                :options="options"
                                placeholder="조건"
                                search="search"
                                fluid="fluid"
                                selection="selection"
                                v-model="condition"
                            >
                            </sui-dropdown>
                            <span class="span-error-message">{{errors[0]}}</span>
                            </ValidationProvider>
                        </div>

                         <div v-if="condition == 'department'">
                            <span class="cotent-header">소속별 검색</span>
                            <ValidationProvider rules="required" v-slot="{errors}">
                            <sui-dropdown
                                :options="dropdowns.A"
                                placeholder="소속"
                                search="search"
                                fluid="fluid"
                                selection="selection"
                                v-model ="employeeSearchDto.department"
                            />
                            <span class="span-error-message">{{errors[0]}}</span>
                            </ValidationProvider>
                        </div>

                        <div v-if="condition == 'position'">
                            <span class="cotent-header">직급별 검색</span>
                             <ValidationProvider rules="required" v-slot="{errors}">
                            <sui-dropdown
                                :options="dropdowns.B"
                                placeholder="직급"
                                search="search"
                                fluid="fluid"
                                selection="selection"
                                v-model ="employeeSearchDto.position"
                            />
                            <span class="span-error-message">{{errors[0]}}</span>
                            </ValidationProvider>   
                        </div>
                        <div v-if="condition == 'departmentAndposition'">
                            <span class="cotent-header">소속+직급별 검색</span>
                            <span class="cotent-header">소속별 검색</span>
                            <ValidationProvider rules="required" v-slot="{errors}">
                            <sui-dropdown
                                :options="dropdowns.A"
                                placeholder="소속"
                                search="search"
                                fluid="fluid"
                                selection="selection"
                                v-model ="employeeSearchDto.department"
                            />
                            <span class="span-error-message">{{errors[0]}}</span>
                            </ValidationProvider> 
                            
                            <span class="cotent-header">직급별 검색</span>
                            <ValidationProvider rules="required" v-slot="{errors}">
                            <sui-dropdown
                                :options="dropdowns.B"
                                placeholder="직급"
                                search="search"
                                fluid="fluid"
                                selection="selection"
                                v-model ="employeeSearchDto.position"
                            />
                            <span class="span-error-message">{{errors[0]}}</span>
                            </ValidationProvider> 
                        </div>

                        <div v-if="condition == 'retireDate'">
                            <span class="cotent-header">퇴사일 기준 검색</span>
                            <v-date-picker
                                v-model="employeeSearchDto.retirementDateStart"
                                :max-date="employeeSearchDto.retirementDateEnd"
                                :model-config="DateUtil.dateModelConfig"
                                :masks="DateUtil.masks">
                            <template v-slot="{ inputValue, inputEvents }">
                                <sui-input
                                    size="small"
                                    :value="inputValue"
                                    v-on="inputEvents"
                                    icon="calendar alternate outline icon"
                                    placeholder="시작일"
                                />
                            </template>
                            </v-date-picker>
                            
                           <sui-icon class="large" name="arrows alternate horizontal" />
                            <v-date-picker
                                v-model="employeeSearchDto.retirementDateEnd"
                                :min-date="employeeSearchDto.retirementDateStart"
                                :model-config="DateUtil.dateModelConfig"
                                :masks="DateUtil.masks">
                            <template v-slot="{ inputValue, inputEvents }">
                                <sui-input
                                    size="small"
                                    :value="inputValue"
                                    v-on="inputEvents"
                                    icon="calendar alternate outline icon"
                                    placeholder="종료일"/>
                            </template>
                            </v-date-picker>
                        </div>
                    </sui-modal-content>
                    <sui-divider />
                   <sui-modal-actions style="bottom : 10px; position : static">
                        <div class="modal-footer">
                         <sui-button type="button" class="modal-default-button" @click="$emit('close')">취소
                        </sui-button>
                        <sui-button type="submit" class="modal-default-button" @click="handleSubmit()">검색
                        </sui-button>
                        </div>
                   </sui-modal-actions>
                </div>
            </div>
        </div>
        </form>
        </ValidationObserver>
    </transition>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {DateUtil} from '@/util'
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import '~/util/validationRules/CommonRules'
export default {
    name: 'EmployeeInfoRetrieveConditionsModal',
    components : {
        ValidationObserver,
        ValidationProvider
    },
    data : function(){
        return {
            DateUtil : DateUtil,
            options : [
                {text : '소속별 검색', value : 'department'},
                {text : '직급별 검색', value : 'position'},
                {text : '소속+직급별 검색', value : 'departmentAndposition'},
                {text : '퇴사일 검색', value : 'retireDate'}
            ],
            condition : null,
        }
    },
    methods: {
        ...mapActions(['employeeSearchByDepartment','employeeSearchByPosition','employeeSearchByDepartmentAndPosition', 'employeeSearchByRetireDate']),
        ...mapMutations(['clearEmployeeSearchDto']),
        onSearch : function(){
            switch(this.condition){
                case 'department' : {
                    this.employeeSearchByDepartment(this.employeeSearchDto)
                    .then(status => status === 200 ? '' : alert('검색이 실패되었습니다!'))
                    .catch(error => console.log(error));
                    break;
                }
                case 'position' : {
                    this.employeeSearchByPosition(this.employeeSearchDto)
                    .then(status => status === 200 ? '' : alert('검색이 실패되었습니다!'))
                    .catch(error => console.log(error));
                    break;
                }
                case 'departmentAndposition' : {
                    this.employeeSearchByDepartmentAndPosition(this.employeeSearchDto)
                    .then(status => status === 200 ? '' : alert('검색이 실패되었습니다!'))
                    .catch(error => console.log(error));
                    break;
                }
                case 'retireDate' : {
                    this.employeeSearchByRetireDate(this.employeeSearchDto)
                    .then(status => status === 200 ? '' : alert('검색이 실패되었습니다!'))
                    .catch(error => console.log(error));
                    break;
                }
            }
            this.clearEmployeeSearchDto();
            this.$emit('close');
        },
    },
    computed : {
        ...mapGetters({
            dropdowns : 'getDropdowns',
            employeeSearchDto : 'getEmployeeSearchDto'
        })
    },
    watch : {
        'condition' : function(){
           this.clearEmployeeSearchDto();
        }
    }
}
</script>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 500px;
    height: 500px;
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

.modal-footer {
    bottom:  0px;
    margin-top : 20px;
    margin-bottom: 20px;
}

    /*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.cotent-header {
    font-weight: bold;
    display : block;
    margin-top :20px;
    margin-bottom : 20px;
}
</style>