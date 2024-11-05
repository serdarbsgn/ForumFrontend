<template>
  <div>
    <HeaderView />
    <br>
    <canvas id="gameCanvas" width="800" height="800" oncontextmenu="return false;"></canvas>
  </div>
</template>

<script>
import { physics,setStop } from '@/js/physics';
import HeaderView from './HeaderView.vue';
export default {
  components: { HeaderView, },
  mounted() {
    setStop(false);
    physics()
    document.title = "Physics";
  },
  methods: {

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