<template>
  <HeaderView v-if="!isLoading" />
  <div class="centered-content">
    <p v-if="isLoading">Loading...</p>
    <div v-if="username">
      <h1>Welcome {{ username }}, to the Home Page!</h1>
      <div v-if="isProfilePictureClicked">
        <a href="#" @click.prevent="change_profile_picture">Change Picture</a>
        <a href="#" @click.prevent="remove_profile_picture">Remove Picture</a>
      </div>
      <img :src="picture" class="picture" title="Click to Change or Remove"
        @click.prevent="toggle_profile_picture_options" />
      <p>Here are some stats about you:</p>
      <p>Post Count: {{ postCount }}</p>
      <p>Post Karma Total: {{ postKarmaTotal }}</p>
      <p>Comment Count: {{ commentCount }}</p>
      <p>Comment Karma Total: {{ commentKarmaTotal }}</p>
      <p>
        <a href="#" @click.prevent="logout">Logout</a>
      </p>
    </div>
    <div v-else>
      <h1>Welcome to the Home Page!</h1>
      <p>Please <a href="#" @click.prevent="login">login</a> to access your profile.</p>
      <p>or <a href="#" @click.prevent="register">register</a> to create your profile.</p>
    </div>
    <a href="#" @click.prevent="projects">Click Here For Projects</a>
  </div>
</template>

<script>
import { backendMainAppAddress } from '@/config';
import {username,picture,getUserinfo,removeUserinfo,getUserMainStats, removeUserstats} from '@/utils/helpers'
import axios from 'axios';
import HeaderView from './HeaderView.vue';
export default {
  components: { HeaderView, },
  data() {
    return {
      username,
      picture,
      postCount: 0,
      postKarmaTotal: 0,
      commentCount: 0,
      commentKarmaTotal: 0,
      errorMessage: '',
      isLoading: false,
      isProfilePictureClicked: false,
    };
  },
  watch: {
    async username() {
      this.home()
    },
  },
  methods: {
    async home() {
      this.errorMessage = '';
      this.isLoading = true;
      try {
        await getUserinfo();
        const userStats = await getUserMainStats();
        if (userStats) {
          this.postCount = userStats.postCount;
          this.postKarmaTotal = userStats.postKarmaTotal;
          this.commentCount = userStats.commentCount;
          this.commentKarmaTotal = userStats.commentKarmaTotal;
        }

      } catch (error) {
        this.errorMessage = error.response?.data?.detail || 'Failed to load data. Please try again.';
        if (error.response?.status === 401) {
          this.logout();
        }
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      sessionStorage.removeItem('loginJwt');
      removeUserinfo();
      removeUserstats();
    },
    async login() {
      this.$router.push({ name: 'Login' })
    },
    async register() {
      this.$router.push({ name: 'Register' })
    },
    async change_profile_picture() {
      this.$router.push({ name: 'UploadProfilePicture' })
    },
    async projects() {
      this.$router.push('/vue/project')
    },
    async remove_profile_picture() {
      try {
        removeUserinfo();
        const token = sessionStorage.getItem('loginJwt');
        const config = {
          headers: {
            Authorization: `${token}`,
          },
        };
        await axios.get(`${backendMainAppAddress}/remove-profile-picture`, config);
      } catch (error) {
        this.errorMessage = error.response.data.detail || 'Login failed. Please try again.';
      } finally {
        this.home();
      }
    },
    toggle_profile_picture_options() {
      this.isProfilePictureClicked = !this.isProfilePictureClicked;
    }
  },
  mounted() {
    this.home();
    document.title = `Main Thing`;
  },
};
</script>

<style scoped>
.centered-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 80vh;
}

.picture {
  max-width: 20vw;
}

.picture:hover {
  opacity: 0.8;
  transform: scale(0.85);
  cursor: pointer;
}
</style>