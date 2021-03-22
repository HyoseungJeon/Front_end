<template>
  <div id="employee_list_form" :style="employeeListForm">
    <sui-table selectable="selectable" celled="celled">
    <sui-table-header>
        <sui-table-row id="employee-list-header-form">
            <sui-table-header-cell>
              <div class="employee-list-header-cell-content">
                <div style="display : grid">
                  <sui-icon name="sort up"
                            class="employee-list-header-cell-content-icon" 
                            :style="isActive('nameUp')" 
                            @click="onClickSort('name', 'up')" />
              
                  <sui-icon name="sort down" 
                            :style="isActive('nameDown')" 
                            @click="onClickSort('name', 'down')" />
                </div>
                <span style="margin-top : 4px;">이름</span>
              </div>
            </sui-table-header-cell>
            
            <sui-table-header-cell>
              <div class="employee-list-header-cell-content">
                <div style="display : grid">
                  <sui-icon name="sort up"
                            class="employee-list-header-cell-content-icon" 
                            :style="isActive('deptUp')"  
                            @click="onClickSort('department', 'up')" />
                  <sui-icon name="sort down" 
                            :style="isActive('deptDown')"  
                            @click="onClickSort('department', 'down')" />
                  </div>
                  <span style="margin-top : 4px;">부서</span>
                </div>
            </sui-table-header-cell>
              
            <sui-table-header-cell>
              <div class="employee-list-header-cell-content">
                <div style="display : grid">
                  <sui-icon name="sort up"
                            class="employee-list-header-cell-content-icon"  
                            :style="isActive('positionUp')"  
                            @click="onClickSort('position', 'up')" />
                  <sui-icon name="sort down" 
                            :style="isActive('positionDown')" 
                            @click="onClickSort('position', 'down')" />
                  </div>
                  <span style="margin-top : 4px;">직급</span>
              </div>
            </sui-table-header-cell>
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
import { NameSortUtil, DepartmentSortUtil, PositionSortUtil } from '@/util/sortUtils'

export default {
    name:'EmployeeListView',
    data:function(){
      return {
        employeeListForm:{
          top : '0px',
        },
        selectedIndex : null,
        arraySort : require('array-sort'),
        activeSortOption : null,
      }
    },
    created(){
      window.addEventListener('scroll', this.handlerScroll);
    },
    destroyed(){
      window.removeEventListener('scroll', this.handlerScroll)
    },
    methods : {
      ...mapActions(['employeeFind','commonCodeGet']),
        onClickEmployeeRow:function(employeeId, index){
        this.selectedIndex = index;
        this.employeeFind(employeeId).then(
          status => status === 200 ? this.$router.push('EmployeeInfoRetrieveView') : ''
        )
      },
      onClickSort : function(option, order){
        DepartmentSortUtil.initDeptCodeMaps();
        PositionSortUtil.initpositionCodeMaps();
        switch(option){
          case 'name' : {
            if(order === 'up'){
              this.activeSortOption = 'nameUp';
              this.arraySort(this.employeeList, NameSortUtil.compareName('name'), DepartmentSortUtil.compareDept('department'), PositionSortUtil.comparePosition('position'));
            }else{
              this.activeSortOption = 'nameDown';
              this.arraySort(this.employeeList, NameSortUtil.compareNameReverse('name'), DepartmentSortUtil.compareDept('department'), PositionSortUtil.comparePosition('position'));
            }
            break;
          }
          case  'department' : {
            if(order === 'up'){
              this.activeSortOption = 'deptUp';
              this.arraySort(this.employeeList, DepartmentSortUtil.compareDept('department'), PositionSortUtil.comparePosition('position'), NameSortUtil.compareName('name'));
            }else{
              this.activeSortOption = 'deptDown';
              this.arraySort(this.employeeList, DepartmentSortUtil.compareDeptReverse('department'),PositionSortUtil.comparePosition('position'), NameSortUtil.compareName('name'));
            }
            break;
          }
          case 'position' : {
            if(order === 'up'){
              this.activeSortOption = 'positionUp';
              this.arraySort(this.employeeList, PositionSortUtil.comparePosition('position'), DepartmentSortUtil.compareDept('department'), NameSortUtil.compareName('name'));
            }else{
              this.activeSortOption = 'positionDown';
              this.arraySort(this.employeeList, PositionSortUtil.comparePositionReverse('position'), DepartmentSortUtil.compareDept('department'), NameSortUtil.compareName('name'));
            }
            break;
          }

        }
        

      },
      handlerScroll(){
        this.employeeListForm.top = window.scrollY + "px";
      },
      isActive(sortOption){
        return this.activeSortOption === sortOption ? 'color : blue;' : 'color : grey;'; 
      }
    },
    computed:{
      ...mapGetters({
        employeeList : 'getEmployeeList'
      }),
     
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
  .employee-list-header-cell-content{
    grid-template-columns: 1fr auto;
    display: inline-grid;
    align-items: center;
  }
  .employee-list-header-cell-content-icon{
    margin-bottom : -8px !important;
  }
</style>