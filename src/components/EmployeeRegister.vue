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
  mounted:function(){
    this.dropdown();
  },
  name: 'EmployeeRegister',
  components: {
      EmployeeRegisterHeaderView,
      ValidationObserver,
  },
  methods : {
    ...mapActions(['employeeRegister','dropdown']),
    ...mapMutations(['setActiveMenuName']),
    onSubmit : function(){
      if(this.isValidEmployeeInfo && this.isValidEmployeeSkill){
        this.employeeRegister(this.employee).then(()=>{
          console.log("called EmployeeRegister onSubmit")
          this.setActiveMenuName(null);
          this.$router.push({name : 'home'})
        })
      }else if(!this.isValidEmployeeInfo){
        this.$router.push({name : 'EmployeeInfoReigsterView'})
        SwalUtil.warning("입력되지 않은 기본사항 항목이 존재합니다.")
      }
      else if(!this.isValidEmployeeSkill){
        this.$router.push({name : 'EmployeeSkillVitaeRegisterView'})
        SwalUtil.warning("입력되지 않은 기술사항 항목이 존재합니다.")
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
