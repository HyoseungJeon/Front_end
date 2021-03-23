<template>
  <div>
      <ValidationObserver ref="EmployeeObserver"> 
      <employee-register-header-view :employeeRegister="onSubmit" :checkEmployeeValid="onHeaderMenu"/>
      <router-view id="EmployeeRegisterRouter" ref="employeeForms"/>
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
    onSubmit : async function(){
      await this.$refs.employeeForms.updateEmployeeValid();
      this.scrollToErrorSpan();
      if(this.isValidEmployeeInfo && this.isValidEmployeeSkill){
        this.employeeRegister(this.employee).then(()=>{
          this.$router.push({name : 'home'})
        })
      }else if(!this.isValidEmployeeInfo){
        this.$router.push({name : 'EmployeeInfoReigsterView'})
        SwalUtil.warning("입력되지 않은 기본사항 항목이 존재합니다.")
        this.scrollToErrorSpan();
      }
      else if(!this.isValidEmployeeSkill){
        this.$router.push({name : 'EmployeeSkillVitaeRegisterView'})
        SwalUtil.warning("입력되지 않은 기술사항 항목이 존재합니다.")
        this.scrollToErrorSpan();
      }
    },
    onHeaderMenu : async function(){
      await this.$refs.employeeForms.updateEmployeeValid();
    },
    scrollToErrorSpan : async function(){
      await this.$refs.EmployeeObserver.validate();
      let top = null
      for(let span of document.getElementsByClassName('span-error-message')){
        if(span.innerHTML !== ''){
          let spanTop = window.pageYOffset + span.getBoundingClientRect().top;
        
          if(!top || top > spanTop) top = spanTop
        }
      }

      if(top){
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top:top-250
        });
        return;
      }
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
