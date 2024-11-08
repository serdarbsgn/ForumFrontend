<template>
  <div>
    <HeaderView />
    <br>
    <canvas id="gameCanvas" width="800" height="800" oncontextmenu="return false;"></canvas>
    <br>
    <FooterView/>
  </div>
</template>

<script>
import { physics,setStop } from '@/js/physics';
import HeaderView from './HeaderView.vue';
import FooterView from './FooterView.vue';
export default {
  components: { HeaderView,FooterView },
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