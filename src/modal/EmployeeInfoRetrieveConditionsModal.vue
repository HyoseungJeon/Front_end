<template>
    <transition name="modal">
    <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onClickSearchBtn)">
            <div class="modal-mask" @mousedown="$emit('close')">
                <div class="modal-wrapper">
                    <div class="modal-container" @mousedown.stop>
                        <sui-modal-content>
                            <sui-modal-header class="cotent-header">
                                <h3>조건별 검색</h3>
                            </sui-modal-header>
                            <h4>이름</h4>
                            <ValidationProvider rules="korean" v-slot="{errors}">
                                <sui-input
                                    fluid="fluid"
                                    type="text"
                                    maxlength="10"
                                    placeholder="홍길동"
                                    v-model="employeeSearchDto.name"></sui-input>
                                <span class="span-error-message">{{errors[0]}}</span>
                            </ValidationProvider>
                            <h4>부서</h4>
                            <sui-dropdown
                                :options="dropdowns.A"
                                placeholder="선택없음"
                                search="search"
                                selection="selection"
                                fluid="fluid"
                                v-model="employeeSearchDto.department"/>
                            <h4>직급</h4>
                            <sui-dropdown
                                :options="dropdowns.B"
                                placeholder="선택없음"
                                search="search"
                                selection="selection"
                                fluid="fluid"
                                v-model="employeeSearchDto.position"/>
                            <h4>입사일</h4>
                            <div class="grid-container-employee-retrieve-modal-date">
                                <div>
                                    <v-date-picker
                                        v-model="employeeSearchDto.hireDateStart"
                                        :model-config="DateUtil.dateModelConfig"
                                        :max-date="employeeSearchDto.hireDateEnd"
                                        :masks="DateUtil.masks">
                                        <template v-slot="{ inputValue, inputEvents }">
                                            <sui-input
                                                size="small"
                                                :value="inputValue"
                                                v-on="inputEvents"
                                                icon="calendar alternate outline icon"
                                                placeholder="1970-01-01"
                                                fluid="fluid"
                                                maxlength="10"/>
                                        </template>
                                    </v-date-picker>
                                </div>
                                <div>
                                    <v-date-picker
                                        v-model="employeeSearchDto.hireDateEnd"
                                        :min-date="employeeSearchDto.hireDateStart"
                                        :model-config="DateUtil.dateModelConfig"
                                        :masks="DateUtil.masks">
                                        <template v-slot="{ inputValue, inputEvents }">
                                            <sui-input
                                                size="small"
                                                :value="inputValue"
                                                v-on="inputEvents"
                                                icon="calendar alternate outline icon"
                                                placeholder="1970-01-01"
                                                fluid="fluid"
                                                maxlength="10"/>
                                        </template>
                                    </v-date-picker>
                                </div>
                            </div>
                            <h4>퇴사일</h4>
                            <div class="grid-container-employee-retrieve-modal-date">
                                <div>
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
                                                placeholder="1970-01-01"
                                                fluid="fluid"
                                                maxlength="10"/>
                                        </template>
                                    </v-date-picker>
                                </div>
                                <div>
                                    <v-date-picker
                                        v-model="employeeSearchDto.retirementDateEnd"
                                        :model-config="DateUtil.dateModelConfig"
                                        :min-date="employeeSearchDto.retirementDateStart"
                                        :masks="DateUtil.masks">
                                        <template v-slot="{ inputValue, inputEvents }">
                                            <sui-input
                                                size="small"
                                                :value="inputValue"
                                                v-on="inputEvents"
                                                icon="calendar alternate outline icon"
                                                placeholder="1970-01-01"
                                                fluid="fluid"
                                                maxlength="10"/>
                                        </template>
                                    </v-date-picker>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <sui-button primary type="submit" class="modal-default-button" @click="handleSubmit()">검색
                                </sui-button>
                                <sui-button type="button" class="modal-default-button" @click="$emit('close')">취소
                                </sui-button>
                            </div>
                        </sui-modal-content>
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
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import '~/util/validationRules/CommonRules'
import {SwalUtil} from '~/util/'

export default {
    name: 'EmployeeInfoRetrieveConditionsModal',
    components : {
        ValidationProvider,
        ValidationObserver
    },
    data : function(){
        return {
            DateUtil: DateUtil, 
        }
    },
    methods: {
        ...mapActions(['employeeSearchByConditions',]),
        ...mapMutations(['clearEmployeeSearchDto']),
        onClickSearchBtn : function(){
            if(this.isEmptyEmployeeSearchDto()){
                SwalUtil.info("검색조건이 없습니다.")
                return;
            }
            this.employeeSearchByConditions();
            this.clearEmployeeSearchDto();
            this.$emit('close');
        },
        isEmptyEmployeeSearchDto(){
            return !this.employeeSearchDto.name &&
                !this.employeeSearchDto.hireDateStart &&
                !this.employeeSearchDto.hireDateEnd &&
                !this.employeeSearchDto.retirementDateStart &&
                !this.employeeSearchDto.retirementDateEnd &&
                !this.employeeSearchDto.position &&
                !this.employeeSearchDto.department;
        },
    },
    computed : {
        ...mapGetters({
            dropdowns : 'getDropdowns',
            employeeSearchDto : 'getEmployeeSearchDto'
        })
    },
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
    height: auto;
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
    padding : 20px 0px 20px 0px;
    height: 50px;
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
    .grid-container-employee-retrieve-modal-date {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 10px 10px;
    }
</style>