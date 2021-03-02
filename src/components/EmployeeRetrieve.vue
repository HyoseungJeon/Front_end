<template>
  <div>
      <sui-grid celled="celled">
        <sui-grid-row>
            <sui-grid-column>
                <employee-list-view/>
            </sui-grid-column>
            <sui-grid-column :width="1">
                <employee-menu-view/>
                <employee-retrieve-header-view/>
                <router-view id="EmployeeRetrieveRouter"/>
            </sui-grid-column>
        </sui-grid-row>
    </sui-grid>
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
</style>
