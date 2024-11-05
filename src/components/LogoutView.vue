<template>
    
</template>
<script>
import {logout} from '@/utils/helpers2'
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
