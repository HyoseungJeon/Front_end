<template>
    <div>
        <h4>{{this.activeMenuNameAsKorean}}</h4>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name:'ContentMenuView', 
    computed:{
        ...mapGetters([
            'getActiveMenuNameAsKorean'
        ])
    }
}
</script>

<style>

</style>