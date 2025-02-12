<template>
  <div class="login-container">
    <form @submit.prevent="login">
      <h2>Login</h2>
      <div>
        <label for="usernameLogin">Username:</label>
        <input class="dark-textarea" type="text" id="usernameLogin" v-model="username" required autocomplete="username"/>
      </div>
      <div>
        <label for="passwordLogin">Password:</label>
        <input class="dark-textarea" type="password" id="passwordLogin" v-model="password" required autocomplete="current-password" />
      </div>
      <button class="dark-button" type="submit">Login</button>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </form>
    <a href="#" @click.prevent="loginWithGoogle">Login using Google</a>
  </div>
</template>

<script>
import { backendMainAppAddress } from '@/config';
import { getUserinfo } from '@/utils/helpers';
import axios from 'axios';

export default {
  name: "LoginView",
  props: {
    redirectOnLogin: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',

    };
  },
  methods: {
    async login() {
      this.errorMessage = '';
      try {
        const tokenResponse = await axios.get(`${backendMainAppAddress}/login`);
        const jwtToken = tokenResponse.data.token;

        const loginResponse = await axios.post(`${backendMainAppAddress}/login`, {
          username: this.username,
          password: this.password,
          token: jwtToken,
        });
        const loginToken = loginResponse.data.token;
        sessionStorage.setItem('loginJwt', loginToken);
        getUserinfo()
        window.parent.postMessage({ response: 'Logged In' }, '*');
        if (this.redirectOnLogin) {
          this.$router.push({ name: 'Home' });
        }
      } catch (error) {
        this.errorMessage = error.response.data.detail || 'Login failed. Please try again.';
      }
    },
    async loginWithGoogle() {
      let currentUrl = window.location.pathname;
      if (currentUrl === "/login" || currentUrl === "/register") {
        currentUrl = "/";
      }
      const redirectUrl = `/api/google-register?url=${encodeURIComponent(currentUrl)}`;
      if (this.inIframe) {
        window.parent.location.href = redirectUrl;
      } else {
        window.location.href = redirectUrl;
      }
    }
  },
  computed: {
    inIframe() {
      return window.top !== window.self;
    }
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
}

.error {
  color: red;
}
.dark-textarea {
    margin-top: auto;
    font-size: 18px;
    background-color: #333;
    color: #bdbdbd;
    border: 1px solid #555;
    resize: none;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
}
.dark-button {
    font-size: 17px;
    background-color: #0c4511;
    color: #bdbdbd;
    border: 1px solid #555;
}
</style>