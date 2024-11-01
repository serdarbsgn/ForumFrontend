<template>
    <HeaderView :parentView="$route.name" @logout="logout" />
    <div>
        <h1>Forum List</h1>
        <ul>
            <li
                v-for="(forum, index) in forums"
                :key="forum.id"
                @click="navigateToForum(forum.id)"
                :class="{ 'odd-item': index % 2 !== 0, 'even-item': index % 2 === 0 }"
            >
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
</template>




<script>
import axios from 'axios';
import { logout } from '@/utils/helpers';
import { backendMainAppAddress } from '@/config';
import HeaderView from './HeaderView.vue';
export default {
    components: { HeaderView, },
    data() {
        return {
            forums: [],
            isLoading:false
        }
    },
    async mounted() {
        this.fetchForums();
        document.title = `Forums`;
    },
    methods: {
        logout,
        async fetchForums() {
            try {
                const response = await axios.get(`${backendMainAppAddress}/forums`);
                this.forums = response.data.forums;
            } catch (error) {
                console.error('Failed to fetch forums:', error);
            }
        },
        navigateToForum(id) {
            this.$router.push({ name: 'Forum', params: { "forumId": id } });
        }        
    }
}
</script>

<style scoped src="@/assets/lists.css"></style>