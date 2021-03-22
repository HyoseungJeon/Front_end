<template>
 <div id="bodyMenu">
    <sui-accordion is="sui-menu" :active-index="1" vertical exclusive styled>
      <sui-accordion-title id="bodyMenuFont" is="sui-menu-header">
        <sui-icon name="dropdown" />
        사원관리
      </sui-accordion-title>
      <sui-accordion-content :active="isActive(['EmployeeInfoReigsterView','EmployeeRetrieve','EmployeeInfoRetrieveView'])">
        <sui-accordion exclusive styled>
        <sui-accordion-title
        id="bodyMenuFont"
        :active="isActive(['EmployeeInfoReigsterView'])"
        @click="menuClickHandler('EmployeeRegister')">
        사원 등록
        </sui-accordion-title>
        <sui-accordion-title
        id="bodyMenuFont"
        :active="isActive(['EmployeeRetrieve','EmployeeInfoRetrieveView'])"
        @click="menuClickHandler('EmployeeRetrieve')">사원 조회
        </sui-accordion-title>
        </sui-accordion>
      </sui-accordion-content>
      <sui-accordion-title id="bodyMenuFont" is="sui-menu-header">
        <sui-icon name="dropdown" />
        코드관리
      </sui-accordion-title>
      <sui-accordion-content :active="isActive(['CommonCode','CommonCodeRetrieveView'])">
        <sui-accordion exclusive styled>
        <sui-accordion-title
        id="bodyMenuFont"
        :active="isActive(['CommonCode','CommonCodeRetrieveView'])"
        @click="menuClickHandler('CommonCode')">코드 조회</sui-accordion-title>
        </sui-accordion>
      </sui-accordion-content>
    </sui-accordion>
  </div>
</template>

<script>
import {mapGetters,} from 'vuex'

export default {
    name:'BodyMenuView',
    methods : {
      isActive : function(menuList){
        console.log("is Active called")
        for(let menuname in menuList){
          if(this.getActiveMenuName === menuname){
            return true
          }
        }
        return false
      },
      menuClickHandler : function(routerViewName){  
        if(this.employee.employeeId && routerViewName === 'EmployeeRetrieve'){
          this.$router.push('EmployeeInfoRetrieveView');
          return;
        }
        this.$router.push(routerViewName);
      }
    },
    computed : {
      ...mapGetters(['getActiveMenuName',]),
      ...mapGetters({
        employee : 'getTempEmployee'
      })
    }
}
</script>

<style>
#bodyMenu{
  width : 150px;
  font-size : small;
  
}
#bodyMenuFont{
  font-size : small;
}
</style>