<template>
  <div id="ERHForm">
    <sui-button type="button" secondary size="medium" content="기본사항" @click="onClickListener('basicInfo')"/>
    <sui-button type="button" secondary size="medium" content="기술사항" @click="onClickListener('skillvitae')"/>
    <sui-button type="submit" primary size="medium" content="등록" floated="right" @click="onClickListener('employeeRegister')"/>
  </div>
</template>

<script>
export default {
    name:'EmployeeReigsterHeaderView', 
    methods:{
      onClickListener(tagName){
        switch(tagName){
          case 'basicInfo':{
            this.$router.push('EmployeeInfoReigsterView');
            break;
          }
          case 'skillvitae':{
            this.$router.push('EmployeeSkillVitaeRegisterView');
            break;
          }
          case 'employeeRegister':{
            this.$attrs.employeeRegister();
            break;
          }
        }
      }
    }
}
</script>

<style>
  #ERHForm{
    padding-top: 10px;
  }

</style>