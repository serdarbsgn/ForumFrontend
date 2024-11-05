<template class="fs-cont">
    <canvas id="homeCanvas" width="800" height="800" oncontextmenu="return false;"></canvas>
    
</template>

<script>
import { canvas_home, setStop, pushToHome } from '@/js/home';
import { username } from '@/utils/helpers2';
export default {
    data() {
        return {
            username,
            pushToHome,
            user: null,
            currentController: null, // Store the current AbortController
            hasRendered: false
        }
    },
    mounted() {
        this.user = this.username;
        setStop(false);
        this.renderCanvas();
        document.title = "Canvas Home";
    },
    watch: {
        pushToHome(newVal) {
            if (newVal) {
                setTimeout(() => {
                    this.$router.push({ name: 'Home' });
                }, 200);
            }
        }
    },
    methods: {
        renderCanvas() {
            canvas_home(this.user);
        }
    }, beforeUnmount() {
        setStop(true);
    }, beforeRouteLeave() {
        setStop(true);
    }
};
</script>
<style scoped>
#homeCanvas {
    display: block;
    margin: -2rem;

}
</style>