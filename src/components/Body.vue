<template>
    <div class="grid-container-body">
      <div>
        <body-menu/>
      </div>
      <div>
        <Content/>
      </div>
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
  .grid-container-body {
    display: grid;
    grid-template-columns: 150px auto;
  }
</style>
