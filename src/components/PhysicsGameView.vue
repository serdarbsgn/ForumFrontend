<template>
  <div>
    <HeaderView />
    <br>
    <canvas id="gameCanvas" width="800" height="800" oncontextmenu="return false;"></canvas>
  </div>
</template>

<script>
import { physics } from '@/js/physics';
import HeaderView from './HeaderView.vue';
export default {
  components: { HeaderView, },
  mounted() {
    physics()
    document.title = "Physics";
  },
  methods: {

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