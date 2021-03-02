<template>
  <div id='main_form'>
    <sui-button secondary size="medium" content="기본사항" />
    <sui-button secondary size="medium" content="기술사항" />
    <sui-button primary size="medium" content="등록" floated="right"/>
  </div>
</template>

<script>
export default {
    name:'EmployeeReigsterHeaderView', 
}
</script>

<style>
  #main_form{
    padding: 5dp;
  }

</style>