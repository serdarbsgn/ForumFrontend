<template>
    <HeaderView/>
    <div>
        <h1>Items List</h1>
        <ul>
            <li
                v-for="(item, index) in cart"
                :key="item.id"
                @click="navigateToForum(item.id)"
                :class="{ 'odd-item': index % 2 !== 0, 'even-item': index % 2 === 0 }"
            >
                <div class="row-item">
                    <div class="flex-3">
                        <h3>{{ item.name }}</h3>
                    </div>
                    <div class="flex-1">
                        <p>
                            Qt: {{ item.quantity }}
                        </p>
                    </div>
                    <div class="flex-1">
                        <p class="right-container">
                            Price: {{ item.price }}
                        </p>
                    </div>
                </div>
            </li>
        </ul>
        <h3 class="right-container">Total {{ this.total }}</h3>
    </div>
</template>




<script>
import axios from 'axios';
import { backendMainAppAddress } from '@/config';
import HeaderView from './HeaderView.vue';
import { username } from '@/utils/helpers2';
export default {
    components: { HeaderView, },
    data() {
        return {
            username,
            cart: [],
            total:null,
            isLoading:false
        }
    },
    async mounted() {
        this.fetchCart();
        document.title = `${username}'s Cart`;
    },
    methods: {
        async fetchCart() {
            try {
                const token = sessionStorage.getItem('loginJwt');
                const config = { headers: { Authorization: `${token}` } };
                const response = await axios.get(`${backendMainAppAddress}/cart`,config);
                this.cart = response.data.cart_items;
                this.total = response.data.total;
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