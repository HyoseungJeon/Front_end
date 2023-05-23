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
  mounted: async function(){
    await this.commonCodeGet();
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
      await this.$refs.employeeForms.updateEmployeeValid();
      this.scrollToErrorSpan();
      if(this.isValidEmployeeInfo && this.isValidEmployeeSkill){
        this.employeeModify(this.employee)
      }else if(!this.isValidEmployeeInfo){
        this.$router.push({name : 'EmployeeInfoRetrieveView'})
        SwalUtil.warning("입력되지 않은 기본사항 항목이 존재합니다.")
        this.scrollToErrorSpan();
      }
      else if(!this.isValidEmployeeSkill){
        this.$router.push({name : 'EmployeeSkillVitaeRetrieveView'})
        SwalUtil.warning("입력되지 않은 기술사항 항목이 존재합니다.")
        this.scrollToErrorSpan();
      }
    },
    onRetire : function(){
      this.employeeRetire(this.employee.employeeId)
    },
    onHeaderMenu : async function(){
      await this.$refs.employeeForms.updateEmployeeValid();
    },
    scrollToErrorSpan : async function(){
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
}
</script>

<style>
  .grid-container-employee-retrieve{
    display: grid;
    grid-template-columns: 260px auto;
  }
</style>
