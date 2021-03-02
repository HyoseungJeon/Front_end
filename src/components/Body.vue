<template>
  <div>
    <sui-grid celled="celled">
        <sui-grid-row>
            <sui-grid-column>
              <body-menu/>
            </sui-grid-column>
            <sui-grid-column :width="1">
              <Content/>
            </sui-grid-column>
        </sui-grid-row>
    </sui-grid>
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
