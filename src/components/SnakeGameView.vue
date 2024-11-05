<template>
  <div>
    <HeaderView />
    <br>
    <canvas id="gameCanvas" width="800" height="800" oncontextmenu="return false;"></canvas>
    <a href="#" @click.prevent="refreshCanvas()">Resize/Restart</a>
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue';
import { snake,setStop,refreshCanvas} from '@/js/snake';
export default {
  components: { HeaderView, },
  data() {
    return {
    }
  },
  mounted() {
    setStop(false);
    snake();
    document.title = "Snake";
  },
  methods: {
    refreshCanvas,
  }, beforeUnmount() {
    setStop(true);
  }, beforeRouteLeave() {
    setStop(true);
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