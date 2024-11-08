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
import { minesweeper } from '@/js/minesweeper';
import HeaderView from './HeaderView.vue';
import FooterView from './FooterView.vue';
export default {
  components: { HeaderView,FooterView },
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