<template>
  <div>
      <body-menu-view id="body-menu-form" :style="bodyMenu"/>
  </div>
</template>

<script>
import BodyMenuView from '../views/BodyMenuView.vue'

export default {
  name: 'BodyMenu',
  data:function(){
    return {
      bodyMenu :{
        top : '0px',
      }
    }
  },
  components: {
    BodyMenuView
  },
  created(){
    window.addEventListener('scroll', this.handlerScroll)
  },
  destroyed(){
    window.removeEventListener('scroll', this.handlerScroll)
  },
  methods:{
    handlerScroll(){
      this.bodyMenu.top = window.scrollY + "px";
    },
  },
}
</script>

<style>
  #body-menu-form{
    position: relative;
    width: 150px;
    height: auto;
    padding-left: 10px;
    margin-top: 150px;
    transition: 700ms;
    top:0px
  }
</style>
