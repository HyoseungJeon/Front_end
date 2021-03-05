<template>
    <div>
        <div class="grid-container-employee-skillVitae-body">
            <sui-table celled="celled" fixed>
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
                        <sui-table-header-cell>개발경력</sui-table-header-cell>
                        <sui-table-header-cell>기술자등급</sui-table-header-cell>
                        <sui-table-header-cell>역할</sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>

                <sui-table-body>
                    <sui-table-row>
                        <sui-table-cell>
                            <sui-input
                                fluid="fluid"
                                transparent="transparent"
                                v-model="employee.spec.career" />
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-dropdown
                                placeholder="기술자등급"
                                selection="selection"
                                :options="options"
                                v-model="employee.spec.grade"
                                fluid="fluid" />
                        </sui-table-cell>
                        <sui-table-cell>
                              <sui-dropdown
                                placeholder="역할"
                                selection="selection"
                                :options="options"
                                v-model="employee.spec.role"
                                fluid="fluid" />
                        </sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
        </div>

        <div class="grid-container-employee-skillVitae-body">
            <sui-table celled="celled" fixed>
                <caption>
                    <div class="grid-container-employee-info-register-table-header">
                        <div align="left">
                            <h4>경력 및 수행업무</h4>
                        </div>
                        <div>
                            <sui-button icon="plus icon" circular="circular" floated="right" @click="plus"/>
                        </div>
                    </div>
                </caption>
                <sui-table-header>
                    <sui-table-row text-align="center">
                        <sui-table-header-cell colspan="2">기간</sui-table-header-cell>
                        <sui-table-header-cell rowspan="2">발주처</sui-table-header-cell>
                        <sui-table-header-cell rowspan="2">업무내용</sui-table-header-cell>
                        <sui-table-header-cell>구분</sui-table-header-cell>
                        <sui-table-header-cell colspan="4">구현기술</sui-table-header-cell>
                    </sui-table-row>
                    <sui-table-row text-align="center">
                        <sui-table-header-cell>시작일</sui-table-header-cell>
                        <sui-table-header-cell>종료일</sui-table-header-cell>
                        <sui-table-header-cell>역할</sui-table-header-cell>
                        <sui-table-header-cell>Language</sui-table-header-cell>
                        <sui-table-header-cell>OS</sui-table-header-cell>
                        <sui-table-header-cell>DB</sui-table-header-cell>
                        <sui-table-header-cell>기타</sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>

                <sui-table-body>
                    <sui-table-row v-for="index in projectIndex" :key="index">
                        <sui-table-cell>
                            <v-date-picker
                                v-model="employee.projectList[index-1].startDate"
                                :max-date="employee.projectList[index-1].endDate"
                                :model-config="DateUtil.dateModelConfig"
                                :masks="DateUtil.masks">
                                <template v-slot="{ inputValue, inputEvents }">
                                    <sui-input
                                        size="small"
                                        :value="inputValue"
                                        v-on="inputEvents"
                                        icon="calendar alternate outline icon"
                                        placeholder="입사일"
                                        fluid="fluid"/>
                                </template>
                            </v-date-picker>
                        </sui-table-cell>
                        <sui-table-cell>
                            <v-date-picker
                                v-model="employee.projectList[index-1].endDate"
                                :min-date="employee.projectList[index-1].startDate"
                                :model-config="DateUtil.dateModelConfig"
                                :masks="DateUtil.masks">
                                <template v-slot="{ inputValue, inputEvents }">
                                    <sui-input
                                        size="small"
                                        :value="inputValue"
                                        v-on="inputEvents"
                                        icon="calendar alternate outline icon"
                                        placeholder="퇴사일"
                                        fluid="fluid"/>
                                </template>
                            </v-date-picker>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input
                                fluid="fluid"
                                transparent="transparent"
                                v-model="employee.projectList[index-1].client"/>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input
                                fluid="fluid"
                                transparent="transparent"
                                v-model="employee.projectList[index-1].content"/>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-dropdown
                                placeholder="역할"
                                selection="selection"
                                fluid="fluid"
                                :options="options"
                                v-model="employee.projectList[index-1].role"/>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-dropdown
                                placeholder="Language"
                                selection="selection"
                                fluid="fluid"
                                :options="options"
                                v-model="employee.projectList[index-1].language"/>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-dropdown
                                placeholder="OS"
                                selection="selection"
                                fluid="fluid"
                                :options="options"
                                v-model="employee.projectList[index-1].os"/>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-dropdown
                                placeholder="DB"
                                selection="selection"
                                fluid="fluid"
                                :options="options"
                                v-model="employee.projectList[index-1].db"/>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input
                                fluid="fluid"
                                transparent="transparent"
                                v-model="employee.projectList[index-1].etc"/>
                        </sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {Project} from '@/model'
    import {DateUtil} from '@/util'

    export default {
        name: 'EmployeeSkillVitaeRegisterView',
        mounted: function () {
            this.employee.projectList.push(new Project());
        },
        data: function () {
            return {
              projectIndex: 1, 
              startDate: null, 
              endDate: null, 
              DateUtil: DateUtil}
        },
        methods: {
            plus: function () {
                this.projectIndex++;
                this.employee.projectList.push(new Project());
            }
        },
        computed: {
            ...mapGetters({employee: 'getRegisterEmployee'})
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
      padding-top :10px;
    }
</style>