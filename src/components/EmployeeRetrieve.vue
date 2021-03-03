<template>
  <div class="grid-container-employee-retrieve">
    <div>
      <employee-list-view/>
    </div>
    <div>
      <employee-menu-view/>
      <employee-retrieve-header-view/>
      <router-view id="EmployeeRetrieveRouter"/>
    </div>
  </div>
</template>

<script>
import EmployeeListView from '../views/EmployeeListView.vue'
import EmployeeMenuView from '../views/EmployeeMenuView.vue'
import EmployeeRetrieveHeaderView from '../views/EmployeeRetrieveHeaderView.vue'

export default {
  name: 'EmployeeRetrieve',
  components: {
    EmployeeMenuView,
    EmployeeListView,
    EmployeeRetrieveHeaderView
  }
}
</script>

<style>
  .grid-container-employee-retrieve{
    display: grid;
    grid-template-columns: 260px auto;
  }
</style>
