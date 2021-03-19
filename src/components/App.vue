<template>
    <div id="app">
        <div class="app-spinner-background" v-show="loading">
        </div>
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
        font-size: 13px;
        /* font-family: Avenir, Helvetica, Arial, sans-serif; */
        font-family: 'RIDIBatang';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .app-spinner-background{
        background: black;
        position: fixed;
        z-index: 9998;
        align-content: center;
        width: 100%;
        height: 100%;
        opacity: 0.2;
    }
    .app-spinner {
        z-index: 9999;
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