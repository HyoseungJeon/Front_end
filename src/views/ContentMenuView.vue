<template>
    <div>
        <h4>{{this.getActiveMenuNameAsKorean}}</h4>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name:'ContentMenuView', 
    computed:{
        ...mapGetters([
            'getActiveMenuNameAsKorean'
        ])
    },
    methods:{
        ...mapMutations(['setActiveMenuName'])
    },
    watch:{
    '$route.query'(){
        this.setActiveMenuName(this.$route.name)
    },
  },
}
</script>

<style>

</style>