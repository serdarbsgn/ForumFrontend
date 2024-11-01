<template>
    <HeaderView :parentView="$route.name" @logout="logout" />
    <div>
        <template v-if="forumInfo">
            <h1>{{ forumInfo.name }}</h1>
            <h2>{{ forumInfo.description }}</h2>
            <p class="right-container">{{ new Date(forumInfo.created_at).toLocaleString(undefined, {
                year: 'numeric', month: '2-digit', day:
                    '2-digit', hour: '2-digit', minute: '2-digit'
            }) }}</p>
        </template>
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
</template>


<script>
import axios from 'axios';
import { logout } from '@/utils/helpers';
import { backendMainAppAddress } from '@/config';
import HeaderView from './HeaderView.vue';
export default {
    components: { HeaderView, },
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
            isLoading: false
        }
    },
    async mounted() {
        this.fetchPosts();
    },
    methods: {
        logout,
        async fetchPosts() {
            try {
                const response = await axios.get(`${backendMainAppAddress}/forum/${this.forumId}`);
                this.posts = response.data.posts;
                this.forumInfo = response.data.contents
                document.title = `${this.forumInfo.name} Forum`;
            } catch (error) {
                console.error('Failed to fetch forum:', error);
            }
        },
        navigateToPost(id) {
            this.$router.push({ name: 'Post', params: { "postId": id } });
        }
    }
}
</script>

<style scoped src="@/assets/lists.css"></style>