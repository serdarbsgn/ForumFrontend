<template>
  <div>
    <HeaderView />
    <a href="#" @click.prevent="refreshCanvas()">Resize/Restart</a>
    <canvas id="gameCanvas" width="800" height="800" oncontextmenu="return false;"></canvas>
    <br>
    <FooterView/>
  </div>
</template>

<script>
import FooterView from './FooterView.vue';
import HeaderView from './HeaderView.vue';
import { snake,setStop,refreshCanvas} from '@/js/snake';
export default {
  components: { HeaderView, FooterView},
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