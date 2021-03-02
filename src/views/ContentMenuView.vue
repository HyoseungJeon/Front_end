<template>
    <div>
        <h4>{{activeMenuName}}</h4>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name:'ContentMenuView', 
    data:function(){
        return{
            activeMenuName : this.getActiveMenuName
        }
    },
    computed:{
        ...mapGetters([
            'getActiveMenuName'
        ])
    }
}
</script>

<style>

</style>