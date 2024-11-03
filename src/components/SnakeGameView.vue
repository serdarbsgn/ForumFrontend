<template>
  <div>
    <HeaderView />
    <br>
    <canvas id="gameCanvas" width="800" height="800" oncontextmenu="return false;"></canvas>
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue';
import { snake } from '@/js/snake';
export default {
  components: { HeaderView, },
  data() {
    return {
    }
  },
  mounted() {
    snake();
    document.title = "Snake";
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