<template>
    <canvas id="homeCanvas" width="800" height="800" oncontextmenu="return false;"></canvas>
</template>

<script>
import { canvas_home } from '@/js/home';
import { username } from '@/utils/helpers2';
export default {
    data() {
        return {
            username,
            user: null,
            currentController: null // Store the current AbortController
        }
    },
    mounted() {
        this.user = this.username;
        this.renderCanvas();
        document.title = "Canvas Home";
    },
    watch: {
        username(newVal, oldVal) {
            this.user = this.username
            if (newVal !== oldVal) {
                this.renderCanvas(); // Call renderCanvas when username changes
            }
        }
    },
    methods: {
        renderCanvas() {

            if (this.currentController) {
                this.currentController.abort(); // Stop the previous instance
            }

            // Create a new AbortController for the new instance
            this.currentController = new AbortController();
            const { signal } = this.currentController;

            // Call canvas_home with the current user and the new abort signal
            canvas_home(this.user, signal);
        }
    }
};
</script>
<style scoped>
#homeCanvas {
    display: block;
    margin: auto;
}
</style>