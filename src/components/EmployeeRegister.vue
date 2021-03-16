<template>
  <div>
      <ValidationObserver v-slot="{ handleSubmit }"> 
      <form @submit.prevent="handleSubmit(onSubmit)">
      <employee-register-header-view :employeeRegister="handleSubmit" :checkEmployeeValid="onHeaderMenu"/>
      <router-view id="EmployeeRegisterRouter" ref="employeeForms"/>
      </form>
      </ValidationObserver>
  </div>
</template>

<script>
import EmployeeRegisterHeaderView from '../views/EmployeeReigsterHeaderView'
import {mapActions,mapMutations, mapGetters } from 'vuex'
import {ValidationObserver} from 'vee-validate'
import {SwalUtil} from '~/util/'

export default {
  name: 'EmployeeRegister',
  components: {
      EmployeeRegisterHeaderView,
      ValidationObserver,
  },
  methods : {
    ...mapActions(['employeeRegister']),
    ...mapMutations(['setActiveMenuName']),
    onSubmit : function(){
      if(this.isValidEmployeeInfo && this.isValidEmployeeSkill){
        this.employeeRegister(this.employee).then(()=>{
          console.log("called EmployeeRegister onSubmit")
          this.setActiveMenuName(null);
          this.$router.push({name : 'home'})
        })
      }else{
        SwalUtil.warning("기본사항 또는 기술사항 항목을 올바르게 입력해주세요.")
      }
    },
    onHeaderMenu : function(){
      this.$refs.employeeForms.updateEmployeeValid();
    }
  },
  computed : {
    ...mapGetters({
      employee : 'getRegisterEmployee',
      isValidEmployeeInfo : 'getEmployeeInfoFormsCheck',
      isValidEmployeeSkill : 'getEmployeeSkillCheck'
      })
    }
  }

</script>

<style>
</style>
