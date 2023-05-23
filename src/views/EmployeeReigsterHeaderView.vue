<template>
  <div id="ERHForm">
    <sui-button type="button" size="medium" content="기본사항" @click="onClickListener('basicInfo')"/>
    <sui-button type="button" size="medium" content="기술사항" @click="onClickListener('skillvitae')"/>
    <sui-button type="submit" primary size="medium" content="등록" floated="right" @click="onClickListener('employeeRegister')"/>
  </div>
</template>

<script>

export default {
    methods:{
      onClickListener(tagName){
        this.$attrs.checkEmployeeValid();
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

  #header-button {
    margin-right: 50px !important;
  }

</style>