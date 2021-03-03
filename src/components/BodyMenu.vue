<template>
  <div>
      <body-menu-view id="body_menu_form"/>
  </div>
</template>

<script>
import BodyMenuView from '../views/BodyMenuView.vue'

export default {
  name: 'BodyMenu',
  components: {
    BodyMenuView
  }
}
</script>

<style>
  #body_menu_form{
    width: 150px;
  }
</style>
