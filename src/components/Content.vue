<template>
<div id="content_form">
    <content-menu/>
    <router-view id="ContentRouter"/>
</div>
</template>

<script>
import ContentMenu from './ContentMenu.vue'

export default {
  name: 'Content',
  components: {
    ContentMenu
  }
}
</script>

<style>
  #content_form{
    padding-top: 20px;
    padding-left: 15px;
    padding-right: 20px;
  }
</style>
