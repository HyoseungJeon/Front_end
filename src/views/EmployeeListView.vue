<template>
  <div id="employee_list_form">
    <sui-table selectable="selectable" celled="celled">
    <sui-table-header>
        <sui-table-row>
            <sui-table-header-cell>이름</sui-table-header-cell>
            <sui-table-header-cell>부서</sui-table-header-cell>
            <sui-table-header-cell>직급</sui-table-header-cell>
        </sui-table-row>
    </sui-table-header>
    <sui-table-body>
        <sui-table-row v-for="(employee,index) in employeeList" v-bind:key="index"
        @click="onClickEmployeeRow(employee.employeeId)"
        >
            <sui-table-cell>{{employee.name}}</sui-table-cell>
            <sui-table-cell>{{employee.department}}</sui-table-cell>
            <sui-table-cell>{{employee.position}}</sui-table-cell>
        </sui-table-row>
    </sui-table-body>
</sui-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name:'EmployeeListView',
    methods : {
      ...mapActions(['find']),
        onClickEmployeeRow:function(employeeId){
        this.find(employeeId)
        .then(
          status => status === 200 ? this.$route.push('EmployeeInfoRetrieveView') : ''
        )
        .catch(error => {
          console.log(error);
        })
      }
    },
    computed:{
      ...mapGetters({
        employeeList : 'getEmployeeList'
      })
    }
}
</script>

<style>
  #employee_list_form{
    padding-top: 10px;
    width: 250px;
  }
</style>