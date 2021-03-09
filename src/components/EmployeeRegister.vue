<template>
  <div>
      <ValidationObserver v-slot="{ handleSubmit }"> 
      <form @submit.prevent="handleSubmit(onSubmit)">
      <employee-register-header-view :employeeRegister="handleSubmit"/>
      <router-view id="EmployeeRegisterRouter"/>
      </form>
      </ValidationObserver>
  </div>
</template>

<script>
import EmployeeRegisterHeaderView from '../views/EmployeeReigsterHeaderView'
import {mapActions, mapGetters} from 'vuex'
import {ValidationObserver} from 'vee-validate'

export default {
  name: 'EmployeeRegister',
  components: {
      EmployeeRegisterHeaderView,
      ValidationObserver,
  },
  methods : {
    ...mapActions(['employeeRegister']),
    onSubmit : function(){
      this.employeeRegister(this.employee);
    }
  },
  computed : {
    ...mapGetters({employee : 'getRegisterEmployee'})
  }
}
</script>

<style>
</style>
