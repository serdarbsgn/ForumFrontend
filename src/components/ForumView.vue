<template>
    <HeaderView />
    <div style="min-height: 76vh;">
        <template v-if="forumInfo">
            <h1>{{ forumInfo.name }}</h1>
            <h2>{{ forumInfo.description }}</h2>
            <p class="right-container">{{ new Date(forumInfo.created_at).toLocaleString(undefined, {
                year: 'numeric', month: '2-digit', day:
                    '2-digit', hour: '2-digit', minute: '2-digit'
            }) }}</p>
        </template>
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
            pageCount: 0
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