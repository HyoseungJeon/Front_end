<template>
 <div id="bodyMenu">
    <sui-accordion is="sui-menu" :active-index="1" vertical exclusive styled>
      <sui-accordion-title id="bodyMenuFont" is="sui-menu-header">
        <sui-icon name="dropdown" />
        사원관리
      </sui-accordion-title>
      <sui-accordion-content :active="isActive('EmployeeRegister') || isActive('EmployeeRetrieve')">
        <sui-accordion exclusive styled>
        <sui-accordion-title
        id="bodyMenuFont"
        :active="isActive('EmployeeRegister')"
        @click="menuClickHandler('EmployeeRegister')">
        사원 등록
        </sui-accordion-title>
        <sui-accordion-title
        id="bodyMenuFont"
        :active="isActive('EmployeeRetrieve')"
        @click="menuClickHandler('EmployeeRetrieve')">사원 조회
        </sui-accordion-title>
        </sui-accordion>
      </sui-accordion-content>
      <sui-accordion-title id="bodyMenuFont" is="sui-menu-header">
        <sui-icon name="dropdown" />
        코드관리
      </sui-accordion-title>
      <sui-accordion-content :active="isActive('CommonCode')">
        <sui-accordion exclusive styled>
        <sui-accordion-title
        id="bodyMenuFont"
        :active="isActive('CommonCode')"
        @click="menuClickHandler('CommonCode')">코드 조회</sui-accordion-title>
        </sui-accordion>
      </sui-accordion-content>
    </sui-accordion>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
    name:'BodyMenuView',
    methods : {
      ...mapMutations(['setActiveMenuName']),

      isActive : function(menu){
        return this.getActiveMenuName === menu;
      },

      menuClickHandler : function(routerViewName){  
        this.setActiveMenuName(routerViewName);
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