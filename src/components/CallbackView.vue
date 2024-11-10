<template>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <div class="loading-spinner" v-if="isLoading"></div>
    <p>Trying to log you in.</p>
  </template>
  
  <script setup>
  import { backendMainAppAddress } from '@/config';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';

  const callbackurl = `${backendMainAppAddress}/callback`;
  const router = useRouter();
  const isLoading = ref(true);
  const errorMessage = ref("");
  
  async function passToBackend() {
    const queryParams = new URLSearchParams(window.location.search);
    const state = queryParams.get('state');
    const code = queryParams.get('code');
  
    if (!state || !code) {
      errorMessage.value = 'Missing parameters in URL';
      isLoading.value = false;
      return;
    }
  
    try {
      const response = await axios.get(callbackurl, {
        params: { state, code }
      });
  
      if (response.data && response.data.token) {
        sessionStorage.setItem('loginJwt', response.data.token);
        router.push({ name: 'Home' });
      } else {
        errorMessage.value = 'Failed to retrieve token from backend.'
      }
    } catch (error) {
      errorMessage.value = 'Error during callback request:'
    } finally {
      isLoading.value = false;
    }
  }
  
  onMounted(() => {
    passToBackend();
  });
  </script>
  
  <style scoped>
  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 6px solid #ccc;
    border-top: 6px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: auto;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  