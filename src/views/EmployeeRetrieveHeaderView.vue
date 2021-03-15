<template>
  <div id="ERHForm">
    <sui-button type="button" size="medium" content="기본사항" @click="onClickListener('basicInfo')"/>
    <sui-button type="button" size="medium" content="기술사항" @click="onClickListener('skillvitae')"/>
    <sui-button type="button" secondary size="medium" content="퇴사처리" floated="right" @click="onClickListener('employeeRetire')"/>
    <sui-button primary size="medium" content="수정하기" floated="right" @click="onClickListener('employeeModify')"/>
  </div>
</template>

<script>
export default {
    name:'EmployeeRetrieveHeaderView',
    methods:{
      onClickListener(tagName){
        switch(tagName){
          case 'basicInfo':{
            this.$attrs.checkEmployeeValid();
            this.$router.push('EmployeeInfoRetrieveView');
            break;
          }
          case 'skillvitae':{
            this.$attrs.checkEmployeeValid();
            this.$router.push('EmployeeSkillVitaeRetrieveView');
            break;
          }
          case 'employeeRetire':{
            this.$attrs.employeeRetire();
            break;
          }
          case 'employeeModify':{
            this.$attrs.checkEmployeeValid();
            this.$attrs.employeeModify();
            break;
          }
        }
      }
    }
}
</script>

<style>
</style>