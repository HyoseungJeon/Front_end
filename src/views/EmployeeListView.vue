<template>
  <div id="employee_list_form" :style="employeeListForm">
    <sui-table selectable="selectable" celled="celled">
    <sui-table-header>
        <sui-table-row id="employee-list-header-form">
            <sui-table-header-cell>
              <sui-icon name="sort up" @click="onClickSort('name', 'up')" />
              <sui-icon name="sort down" @click="onClickSort('name', 'down')"/>
              이름</sui-table-header-cell>
            <sui-table-header-cell>
              <sui-icon name="sort up" @click="onClickSort('department', 'up')" />
              <sui-icon name="sort down" @click="onClickSort('department', 'down')"/>
              부서</sui-table-header-cell>
            <sui-table-header-cell>
              <sui-icon name="sort up" @click="onClickSort('position', 'up')" />
              <sui-icon name="sort down" @click="onClickSort('position', 'down')"/>
              직급</sui-table-header-cell>
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
import { DepartmentSortUtil, PositionSortUtil } from '@/util/sortUtils'

export default {
    name:'EmployeeListView',
    data:function(){
      return {
        employeeListForm:{
          top : '0px',
        },
        selectedIndex : null,
        arraySort : require('array-sort'),
      }
    },
    created(){
      window.addEventListener('scroll', this.handlerScroll);
    },
    destroyed(){
      window.removeEventListener('scroll', this.handlerScroll)
    },
    methods : {
      ...mapActions(['employeeFind']),
        onClickEmployeeRow:function(employeeId, index){
        this.selectedIndex = index;
        this.employeeFind(employeeId).then(
          status => status === 200 ? this.$router.push('EmployeeInfoRetrieveView') : ''
        )
        .catch(error => { console.log(error);
        })
      },
      onClickSort : function(option, order){
        switch(option){
          case 'name' : {
            if(order === 'up'){
              this.arraySort(this.employeeList, 'name');
            }else{
              this.arraySort(this.employeeList, 'name', {reverse : true});
            }
            break;
          }
          case  'department' : {
            if(order === 'up'){
              this.arraySort(this.employeeList, DepartmentSortUtil.compareDept('department'));
            }else{
              this.arraySort(this.employeeList, DepartmentSortUtil.compareDept('department'), {reverse: true});
            }
            break;
          }
          case 'position' : {
            if(order === 'up'){
              this.arraySort(this.employeeList, PositionSortUtil.comparePosition('position'));
            }else{
              this.arraySort(this.employeeList, PositionSortUtil.comparePosition('position'), {reverse: true});
            }
            break;
          }

        }
        

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