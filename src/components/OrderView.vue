<template>
    <HeaderView/>
    <div style="min-height: 85vh;">
        <h1>Items List</h1>
        <ul v-if="username" v-for="(cart,cart_id) in orders"
                :key="cart_id">
            <p>Order id: {{cart_id}}</p>
            <li v-for="(item,index) in cart"
                :key="cart.order_id"
                @click="navigateToForum(item.product_id)"
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
            <h3 class="right-container">Total {{ cart.total }}</h3>
        </ul>
        
    </div>
    <br>
    <FooterView/>
</template>




<script>
import axios from 'axios';
import { backendMainAppAddress } from '@/config';
import HeaderView from './HeaderView.vue';
import { username } from '@/utils/helpers';
import FooterView from './FooterView.vue';
export default {
  components: { HeaderView,FooterView },
    data() {
        return {
            username,
            orders: [],
            isLoading:false
        }
    },
    async mounted() {
        this.fetchOrders();
        this.setTitle();
    },
    watch: {
        async username() {
            this.setTitle();
        },
    },
    methods: {
        setTitle(){
            if(this.username){
                document.title = `${this.username}'s Cart`;
            }else{
                document.title = `Cart`;
            }
        },
        async fetchOrders() {
            try {
                const token = sessionStorage.getItem('loginJwt');
                const config = { headers: { Authorization: `${token}` } };
                const response = await axios.get(`${backendMainAppAddress}/orders`,config);
                this.orders = response.data.orders;
                for (const cartId in this.orders) {
                    const items = this.orders[cartId];
                    const total = items.reduce((sum, item) => {
                        return sum + item.quantity * parseFloat(item.price); 
                    }, 0);
                    this.orders[cartId].total = total;
                }

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