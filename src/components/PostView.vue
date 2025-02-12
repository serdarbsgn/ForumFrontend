<template>
    <HeaderView ref="headerView" />
    <div class="centered-content" style="min-height: 76vh;">
        <template v-if="contents">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <h1 v-html="contents.title"></h1>
            <h2 v-html="'&emsp;' + contents.content"></h2>
            <div style="display: flex;justify-content: space-between;align-items: center;">
                <div>
                    <a href="#" :class="['like-button', { active: l_d === 'Like' }]" @click.prevent="likePost()"><span
                            class="material-icons">thumb_up</span></a>
                    <span class="like-count"> {{ contents.likes }} </span>
                    <a href="#" :class="['dislike-button', { active: l_d === 'Dislike' }]"
                        @click.prevent="dislikePost()"><span class="material-icons">thumb_down</span></a>
                </div>
                <div>
                    <h3 class="right-container"><i>by&nbsp;</i> {{ creator }}</h3>
                    <p class="right-container">Created:{{ new Date(contents.created_at).toLocaleString(undefined, {
                        year: 'numeric', month: '2-digit', day:
                            '2-digit', hour: '2-digit', minute: '2-digit'
                    }) }}</p>
                    <p class="right-container">Updated: {{ new Date(contents.updated_at).toLocaleString(undefined, {
                        year: 'numeric', month: '2-digit', day:
                            '2-digit', hour: '2-digit', minute: '2-digit'
                    }) }}</p>
                    <a href="#" v-if="creator === username" @click.prevent="confirmDeletePostPrompt">Delete</a>
                    <div v-if="showDeletePostConfirm" class="modal-overlay">
                        <div class="modal-content" ref="modalContentPost" v-on:blur="cancelDeletePost" tabindex="0">
                            <p>Are you sure you want to <strong>delete</strong> this post?</p>
                            <br>
                            <div style="display: flex; justify-content:space-evenly;">
                                <button class="dark-button" @click="deletePost">Yes</button>
                                <button class="dark-button" @click="cancelDeletePost">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <h1>Comments</h1><br>
            <CommentView :post_id="postId" />
        </template>

    </div>
    <br>
    <FooterView />
</template>


<script>
import axios from 'axios';
import { nextTick } from 'vue';
import { backendMainAppAddress } from '@/config';
import HeaderView from './HeaderView.vue';
import CommentView from './CommentView.vue';
import { username } from '@/utils/helpers';
import FooterView from './FooterView.vue';

export default {
    components: { HeaderView, CommentView, FooterView },
    props: {
        postId: {
            type: String,
            required: true,
        }, page: {
            type: Number,
            required: false,
            default: 0
        },
    },
    data() {
        return {
            username,
            contents: null,
            creator: "",
            l_d: null,
            isLoading: false,
            showDeletePostConfirm: false,
        }
    },
    async mounted() {
        this.fetchPost();
    },
    watch: {
        async username() {
            this.fetchPost();
        },
    },
    methods: {
        prepare_config() {
            const token = sessionStorage.getItem('loginJwt');
            return {
                headers: {
                    Authorization: token
                }
            };
        },
        async confirmDeletePostPrompt() {
            this.showDeletePostConfirm = true;
            nextTick(() => {
                this.$refs.modalContentPost.focus(); // Focus on the modal content
            });
        },
        cancelDeletePost() {
            setTimeout(() => {
                this.showDeletePostConfirm = false;
            }, 100);
        },
        async deletePost() {
            const config = this.prepare_config();
            try {
                const deletePostResponse = await axios.delete(`${backendMainAppAddress}/post/${this.postId}`, config);
                this.$router.back();
            } catch (error) {
                if (error.status === 401) {
                    this.$refs.headerView.toggleLoginDropdown();
                }
            }
        },
        async likePost() {
            const config = this.prepare_config()
            try {
                const fetchCommentsResponse = await axios.get(`${backendMainAppAddress}/post/${this.postId}/like`, config);
                const msg = fetchCommentsResponse.data.msg
                if (msg == "Liked") {
                    this.contents.likes += 1;
                    this.l_d = "Like";
                } else if (msg == "Liked2") {
                    this.contents.likes += 2;
                    this.l_d = "Like";
                } else if (msg == "Unliked") {
                    this.contents.likes -= 1;
                    this.l_d = null;
                }
            } catch (error) {
                if (error.status === 401) {
                    this.$refs.headerView.toggleLoginDropdown();
                }
            }

        },
        async dislikePost() {
            const config = this.prepare_config()
            try {
                const fetchCommentsResponse = await axios.get(`${backendMainAppAddress}/post/${this.postId}/dislike`, config);
                const msg = fetchCommentsResponse.data.msg
                if (msg == "Disliked") {
                    this.contents.likes -= 1;
                    this.l_d = "Dislike";
                } else if (msg == "Disliked2") {
                    this.contents.likes -= 2;
                    this.l_d = "Dislike";
                } else if (msg == "Undisliked") {
                    this.contents.likes += 1;
                    this.l_d = null;
                }
            } catch (error) {
                if (error.status === 401) {
                    this.$refs.headerView.toggleLoginDropdown();
                }
            }
        },
        async fetchPost() {
            const config = this.prepare_config()
            try {
                const response = await axios.get(`${backendMainAppAddress}/post/${this.postId}`, config);
                this.contents = response.data.contents;
                this.creator = response.data.created_by;
                this.l_d = response.data.user_like;
                document.title = `${this.contents.title}`
            } catch (error) {
                console.error('Failed to fetch forums:', error);
            }
        }
    }
}
</script>
<style scoped>
.like-button,
.dislike-button {
    font-size: 18px;
    margin: 0 10px;
    color: gray;
    text-decoration: none;
    transition: color 0.5s;
}

.like-button.active {
    color: rgb(255, 137, 137)
}

.dislike-button.active {
    color: rgb(137, 159, 255)
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
</style>
<style scoped src="@/assets/lists.css"></style>