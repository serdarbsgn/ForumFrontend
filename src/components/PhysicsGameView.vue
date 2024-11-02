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
  import { username } from '@/utils/helpers2';
  export default {
    components: { HeaderView, },
    data() {
        return {
            username,
            user:false,
        }
    },
    mounted() {
        const existingScript = document.getElementById(`gameScript`);
        if (existingScript) {
            window.location.href = `/games/physics`;
        }
        let userScript = document.createElement('script');
        if(this.username){
            this.user = true;
        }else{
            this.user = false;
        }
        userScript.textContent = `
            const user = ${this.user};
        `;
        document.head.appendChild(userScript);
        let gameScript = document.createElement('script');
        gameScript.id = `gameScript`;
        gameScript.setAttribute('src', this.getScript());
        document.head.appendChild(gameScript);
    },
    watch: {
        username(){
            window.location.href = `/games/physics`;
        }
    },
    methods: {
        getScript(){
            return `${backendMainAppAddress}/js/physics.js`
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