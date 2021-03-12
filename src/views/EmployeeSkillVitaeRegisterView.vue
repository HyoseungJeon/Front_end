<template>
    <div>
        <ValidationObserver ref="EmployeeSkillObserver">
        <div class="grid-container-employee-skillVitae-body">
            <sui-table celled="celled" fixed="fixed">
                <caption>
                    <div class="grid-container-employee-info-register-table-header">
                        <div align="left">
                            <h4>경력기본정보</h4>
                        </div>
                        <div>
                            <sui-button icon="plus icon" floated="right" style="visibility : hidden"/>
                        </div>
                    </div>
                </caption>
                <sui-table-header>
                    <sui-table-row text-align="center">
                        <sui-table-header-cell>개발경력<span class="icon-required">*</span>
                        </sui-table-header-cell>
                        <sui-table-header-cell>기술자등급<span class="icon-required">*</span>
                        </sui-table-header-cell>
                        <sui-table-header-cell>역할<span class="icon-required">*</span>
                        </sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>

                <sui-table-body>
                    <sui-table-row>
                        
                        <sui-table-cell>
                            <ValidationProvider :rules="`${isSpecEmpty ? '' : 'required|max_value:100'}`" v-slot="{errors}" >
                                <sui-input
                                    fluid="fluid"
                                    transparent="transparent"
                                    v-model="employee.spec.career"
                                     />
                                <span class="span-error-message">{{errors[0]}}</span>
                            </ValidationProvider>
                        </sui-table-cell>
                        
                        <sui-table-cell style="overflow : visible">
                            <ValidationProvider :rules="`${isSpecEmpty ? '' : 'required'}`" v-slot="{errors}" slim>
                            <sui-dropdown
                                placeholder="기술자등급"
                                selection="selection"
                                :options="dropdowns.J"
                                v-model="employee.spec.grade"
                                fluid="fluid"/>
                                <span class="span-error-message">{{errors[0]}}</span>
                            </ValidationProvider>
                        </sui-table-cell>
                        <sui-table-cell style="overflow : visible">
                             <ValidationProvider :rules="`${isSpecEmpty ? '' : 'required'}`" v-slot="{errors}" slim>
                            <sui-dropdown
                                placeholder="역할"
                                selection="selection"
                                :options="dropdowns.K"
                                v-model="employee.spec.role"
                                fluid="fluid"/>
                                <span class="span-error-message">{{errors[0]}}</span>
                             </ValidationProvider>
                        </sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
        </div>

        <div class="grid-container-employee-skillVitae-body">
            <sui-table celled="celled" fixed="fixed">
                <caption>
                    <div class="grid-container-employee-info-register-table-header">
                        <div align="left">
                            <h4>경력 및 수행업무</h4>
                        </div>
                        <div>
                            <sui-button
                                type="button"
                                icon="plus icon"
                                circular="circular"
                                floated="right"
                                @click="plus('project')"
                                primary="primary"/>
                            <sui-button
                                type="button"
                                icon="minus icon"
                                circular="circular"
                                floated="right"
                                @click="minus('project')"
                                v-if="isCanMinus('project')"/>
                        </div>
                    </div>
                </caption>
                <sui-table-header>
                    <sui-table-row text-align="center">
                        <sui-table-header-cell colspan="2">기간<span class="icon-required">*</span>
                        </sui-table-header-cell>
                        <sui-table-header-cell rowspan="2">발주처<span class="icon-required">*</span>
                        </sui-table-header-cell>
                        <sui-table-header-cell rowspan="2">업무내용<span class="icon-required">*</span>
                        </sui-table-header-cell>
                        <sui-table-header-cell>구분<span class="icon-required">*</span>
                        </sui-table-header-cell>
                        <sui-table-header-cell colspan="4">구현기술<span class="icon-required">*</span>
                        </sui-table-header-cell>
                    </sui-table-row>
                    <sui-table-row text-align="center">
                        <sui-table-header-cell>시작일<span class="icon-required">*</span>
                        </sui-table-header-cell>
                        <sui-table-header-cell>종료일<span class="icon-required">*</span>
                        </sui-table-header-cell>
                        <sui-table-header-cell>역할<span class="icon-required">*</span>
                        </sui-table-header-cell>
                        <sui-table-header-cell>Language</sui-table-header-cell>
                        <sui-table-header-cell>OS</sui-table-header-cell>
                        <sui-table-header-cell>DB</sui-table-header-cell>
                        <sui-table-header-cell>기타</sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>

                <sui-table-body>
                    <sui-table-row v-for="(project, index) in employee.projectList" :key="index">
                        <sui-table-cell>
                            <v-date-picker
                                v-model="employee.projectList[index].startDate"
                                :max-date="employee.projectList[index].endDate"
                                :model-config="DateUtil.dateModelConfig"
                                :masks="DateUtil.masks">
                                <template v-slot="{ inputValue, inputEvents }">
                                    <ValidationProvider :rules="`${isProjectEmpty(index) ? '' : 'required'}`" v-slot="{errors}">
                                    <sui-input
                                        size="small"
                                        :value="inputValue"
                                        v-on="inputEvents"
                                        icon="calendar alternate outline icon"
                                        placeholder="1970-01-01"
                                        maxlength="10"
                                        fluid="fluid"/>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                    </ValidationProvider>
                                </template>
                            </v-date-picker>
                        </sui-table-cell>
                        <sui-table-cell>
                            <v-date-picker
                                v-model="employee.projectList[index].endDate"
                                :min-date="employee.projectList[index].startDate"
                                :model-config="DateUtil.dateModelConfig"
                                :masks="DateUtil.masks">
                                <template v-slot="{ inputValue, inputEvents }">
                                    <ValidationProvider :rules="`${isProjectEmpty(index) ? '' : 'required'}`" v-slot="{errors}">
                                    <sui-input
                                        size="small"
                                        :value="inputValue"
                                        v-on="inputEvents"
                                        icon="calendar alternate outline icon"
                                        placeholder="1970-01-01"
                                        maxlength="10"
                                        fluid="fluid"/>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                    </ValidationProvider>
                                </template>
                            </v-date-picker>
                        </sui-table-cell>
                        <sui-table-cell>
                            <ValidationProvider :rules="`${isProjectEmpty(index) ? '' : 'min:2|max:10|required'}`"  v-slot="{errors}">
                            <sui-input
                                fluid="fluid"
                                transparent="transparent"
                                v-model="employee.projectList[index].client"
                                type="text"
                                maxlength="10"
                            />
                            <span class="span-error-message">{{errors[0]}}</span>
                            </ValidationProvider>
                        </sui-table-cell>
                        <sui-table-cell>
                            <ValidationProvider :rules="`${isProjectEmpty(index) ? '' : 'min:2|max:50|required'}`"   v-slot="{errors}">
                            <sui-input
                                fluid="fluid"
                                transparent="transparent"
                                v-model="employee.projectList[index].content"
                                maxlength="50"
                            />
                            <span class="span-error-message">{{errors[0]}}</span>
                            </ValidationProvider>
                        </sui-table-cell>
                        <sui-table-cell style="overflow : visible">
                            <ValidationProvider :rules="`${isProjectEmpty(index) ? '' : 'required'}`" v-slot="{errors}">
                            <sui-dropdown
                                placeholder="역할"
                                selection="selection"
                                fluid="fluid"
                                :options="dropdowns.K"
                                v-model="employee.projectList[index].role"/>
                            <span class="span-error-message">{{errors[0]}}</span>
                            </ValidationProvider>
                        </sui-table-cell>
                        <sui-table-cell style="overflow : visible">
                            <ValidationProvider :rules="`${isProjectEmpty(index) ? '' : 'required'}`"  v-slot="{errors}">
                            <sui-dropdown
                                placeholder="Language"
                                selection="selection"
                                fluid="fluid"
                                :options="dropdowns.N"
                                v-model="employee.projectList[index].language"/>
                            <span class="span-error-message">{{errors[0]}}</span>
                            </ValidationProvider>
                        </sui-table-cell>
                        <sui-table-cell style="overflow : visible">
                            <ValidationProvider :rules="`${isProjectEmpty(index) ? '' : 'required'}`"  v-slot="{errors}">
                            <sui-dropdown
                                placeholder="OS"
                                selection="selection"
                                fluid="fluid"
                                :options="dropdowns.L"
                                v-model="employee.projectList[index].os"/>
                            <span class="span-error-message">{{errors[0]}}</span>
                            </ValidationProvider>
                        </sui-table-cell>
                        <sui-table-cell style="overflow : visible">
                            <ValidationProvider :rules="`${isProjectEmpty(index) ? '' : 'required'}`"  v-slot="{errors}">
                            <sui-dropdown
                                placeholder="DB"
                                selection="selection"
                                fluid="fluid"
                                :options="dropdowns.M"
                                v-model="employee.projectList[index].db"/>
                            <span class="span-error-message">{{errors[0]}}</span>
                            </ValidationProvider>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input
                                fluid="fluid"
                                transparent="transparent"
                                v-model="employee.projectList[index].etc"/>
                        </sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
           
        </div>
        </ValidationObserver>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import {ValidationProvider, ValidationObserver} from 'vee-validate'
    import {Project} from '@/model'
    import {DateUtil} from '@/util'
    import '@/util/validationRules/EmployeeRules.js'

    export default {
        name: 'EmployeeSkillVitaeRegisterView',
        mounted: function () {
            this.dropdown();
        },
        components: {
            ValidationProvider,
            ValidationObserver
        },
        data: function () {
            return {
                DateUtil: DateUtil
            }
        },
        methods: {
            ...mapActions(['dropdown']),
            ...mapMutations(['setEmployeeSkillCheck']),
            updateEmployeeValid : async function(){
                let currentValid = await this.$refs.EmployeeSkillObserver.validate();
                this.setEmployeeSkillCheck(currentValid);
            },
            plus: function (category) {
                switch (category) {
                    case 'project':
                        {
                            if (this.employee.projectList.length < 5) {
                                this.employee.projectList.push(new Project());
                            } else {
                                alert('최대 횟수를 초과하였습니다.');
                            }
                            break;
                        }
                }
            },
            minus: function (category) {
                switch (category) {
                    case 'project':
                        {
                            this.employee.projectList.pop();
                            break;
                        }
                }
            },
            isCanMinus(category) {
                switch (category) {
                    case 'project':
                        {
                            return this.employee.projectList.length > 1 ? true : false;
                        }
                }
                return false;
            },
            isProjectEmpty : function(index){
                return this.employee.projectList[index].client == null 
                && this.employee.projectList[index].content == null
                && this.employee.projectList[index].role == null
                && this.employee.projectList[index].language == null
                && this.employee.projectList[index].os == null
                && this.employee.projectList[index].db == null
                && this.employee.projectList[index].etc == null
                && this.employee.projectList[index].startDate == null
                && this.employee.projectList[index].endDate == null ? true : false
            }
        },
        computed: {
            ...mapGetters({employee: 'getRegisterEmployee', dropdowns: 'getDropdowns'}),
            isSpecEmpty : function(){
                return this.employee.spec.career == null && this.employee.spec.grade == null && this.employee.spec.role ==null ? true : false
            }
        }
    }
</script>

<style>
    .grid-container-employee-info-register-table-header {
        display: grid;
        align-items: center;
        padding-bottom: 3px;
        grid-template-columns: auto auto;
    }
    .grid-container-employee-skillVitae-body {
              padding-top: 20px;
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 10px 20px;
    }
    .icon-required {
        color: #DB2828;
    }
</style>