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
    }
</style>
