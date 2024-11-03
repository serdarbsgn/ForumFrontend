<template>
  <div>
    <HeaderView />
    <br>
    <canvas id="gameCanvas" width="800" height="800" oncontextmenu="return false;"></canvas>
  </div>
</template>

<script>
import { minesweeper } from '@/js/minesweeper';
import HeaderView from './HeaderView.vue';
export default {
  components: { HeaderView, },
  data() {
    return {
    }
  },
  mounted() {
    minesweeper();
    document.title = "MineSweeper";
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