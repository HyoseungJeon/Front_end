<template>
<div>
    <sui-grid celled="celled">
        <sui-grid-row>
            <sui-grid-column>
                <content-menu/>
            </sui-grid-column>
            <sui-grid-column :width="1">
                <router-view id="ContentRouter"/>
            </sui-grid-column>
        </sui-grid-row>
    </sui-grid>
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
