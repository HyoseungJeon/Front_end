<template>
  <div id="app">
    <header/>
    <body/>
    <footer/>
  </div>
</template>

<script>
import Body from './Body.vue'
import Footer from './Footer.vue'
import Header from './Header.vue'

export default {
  name: 'App',
  components: {
    Header,
    Body,
    Footer,
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
