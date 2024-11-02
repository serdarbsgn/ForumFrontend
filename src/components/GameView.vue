<template>
    <div>
    <HeaderView/>
    <br>
      <canvas id="gameCanvas" width="800" height="800" oncontextmenu="return false;"></canvas>
    </div>
  </template>
  
  <script>
  import HeaderView from './HeaderView.vue';
  import { backendMainAppAddress } from '@/config';
  export default {
    components: { HeaderView, },
    props: {
      gameName: {
        type: String,
      }
    },
    mounted() {
        const existingScript = document.getElementById(`gameScript`);
        if (existingScript) {
            window.location.href = `/games/${this.gameName}`;
        }
        let gameScript = document.createElement('script');
        gameScript.id = `gameScript`;
        gameScript.setAttribute('src', this.getScript());
        document.head.appendChild(gameScript);
    },
    methods: {
        getScript(){
            return `${backendMainAppAddress}/js/${this.gameName}.js`
        }
    }
  };
  </script>
  <style scoped>
        #gameCanvas {
            display: block;
            margin: auto;
        }
        .iframe-container {
            position: absolute;
            display: none;
            border: none;
        }
  </style>