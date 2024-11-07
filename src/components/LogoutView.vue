<template>

</template>
<script>
import {logout} from '@/utils/helpers'
export default {
  data() {
    return {
    }
  },
  mounted() {
    logout();
    window.parent.postMessage({ response: 'Logged Out' }, '*');
  },
  methods: {

  }
};
</script>
