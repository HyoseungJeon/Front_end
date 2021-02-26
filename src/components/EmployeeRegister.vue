<template>
  <div>
      <employee-register-header-view/>
      <router-view id="EmployeeRegisterRouter"/>
  </div>
</template>

<script>
import EmployeeRegisterHeaderView from '../views/EmployeeReigsterHeaderView'

export default {
  name: 'EmployeeRegister',
  components: {
      EmployeeRegisterHeaderView,
  }
}
</script>

<style>
</style>
