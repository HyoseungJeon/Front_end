<template>
  <div>
    <div id="commonCodeHeader">
      <sui-button primary size="medium" content="코드 등록" />
      <sui-button primary size="medium" content="코드 수정" />
      <sui-button primary size="medium" content="코드 삭제" floated="right"/>
    </div>

  </div>
</template>

<script>
export default {
    name:'CommonCodeRetrieveView', 
}
</script>

<style>
  #commonCodeHeader{
    padding-top: 10px;
  }
</style>