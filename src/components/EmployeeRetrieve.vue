<template>
  <div class="grid-container-employee-retrieve">
    <div>
      <employee-list-view/>
    </div>
    <div>
      <ValidationObserver v-slot="{ handleSubmit }"> 
      <form @submit.prevent="handleSubmit(onModify)">
      <employee-menu-view/>
      <employee-retrieve-header-view v-if="employee.employeeId" :employeeRetire="onRetire" :employeeModify="handleSubmit"
      :checkEmployeeValid="onHeaderMenu"/>
      <router-view v-if="employee.employeeId" id="EmployeeRetrieveRouter" ref="employeeForms">
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
import {SwalUtil} from '~/util/'

export default {
  mounted:function(){
    this.dropdown();
  },
  name: 'EmployeeRetrieve',
  components: {
    EmployeeMenuView,
    EmployeeListView,
    EmployeeRetrieveHeaderView,
    ValidationObserver,
  },
  computed:{
    ...mapGetters({
      employee : 'getTempEmployee',
      isValidEmployeeInfo : 'getEmployeeInfoFormsCheck',
      isValidEmployeeSkill : 'getEmployeeSkillCheck'
    })
  },
  methods : {
    ...mapActions(['employeeModify','employeeRetire','dropdown']),
    onModify : function(){
      if(this.isValidEmployeeInfo && this.isValidEmployeeSkill){
        this.employeeModify(this.employee)
      }else{
        SwalUtil.warning("기본사항 또는 기술사항 항목을 올바르게 입력해주세요.")
      }
    },
    onRetire : function(){
      this.employeeRetire(this.employee.employeeId)
      .then(response => response === 200 ? '' : '')
      .catch(error => console.log(error));
    },
    onHeaderMenu : function(){
      this.$refs.employeeForms.updateEmployeeValid();
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
