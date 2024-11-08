<template>
    <HeaderView v-if="!isLoading" />
    <div class="centered-content" style="min-height: 80vh;">
        <p v-if="isLoading">Loading...</p>
        <div v-if="username">
            <h1>Welcome {{ username }}, to the Home Page!</h1>
            <div v-if="isProfilePictureClicked">
                <a href="#" @click.prevent="change_profile_picture">Change Picture</a>
                <a href="#" @click.prevent="remove_profile_picture">Remove Picture</a>
            </div>
            <img :src="picture" class="picture" title="Click to Change or Remove the Profile Picture"
                @click.prevent="toggle_profile_picture_options" />
            <p>Here are some stats about you:</p>
            <p>Post Count: {{ postCount }}</p>
            <p>Post Karma Total: {{ postKarmaTotal }}</p>
            <p>Comment Count: {{ commentCount }}</p>
            <p>Comment Karma Total: {{ commentKarmaTotal }}</p>
            <p>
                <a href="#" @click.prevent="toggleUsernameForm">Change Username</a>
            </p>
            <div v-if="isUsernameFormVisible">
                <form @submit.prevent="updateUsername" class="form-container">
                    <input class="dark-textarea" ref="updateUsernameInput" type="text" v-model="newUsername"
                        placeholder="New Username" tabindex="0" required />
                    <button type="submit" class="dark-button">Submit</button>
                </form>
                <p v-if="usernameErrorMessage" class="error">{{ usernameErrorMessage }}</p>
            </div>
            <p>
                <a href="#" @click.prevent="toggleUpdatePasswordForm">Change Password</a>
            </p>

            <div v-if="isUpdatePasswordFormVisible">
                <form @submit.prevent="updatePassword" class="form-container">
                    <input type="text" placeholder="Username" tabindex="0" autocomplete="username" hidden />
                    <input class="dark-textarea" ref="updatePasswordInput" type="password" v-model="currentPassword"
                        placeholder="Current Password" tabindex="0" required autocomplete="current-password" />
                    <input class="dark-textarea" type="password" v-model="newPassword" placeholder="New Password"
                        required autocomplete="new-password" />
                    <button type="submit" class="dark-button">Submit</button>
                </form>
                <p v-if="passwordErrorMessage" class="error">{{ passwordErrorMessage }}</p>
            </div>
            <p>
                <a href="#" @click.prevent="toggleRemoveAccountForm">Remove Account</a>
            </p>
            <div v-if="isRemoveAcccountFormVisible">
                <form @submit.prevent="removeAccountConfirm" class="form-container">
                    <input class="dark-textarea" ref="removeAccountInput" type="text" v-model="removeUsername"
                        placeholder="Type your username to confirm" tabindex="0" required />
                    <button type="submit" class="dark-button">Submit</button>
                </form>
                <p v-if="removeErrorMessage" class="error">{{ removeErrorMessage }}</p>
            </div>
            <div v-if="showRemoveConfirm" class="modal-overlay">
                <div class="modal-content" ref="modalContent" v-on:blur="cancelRemove" tabindex="0">
                    <p>Are you sure you want to <strong>delete</strong> your account? This is irreversible.</p>
                    <br>
                    <div style="display: flex; justify-content:space-evenly;">
                        <button class="dark-button" @click="removeAccount">Yes</button>
                        <button class="dark-button" @click="cancelRemove">No</button>
                    </div>
                </div>
            </div>
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
    <br>
    <FooterView/>
</template>

<script>
import { backendMainAppAddress } from '@/config';
import { username, picture, getUserinfo, removeUserinfo, logout, getUserMainStats, removeUserstats } from '@/utils/helpers'
import { nextTick } from 'vue';
import axios from 'axios';
import HeaderView from './HeaderView.vue';
import FooterView from './FooterView.vue';
export default {
  components: { HeaderView,FooterView },
    data() {
        return {
            username,
            picture,
            postCount: 0,
            postKarmaTotal: 0,
            commentCount: 0,
            commentKarmaTotal: 0,
            usernameErrorMessage: '',
            passwordErrorMessage:'',
            removeErrorMessage:'',
            errorMessage:'',
            isLoading: false,
            isUsernameFormVisible: false,
            isRemoveAcccountFormVisible: false,
            isUpdatePasswordFormVisible: false,
            isProfilePictureClicked: false,
            newPassword: null,
            currentPassword: null,
            newUsername: null,
            removeUsername: null,
            showRemoveConfirm: false,

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
        toggleUsernameForm() {
            this.isUsernameFormVisible = !this.isUsernameFormVisible;
            if (this.isUsernameFormVisible) {
                nextTick(() => {
                    this.$refs.updateUsernameInput.focus();
                });
            }
        },
        async updateUsername() {
            this.usernameErrorMessage = '';
            try {
                const token = sessionStorage.getItem('loginJwt');
                const config = {
                    headers: {
                        Authorization: `${token}`,
                    },
                };
                await axios.put(`${backendMainAppAddress}/username`, { username: this.newUsername }, config);
                removeUserinfo();
                this.isUsernameFormVisible = false;
            } catch (error) {
                this.usernameErrorMessage = error.response?.data?.detail || 'Failed to update username. Please try again.';
            }
        },
        toggleRemoveAccountForm() {
            this.isRemoveAcccountFormVisible = !this.isRemoveAcccountFormVisible;
            if (this.isRemoveAcccountFormVisible) {
                nextTick(() => {
                    this.$refs.removeAccountInput.focus();
                });
            }
        },
        async removeAccount() {
            this.removeErrorMessage = '';
            try {
                const token = sessionStorage.getItem('loginJwt');
                const config = {
                    headers: {
                        Authorization: `${token}`,
                    },
                };
                await axios.post(`${backendMainAppAddress}/remove-account`, { username: this.removeUsername }, config);
                logout();
                this.isRemoveAcccountFormVisible = false;
            } catch (error) {
                this.removeErrorMessage = error.response?.data?.detail || 'Failed to remove user. Please try again.';
            }
        },
        toggleUpdatePasswordForm() {
            this.isUpdatePasswordFormVisible = !this.isUpdatePasswordFormVisible;
            if (this.isUpdatePasswordFormVisible) {
                nextTick(() => {
                    this.$refs.updatePasswordInput.focus(); 
                });

            }
        },
        async updatePassword() {
            this.passwordErrorMessage = '';
            try {
                const token = sessionStorage.getItem('loginJwt');
                const config = {
                    headers: {
                        Authorization: `${token}`,
                    },
                };
                await axios.put(`${backendMainAppAddress}/password`, { current_password: this.currentPassword, new_password: this.newPassword }, config);
                this.isUpdatePasswordFormVisible = false;
            } catch (error) {
                this.passwordErrorMessage = error.response?.data?.detail || 'Failed to update password. Please try again.';
            }
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
        },
        async removeAccountConfirm() {
            this.showRemoveConfirm = true;
            nextTick(() => {
                this.$refs.modalContent.focus(); // Focus on the modal content
            });
        },
        cancelRemove() {
            setTimeout(() => {
                this.removeUsername = null;
                this.showRemoveConfirm = false;
            }, 100);
        },
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

.form-container {
    display: flex;
}
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: rgb(27, 27, 27);
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    text-align: center;
}
.error {
    color: red;
}
</style>