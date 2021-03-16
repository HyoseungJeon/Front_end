<template>
    <div id="app">
        <clip-loader class="app-spinner" :loading="loading" :color="color" :size="size"></clip-loader>
        <Header/>
        <Body/>
        <Footer/>
    </div>
</template>

<script>
    import Body from './Body.vue'
    import Footer from './Footer.vue'
    import Header from './Header.vue'
    import {mapActions, mapGetters} from 'vuex'
    import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

    export default {
        mounted: function () {
            this.dropdown()
        },
        name: 'App',
        components: {
            Header,
            Body,
            Footer,
            ClipLoader
        },
        data : function() {
            return {
              color: '#1678C2',
              height: '35px', 
              width: '4px',
              margin: '2px', 
              radius: '2px',
              size : '45px'
              }
        },
        methods: {
            ...mapActions(['dropdown'])
        },
        computed : {
          ...mapGetters({loading : 'getLoading'})
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .app-spinner {
      width: 60px; 
      height: 60px; 
      position: absolute; 
      top: 50%; 
      left: 50%; 
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%); 
      -ms-transform: translate(-50%, -50%); 
      -o-transform: translate(-50%, -50%); 
      transform: translate(-50%, -50%); 
    }
</style>