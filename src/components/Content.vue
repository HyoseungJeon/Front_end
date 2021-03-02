<template>
<div>
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
</style>
