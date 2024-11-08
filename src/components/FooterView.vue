<template>
    <footer>
        <p> https://github.com/serdarbsgn</p>
        <li><a href="#" @click.prevent="pushPrivacy">Privacy Policy/ToS</a></li>
    </footer>
</template>

<script>
export default {
    name: "FooterView",
    methods: {
        pushPrivacy() {
            this.$router.push({ name: 'PrivacyPolicy' })
        }
    }
}
</script>

<style scoped>
footer {
    background-color: #202b66;
    color: #404040;
    text-align: center;
    padding: 10px;
    margin-top: auto;
}
</style>