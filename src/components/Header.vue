<template>
  <div id="header_form">
      <header-view/>
  </div>
</template>

<script>
import HeaderView from '../views/HeaderView.vue'

export default {
  name: 'Header',
  components: {
    HeaderView
  }
}
</script>

<style>
    #header_form{
      padding: 15px;
      box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
      position: fixed;
      width: 100%;
      background: white;
      z-index: 100;
    }
</style>
