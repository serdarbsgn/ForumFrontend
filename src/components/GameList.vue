<template>
    <HeaderView />
    <br>
    <div class="centered-content" style="min-height: 76vh;">
        <h1>Games</h1>
        <h2>These are the games I wrote in Java, then ported to JavaScript to play on browser.</h2>
        <br>
        <a href="#" @click.prevent="pushGame('Snake')" id="snake">Click Here to Play Snake</a><br>
        <a href="#" @click.prevent="pushGame('Minesweeper')" id="minesweeper">Click Here to Play MineSweeper</a><br>
        <a href="#" @click.prevent="pushGame('Physics')" id="physics">Click Here to Play Physics thingy</a>
    </div>
    <br>
    <FooterView />
</template>

<script>
import HeaderView from './HeaderView.vue';
import FooterView from './FooterView.vue';
export default {
    components: { HeaderView, FooterView },
    mounted() {
        document.title = "Games";
    },
    methods: {
        pushGame(name) {
            this.$router.push({ name })
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
    min-height: 76vh;
}
</style>