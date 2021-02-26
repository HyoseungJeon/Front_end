<template>
  <div>
      <body-menu/>
      <content/>
  </div>
</template>

<script>
import BodyMenu from './BodyMenu.vue'
import Content from './Content.vue'

export default {
  name: 'Body',
  components: {
    Content,
    BodyMenu,
  }
}
</script>

<style>
</style>
