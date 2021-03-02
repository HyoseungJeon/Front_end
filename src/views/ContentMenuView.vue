<template>
    <div>
        <h4>{{this.getActiveMenuName}}</h4>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name:'ContentMenuView', 
    computed:{
        ...mapGetters([
            'getActiveMenuName'
        ])
    }
}
</script>

<style>

</style>