<template>
    <HeaderView ref="headerView"/>
    <div style="min-height: 76vh;">
        <template v-if="forumInfo">
            <h1>{{ forumInfo.name }}</h1>
            <h2>{{ forumInfo.description }}</h2>
            <p class="right-container">{{ new Date(forumInfo.created_at).toLocaleString(undefined, {
                year: 'numeric', month: '2-digit', day:
                    '2-digit', hour: '2-digit', minute: '2-digit'
            }) }}</p>
        </template>
        <a href="#" @click.prevent="toggleCreatePost">Create Post</a>
        <div>
            <p v-if="errorMessage">{{ errorMessage }}</p>
            <div v-show="createPostField">
                <textarea ref="postTitle" id="post-title" placeholder="Post Title" @input="adjustTextareaHeight($event)"
                    rows="1" class="dark-textarea"></textarea>
                <textarea ref="postContent" id="post-content" placeholder="Post Content"
                    @input="adjustTextareaHeight($event)" rows="2" class="dark-textarea"></textarea>
                <div class="button-container">
                    <button @click.prevent="createPost(comment)" class="dark-button">Create</button>
                </div>
            </div>
        </div>
        <div class="pagination">
            <span v-for="page in pageCount" :key="page">
                <a style="color: aliceblue" v-if="this.page === page - 1">{{ page - 1 }}</a>
                <a v-else href="#" @click="navigateToPage(page - 1)">{{ page - 1 }}</a>
            </span>
        </div>
        <ul>
            <li v-for="(post, index) in posts" :key="post.id" @click="navigateToPost(post.id)"
                :class="{ 'odd-item': index % 2 !== 0, 'even-item': index % 2 === 0 }">
                <div class="row-item">
                    <div class="flex-3">
                        <h1>{{ post.title }}</h1>
                    </div>
                    <div class="flex-1">
                        <p class="right-container">Created:{{ new Date(post.created_at).toLocaleString(undefined, {
                            year: 'numeric', month: '2-digit', day:
                                '2-digit', hour: '2-digit', minute: '2-digit'
                        }) }}</p>
                        <p class="right-container">Updated: {{ new Date(post.updated_at).toLocaleString(undefined, {
                            year: 'numeric', month: '2-digit', day:
                                '2-digit', hour: '2-digit', minute: '2-digit'
                        }) }}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <br>
    <FooterView />
</template>


<script>
import axios from 'axios';
import { backendMainAppAddress } from '@/config';
import HeaderView from './HeaderView.vue';
import FooterView from './FooterView.vue';
import { nextTick } from 'vue';
export default {
    components: { HeaderView, FooterView },
    props: {
        forumId: {
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
            posts: [],
            forumInfo: null,
            isLoading: false,
            pageCount: 0,
            createPostField: false,
            errorMessage:''
        }
    },
    async mounted() {
        this.fetchPosts();
        this.updateTitle();

    },
    watch: {
        async forumInfo() {
            this.updateTitle();
        },
        page() {
            this.fetchPosts()
        }
    },
    methods: {
        updateTitle() {
            if (this.forumInfo) {
                document.title = this.forumInfo.name;
            } else {
                document.title = "Forum"
            }
        },
        toggleCreatePost() {
            this.createPostField = !this.createPostField;
            if (this.createPostField) {
                nextTick(() => {
                    this.$refs.postTitle.focus();
                });
            }
        },
        async createPost() {
            const token = sessionStorage.getItem('loginJwt');
            if(!token){
                this.$refs.headerView.toggleLoginDropdown();
                return;
            }
            const postTitle = this.$refs.postTitle;
            const postContent = this.$refs.postContent;
            const data = {
                forum_id: Number(this.forumId),
                title: postTitle.value,
                content: postContent.value,
            };
            const config = {
                headers: {
                    Authorization: token,
                }
            };
            try {
                await axios.post(`${backendMainAppAddress}/post`, data, config);
                postTitle.value = '';
                postContent.value = '';
                postTitle.style.height = 'auto';
                postContent.style.height = 'auto';
                if(this.page === this.pageCount-1){
                    this.fetchPosts()
                }else{
                    this.$router.push({ name: 'Forum', params: { "forumId": this.forumId }, query: { page: this.pageCount - 1 } });
                }
            } catch (error) {
                if (error.status === 401) {
                    this.$refs.headerView.toggleLoginDropdown();
                }
                else {
                    if ("string_too_short" === error.response.data.detail[0].type) {
                        this.errorMessage = "Post title and content should at least have 4 characters";
                    } else {
                        this.errorMessage = error.response.data.detail[0].msg
                    }
                }
            }

        },        adjustTextareaHeight(event) {
            const textarea = event.target;
            textarea.style.height = 'auto'; // Reset height to calculate the new size
            textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scroll height
        },
        async fetchPosts() {
            try {
                const response = await axios.get(`${backendMainAppAddress}/forum/${this.forumId}?page=${this.page}`);
                this.posts = response.data.posts;
                this.forumInfo = response.data.contents;
                this.pageCount = response.data.postcount;
                document.title = `${this.forumInfo.name} Forum`;
            } catch (error) {
                console.error('Failed to fetch forum:', error);
            }
        },
        navigateToPost(id) {
            this.$router.push({ name: 'Post', params: { "postId": id } });
        },
        navigateToPage(page) {
            this.$router.push({ name: 'Forum', params: { "forumId": this.forumId }, query: { page: page } });
        }
    }
}
</script>

<style scoped src="@/assets/lists.css"></style>