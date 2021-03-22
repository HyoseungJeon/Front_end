<template>
  <div class="grid-container-employee-retrieve">
    <div>
      <employee-list-view/>
    </div>
    <div>
      <ValidationObserver ref="EmployeeObserver"> 
      <employee-menu-view/>
      <employee-retrieve-header-view v-if="employee.employeeId" :employeeRetire="onRetire" :employeeModify="onModify"
      :checkEmployeeValid="onHeaderMenu"/>
      <router-view v-if="employee.employeeId" id="EmployeeRetrieveRouter" ref="employeeForms">
      </router-view>
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
    this.commonCodeGet();
    //this.dropdown();
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
      isValidEmployeeSkill : 'getEmployeeSkillCheck',
      isEmployeeChanged : 'getEmployeeChanged',
    })
  },
  methods : {
    ...mapActions(['employeeModify','employeeRetire','dropdown', 'commonCodeGet']),
    onModify : async function(){
      if(!this.isEmployeeChanged){
        SwalUtil.info("변경사항이 없습니다.")
        return;
      }
      await this.$refs.EmployeeObserver.validate();
      Object.values(document.getElementsByClassName('span-error-message')).forEach(span => {
        if(span.innerHTML !== ''){
          span.scrollIntoView();
          return;
        }
      })
      if(this.isValidEmployeeInfo && this.isValidEmployeeSkill){
        this.employeeModify(this.employee)
      }else{
        SwalUtil.warning("기본사항 또는 기술사항 항목을 올바르게 입력해주세요.")
      }
    },
    onRetire : function(){
      this.employeeRetire(this.employee.employeeId)
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
