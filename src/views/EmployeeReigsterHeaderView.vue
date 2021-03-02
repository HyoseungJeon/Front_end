<template>
  <div id="ERHForm">
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
  #ERHForm{
    padding-top: 10px;
  }

</style>