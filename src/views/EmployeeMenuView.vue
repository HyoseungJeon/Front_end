<template>
    <div>
        <sui-menu pointing="pointing">
            <sui-menu-item>
                <span class="menu-span">입사일</span>
                <v-date-picker
                    v-model="searchHireDate.startDate"
                    :max-date="searchHireDate.endDate"
                    :model-config="DateUtil.dateModelConfig"
                    :masks="DateUtil.masks">
                    <template v-slot="{ inputValue, inputEvents }">
                        <sui-input
                            size="small"
                            :value="inputValue"
                            v-on="inputEvents"
                            icon="calendar alternate outline icon"
                            placeholder="시작일"/>
                    </template>
                </v-date-picker>
                
                <sui-icon class="large" name="arrows alternate horizontal" style="margin-left : 5px; margin-right : 5px" />
               
                <v-date-picker
                    v-model="searchHireDate.endDate"
                    :min-date="searchHireDate.startDate"
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
                <sui-button icon="search" type="button" @click="searchEmployee('hireDate')"/>
            </sui-menu-item>
            <sui-menu-item>
                <div class="ui action input">
                    <sui-input type="text" placeholder="이름" v-model="searchName"/>
                    <sui-button
                        class="ui blue button"
                        @click="searchEmployee('name')"
                        type="button"
                        content="검색"/>
                </div>
            </sui-menu-item>
            <sui-menu-item position="right">
                <sui-button
                    type="button"
                    content="조건별검색"
                    @click="showModal = true"/>
                <EmployeeInfoRetrieveConditionsModal
                    v-if="showModal"
                    @close="showModal = false"
                    @modalSearchEmployee="searchEmployee">
                </EmployeeInfoRetrieveConditionsModal>
            </sui-menu-item>
        </sui-menu>
        <sui-divider/>
    </div>
</template>

<script>
    import {DateUtil} from '@/util'
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import {EmployeeInfoRetrieveConditionsModal} from '@/modal/'

    export default {
        name: 'EmployeeMenuView',
        components: {
            EmployeeInfoRetrieveConditionsModal
        },
        data: function () {
            return {
                DateUtil: DateUtil, 
                showModal: false,
                searchName : '',
                searchHireDate :{
                    startDate : '',
                    endDate : '',
                }
            }
        },
        methods: {
            ...mapActions(
                ['employeeListInit', 'employeeSearchByHireDate', 'employeeSearchByName']
            ),
            ...mapMutations(['clearEmployeeSearchDto']),
            searchEmployee: function (conditions) {
                switch (conditions) {
                    case 'hireDate':
                        {
                            this.employeeSearchByHireDate(this.searchHireDate);
                            this.searchHireDate = {startDate  : '', endDate : ''}
                            break;
                        }
                    case 'name':
                        {
                            this.employeeSearchByName(this.searchName);
                            this.searchName = ''
                            break;
                        }
                }
                this.clearEmployeeSearchDto();

            },
            getEmployeeList: function (employeeSearchForm) {
                this.employeeListInit(employeeSearchForm);
            },
        },
        computed: {
            ...mapGetters({employeeSearchDto: 'getEmployeeSearchDto'})
        }
    }
</script>

<style>
.menu-span {
    padding-right : 10px;
    font-size : smaller;
    font-weight: bold;
}
</style>