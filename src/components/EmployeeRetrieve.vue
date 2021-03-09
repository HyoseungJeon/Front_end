<template>
  <div class="grid-container-employee-retrieve">
    <div>
      <employee-list-view/>
    </div>
    <div>
      <ValidationObserver v-slot="{ handleSubmit }"> 
      <form @submit.prevent="handleSubmit(onModify)">
      <employee-menu-view/>
      <employee-retrieve-header-view v-if="employee.employeeId" :employeeRetire="onRetire" :employeeModify="handleSubmit"/>
      <router-view v-if="employee.employeeId" id="EmployeeRetrieveRouter">
      </router-view>
      </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import EmployeeListView from '../views/EmployeeListView.vue'
import EmployeeMenuView from '../views/EmployeeMenuView.vue'
import EmployeeRetrieveHeaderView from '../views/EmployeeRetrieveHeaderView.vue'
import {ValidationObserver} from 'vee-validate'
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
  name: 'EmployeeRetrieve',
  components: {
    EmployeeMenuView,
    EmployeeListView,
    EmployeeRetrieveHeaderView,
    ValidationObserver,
  },
  computed:{
    ...mapGetters({
      employee : 'getEmployee'
    })
  },
  methods : {
    ...mapActions(['employeeModify','employeeRetire']),
    onModify : function(){
      alert('수정!');
    },
    onRetire(){
      alert('퇴사!');
    }
  },
}
</script>

<style>
  .grid-container-employee-retrieve{
    display: grid;
    grid-template-columns: 260px auto;
  }
</style>
