<template>
    <div id="app">
        <pulse-loader class="app-spinner" :loading="loading" :color="color" :size="size"/>
        <div>
        <Header/>
        </div>
        <div>
        <Body/>
        </div>
        <div>
        <Footer/>
        </div>
    </div>
</template>

<script>
    import Body from './Body.vue'
    import Footer from './Footer.vue'
    import Header from './Header.vue'
    import {mapActions, mapGetters} from 'vuex'
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

    export default {
        name: 'App',
        components: {
            Header,
            Body,
            Footer,
            PulseLoader
        },
        data : function() {
            return {
              color: '#1678C2',
              margin: '2px', 
              radius: '2px',
              size : '18px'
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
      width: 100px; 
      height: 100px; 
      position: fixed; 
      top: 50%; 
      left: 50%; 
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%); 
      -ms-transform: translate(-50%, -50%); 
      -o-transform: translate(-50%, -50%); 
      transform: translate(-50%, -50%); 
    }
</style>