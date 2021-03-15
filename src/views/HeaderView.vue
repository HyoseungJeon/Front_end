<template>
  <div>
    <img id="logo_form" src='@/assets/images/plateer_logo.png' width="200" height="50"
    @click="onClickHomeBtn"/>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
    name:'HeaderView', 
    methods:{
      ...mapMutations(['setActiveMenuName']),
      onClickHomeBtn:function(){
        this.setActiveMenuName(null);
        this.$router.push({name : 'home'})
      },
    }
}
</script>

<style>
</style>