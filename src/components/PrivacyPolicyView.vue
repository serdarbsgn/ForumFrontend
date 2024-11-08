<template>
    <HeaderView ref="headerView" />
    <section style="min-height: 76vh;">
        <article>
            <br>
            <h1><strong>Privacy Policy</strong></h1>
            <br>
            <h3>&emsp;We don't share your data with anyone, and only feasible data we hold is your email address and profile
                picture
                of your Google/Facebook account.</h3>
            <h3>&emsp;By using your Google/Facebook account to register, you are letting us to hold on to your Google/Facebook
                account
                profile picture and Google/Facebook email address.</h3>
            <h3>&emsp;The data we got from you can removed via the functions in the website, so you can delete them.</h3>
        </article>
        <article>
            <br>
            <h1><strong>Terms of Service</strong></h1>
            <h3>&emsp;Be kind, and know that everything in this page will be deleted.</h3>
        </article>
    </section>
    <br>
    <FooterView/>
</template>

<script>
import HeaderView from './HeaderView.vue';
import FooterView from './FooterView.vue';
export default {
  components: { HeaderView,FooterView },
    data() {
        return {
        }
    },
    mounted() {
        document.title = "Privacy Policy/ToS";
    },
    methods: {

    }
};
</script>