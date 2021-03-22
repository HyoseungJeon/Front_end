<template>
  <div>
    <img id="logo_form" src='@/assets/images/plateer_logo.png' width="200" height="50"
    @click="onClickHomeBtn"/>
  </div>
</template>

<script>
export default {
    name:'HeaderView', 
    methods:{
      onClickHomeBtn:function(){
        this.$router.push({name : 'home'})
      },
    }
}
</script>

<style>
</style>