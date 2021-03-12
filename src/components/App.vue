<template>
  <div id="app">
    <Header/>
    <Body/>
    <Footer/>
  </div>
</template>

<script>
import Body from './Body.vue'
import Footer from './Footer.vue'
import Header from './Header.vue'
import {mapActions} from 'vuex'

export default {
  mounted:function(){
    this.dropdown()
  },
  name: 'App',
  components: {
    Header,
    Body,
    Footer,
  },
  methods:{
    ...mapActions([
      'dropdown'
    ])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
