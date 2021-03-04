<template>
    <div>
        <div>

            <sui-table celled="celled">
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
                    <sui-table-row>
                        <sui-table-header-cell>개발경력</sui-table-header-cell>
                        <sui-table-header-cell>기술자등급</sui-table-header-cell>
                        <sui-table-header-cell>역할</sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>

                <sui-table-body>
                    <sui-table-row>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent" v-model="employee.spec.career"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent" v-model="employee.spec.grade"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent" v-model="employee.spec.role"></sui-input>
                        </sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
        </div>

        <div>
            <sui-table celled="celled">
                <sui-table-header>
                    <sui-table-row>
                        <sui-table-header-cell rowspan="2">기간</sui-table-header-cell>
                        <sui-table-header-cell rowspan="2">발주처</sui-table-header-cell>
                        <sui-table-header-cell rowspan="2">업무내용</sui-table-header-cell>
                        <sui-table-header-cell>구분</sui-table-header-cell>
                        <sui-table-header-cell colspan="4">구현기술</sui-table-header-cell>
                    </sui-table-row>
                    <sui-table-row>
                        <sui-table-header-cell>역할</sui-table-header-cell>
                        <sui-table-header-cell>Language</sui-table-header-cell>
                        <sui-table-header-cell>OS</sui-table-header-cell>
                        <sui-table-header-cell>DB</sui-table-header-cell>
                        <sui-table-header-cell>기타</sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>

                <sui-table-body>
              
                </sui-table-body>
            </sui-table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EmployeeSkillVitaeRegisterView',
  computed : {
    ...mapGetters({employee : 'getRegisterEmployee'})
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
</style>