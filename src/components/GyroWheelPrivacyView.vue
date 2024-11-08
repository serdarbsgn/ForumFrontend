<template>
    <HeaderView />
    <br>
    <section>
        <h2>Privacy Policy for GyroWheel APP</h2>
        <p><strong>Data Collection and Usage</strong></p>
        <p>We do not collect any personal data from users within the GyroWheel APP.</p>
        <p>No personal data is shared or sold to third parties.</p>
        <p><strong>Transparency and Code Inspection</strong></p>
        <p>If you have any concerns or doubts about this statement, you are welcome to inspect our code.</p>
        <p>The source code for GyroWheel APP is publicly available at <a
                href="https://github.com/serdarbsgn/gyrowheel">GitHub Repository</a>.</p>
        <p><strong>Ads</strong></p>
        <p>We display ads in GyroWheel APP to support its development. Watching ads is optional and purely voluntary. No
            personal data is collected through these ads.</p>
        <p><strong>Contact Information</strong></p>
        <p>If you have any questions or need further information regarding our privacy practices, please contact us at
            <a href="mailto:serdar.bsgn@gmail.com">serdar.bsgn@gmail.com</a>.</p>
    </section>
    <br>
    <FooterView/>
</template>

<script>
import HeaderView from './HeaderView.vue';
import FooterView from './FooterView.vue';
export default {
  components: { HeaderView,FooterView },
}
</script>