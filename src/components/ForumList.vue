<template>
    <HeaderView/>
    <div>
        <h1>Forum List</h1>
        <div class="pagination">
            <span v-for="page in pageCount" :key="page">
                <a style="color: aliceblue" v-if="this.page===page-1">{{ page-1 }}</a>
                <a v-else href="#" @click="navigateToPage(page-1)">{{ page-1 }}</a>
            </span>
        </div>
        <ul>
            <li v-for="(forum, index) in forums" :key="forum.id" @click="navigateToForum(forum.id)"
                :class="{ 'odd-item': index % 2 !== 0, 'even-item': index % 2 === 0 }">
                <div class="row-item">
                    <div class="flex-3">
                        <h3>{{ forum.name }}</h3>
                        <p>{{ forum.description }}</p>
                    </div>
                    <div class="flex-1">
                        <p class="right-container">
                            Created: {{ new Date(forum.created_at).toLocaleString(undefined, {
                                year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
                            }) }}
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <br>
    <FooterView/>
</template>




<script>
import axios from 'axios';
import { backendMainAppAddress } from '@/config';
import HeaderView from './HeaderView.vue';
import FooterView from './FooterView.vue';
export default {
  components: { HeaderView,FooterView },
    props: {
        page: {
            type: Number,
            required: false,
            default: 0
        },
    },
    data() {
        return {
            forums: [],
            isLoading: false,
            pageCount: 0
        }
    },
    async mounted() {
        this.fetchForums();
        document.title = `Forums`;
    },
    watch:{
        page(){
            this.fetchForums()
        }
    },
    methods: {
        async fetchForums() {
            const page = parseInt(this.$route.query.page) || 0;
            try {
                const response = await axios.get(`${backendMainAppAddress}/forums?page=${this.page}`);
                this.forums = response.data.forums;
                this.pageCount = response.data.page_count;
            } catch (error) {
                console.error('Failed to fetch forums:', error);
            }
        },
        navigateToForum(id) {
            this.$router.push({ name: 'Forum', params: { "forumId": id } });
        },
        navigateToPage(page){
            this.$router.push({ name: 'ForumList', query: { page: page } });
        }
    }
}
</script>

<style scoped src="@/assets/lists.css"></style>