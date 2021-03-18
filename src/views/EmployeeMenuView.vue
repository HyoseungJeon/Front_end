<template>
    <sui-menu>
        <div class="grid-menu-bar">
            <div>
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
                            placeholder="1970-01-01"
                            style="width :130px"/>
                    </template>
                </v-date-picker>

                <sui-icon
                    class="large"
                    name="angle right icon"
                    style="margin-left : 5px; margin-right : 5px"/>

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
                            placeholder="1970-01-01"
                            style="width :130px" />
                    </template>
                </v-date-picker>
                <sui-button icon="search" type="button" @click="searchEmployee('hireDate')"/>
            </div>
            <div>
                <ValidationProvider
                    :rules="`${isNameEmpty() ? '' : 'required|korean'}`"
                    v-slot="{errors, valid}">
                    <sui-input type="text" placeholder="이름" v-model="searchName"/>
                    <sui-button
                        class="ui blue button"
                        @click="searchEmployee('name', valid)"
                        type="button"
                        content="검색"/>
                    <span class="span-error-message" style="display : block">{{errors[0]}}</span>
                </ValidationProvider>

            </div>
            <div>
                <sui-button
                    secondary="secondary"
                    type="button"
                    content="조건별검색"
                    floated="right"
                    @click="showModal = true"
                />
                <EmployeeInfoRetrieveConditionsModal
                    v-if="showModal"
                    @close="showModal = false"
                    @modalSearchEmployee="searchEmployee"></EmployeeInfoRetrieveConditionsModal>
                <sui-dropdown
                    class="labeled icon"
                    icon="file excel"
                    button="button"
                    text="Export Excel"
                    style="background : #148048; color : white; float : right"
                    >
                    <sui-dropdown-menu>
                        <sui-dropdown-item>전체 사원</sui-dropdown-item>
                        <sui-dropdown-item>검색된 사원</sui-dropdown-item>
                    </sui-dropdown-menu>
                </sui-dropdown>
            </div>
        </div>
    </sui-menu>
</template>

<script>
    import {DateUtil} from '@/util'
    import {mapActions, mapMutations} from 'vuex'
    import {EmployeeInfoRetrieveConditionsModal} from '@/modal/'
    import {ValidationProvider} from 'vee-validate'
    import '~/util/validationRules/EmployeeRules'
    import swal from 'sweetalert'

    export default {
        name: 'EmployeeMenuView',
        components: {
            EmployeeInfoRetrieveConditionsModal,
            ValidationProvider
        },
        data: function () {
            return {
                DateUtil: DateUtil,
                showModal: false,
                searchName: '',
                searchHireDate: {
                    startDate: '',
                    endDate: ''
                }
            }
        },
        methods: {
            ...mapActions(
                ['employeeSearchByHireDate', 'employeeSearchByName', 'employeeListDownload']
            ),
            ...mapMutations(['clearEmployeeSearchDto']),
            searchEmployee: function (conditions, valid) {
                switch (conditions) {
                    case 'hireDate':
                        {
                            this
                                .employeeSearchByHireDate(this.searchHireDate)
                                .then(
                                    status => status === 200
                                        ? ''
                                        : ''
                                )
                                .catch(error => console.log(error));
                            this.searchHireDate = {
                                startDate: '',
                                endDate: ''
                            }
                            break;
                        }
                    case 'name':
                        {
                            if (this.searchName) {
                                if (valid) {
                                    this
                                        .employeeSearchByName(this.searchName)
                                        .then(
                                            status => status === 200
                                                ? ''
                                                : ''
                                        )
                                        .catch(error => console.log(error));
                                    this.searchName = ''
                                } else {
                                    swal('검색 조건에 맞게 입력해주세요.');
                                }

                            } else {
                                swal('이름을 입력해주세요!');
                            }
                            break;
                        }
                }
                this.clearEmployeeSearchDto();
            },
            isNameEmpty: function () {
                return !this.searchName
                    ? true
                    : false
            },
            onClickDownloadExcel: function () {
                this.employeeListDownload();
            }
        }
    }
</script>

<style>
    .menu-span {
        padding-right: 10px;
        font-size: smaller;
        font-weight: bold;
    }

    .grid-menu-bar {
        display: grid;
        padding: 10px 15px;
        width : 100%;
        grid-template-columns: auto auto 3fr;
        grid-gap : 10px;
        align-items: center;
    }
</style>