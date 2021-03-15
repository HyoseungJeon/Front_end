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
                            placeholder="1970-01-01"/>
                    </template>
                </v-date-picker>
                
                <sui-icon class="large" name="angle right icon" style="margin-left : 5px; margin-right : 5px" />
               
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
                            placeholder="1970-01-01"/>
                    </template>
                </v-date-picker>
                <sui-button icon="search" type="button" @click="searchEmployee('hireDate')"/>
            </sui-menu-item>
            <sui-menu-item>
                <div class="ui action input">
                    <ValidationProvider :rules="`${isNameEmpty() ? '' : 'required|koreanName'}`" 
                     v-slot="{errors, valid}" >
                    <sui-input type="text" placeholder="이름" v-model="searchName"/>
                    <sui-button
                        class="ui blue button"
                        @click="searchEmployee('name', valid)"
                        type="button"
                        content="검색"
                    />
                    <span class="span-error-message" style="display : block">{{errors[0]}}</span>
                    </ValidationProvider>
                </div>
            </sui-menu-item>
            <sui-menu-item position="right">
                <sui-button
                    secondary
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
    import {mapActions,mapMutations} from 'vuex'
    import {EmployeeInfoRetrieveConditionsModal} from '@/modal/'
    import {ValidationProvider} from 'vee-validate'
    import '~/util/validationRules/EmployeeRules'

    import swal from 'sweetalert'

    export default {
        name: 'EmployeeMenuView',
        components: {
            EmployeeInfoRetrieveConditionsModal,
            ValidationProvider,
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
                ['employeeSearchByHireDate', 'employeeSearchByName']
            ),
            ...mapMutations(['clearEmployeeSearchDto']),
            searchEmployee: function (conditions, valid) {
                switch (conditions) {
                    case 'hireDate':
                        {
                            this.employeeSearchByHireDate(this.searchHireDate)
                            .then(status => status === 200 ? '' : '')
                            .catch(error => console.log(error));
                            this.searchHireDate = {startDate  : '', endDate : ''}
                            break;
                        }
                    case 'name':
                        {
                            if(this.searchName){
                                if(valid){
                                    this.employeeSearchByName(this.searchName)
                                    .then(status => status === 200 ? '' : '')
                                    .catch(error => console.log(error));
                                    this.searchName = ''
                                }else{
                                    swal('검색 조건에 맞게 입력해주세요.');
                                }
                                
                            }else{
                                swal('이름을 입력해주세요!');
                            }
                            break;
                        }
                }
                this.clearEmployeeSearchDto();
            },
            isNameEmpty : function(){
                return !this.searchName ? true : false
            }
        },
    }
</script>

<style>
.menu-span {
    padding-right : 10px;
    font-size : smaller;
    font-weight: bold;
}
</style>