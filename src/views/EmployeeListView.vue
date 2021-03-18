<template>
  <div id="employee_list_form" :style="employeeListForm">
    <sui-table selectable="selectable" celled="celled">
    <sui-table-header>
        <sui-table-row id="employee-list-header-form">
            <sui-table-header-cell>이름</sui-table-header-cell>
            <sui-table-header-cell>부서</sui-table-header-cell>
            <sui-table-header-cell>직급</sui-table-header-cell>
        </sui-table-row>
    </sui-table-header>
    <sui-table-body>
        <sui-table-row v-for="(employee,index) in employeeList" v-bind:key="index"
        @click="onClickEmployeeRow(employee.employeeId, index)"
        :class="{'employee-list-row-select' : selectedIndex === index}"
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
    data:function(){
      return {
        employeeListForm:{
          top : '0px',
        },
        selectedIndex : null,
      }
    },
    created(){
      window.addEventListener('scroll', this.handlerScroll)
    },
    destroyed(){
      window.removeEventListener('scroll', this.handlerScroll)
    },
    methods : {
      ...mapActions(['employeeFind']),
        onClickEmployeeRow:function(employeeId, index){
          this.selectedIndex = index;
        this.employeeFind(employeeId)
        .then(
          status => status === 200 ? this.$router.push('EmployeeInfoRetrieveView') : ''
        )
        .catch(error => {
          console.log(error);
        })
      },
      handlerScroll(){
        this.employeeListForm.top = window.scrollY + "px";
      },
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
    position: relative;
    height: auto;
    padding-left: 10px;
    transition: 500ms;
    top:0px
  }
  #employee-list-header-form{
    text-align: center;
  }
  .employee-list-row-select{
    background: #e8e8e8;
    font-weight: bold;
  }
</style>