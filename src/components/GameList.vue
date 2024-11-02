<template>
    <div>
        <HeaderView />
        <br>
        <h1>Games</h1>
        <div class="centered-content">
            <h2>These are the games I wrote in Java, then ported to JavaScript to play on browser.</h2>
            <br>
            <a href="#" @click="pushGame('snake')" id="snake">Click Here to Play Snake</a><br>
            <a href="#" @click="pushGame('minesweeper')" id="minesweeper">Click Here to Play MineSweeper</a><br>
            <a href="#" @click="pushGame('physics')" id="physics">Click Here to Play Physics thingy</a>
        </div>
    </div>
</template>

<script>
import HeaderView from './HeaderView.vue';

export default {
    components: { HeaderView, },
    props: {
        gameName: {
            type: String,
        }
    },
    mounted() {
        document.title = "Games";
    },
    methods: {
        pushGame(name) {
            this.$router.push({ name: 'Game', params: { "gameName": name } });
        }
    }
};
</script>
<style scoped>
.centered-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 80vh;
}

</style>