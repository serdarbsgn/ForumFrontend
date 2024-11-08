<template>
    <HeaderView />
    <div style="min-height: 85vh;">
        <h1>Cart</h1>
        <p v-if="errorMessage">{{ errorMessage }}</p>
        <ul v-if="username" style="min-height: 85vh;">
            <li v-for="(item, index) in cart" :key="item.id"
                :class="{ 'odd-item': index % 2 !== 0, 'even-item': index % 2 === 0 }">
                <div class="row-item">
                    <div class="flex-3" @click="navigateToForum(item.product_id)">
                        <h3>{{ item.name }}</h3>
                    </div>
                    <div class="flex-1">
                        <p>
                            Qt:
                            <input type="number" v-model.number="item.quantity"
                                @input="updateCart(item.product_id, item.quantity)" min="1" max="99" @click.stop="" />
                        </p>
                    </div>
                    <div class="flex-1">
                        <p class="right-container">
                            Price: {{ item.price }}&nbsp;
                        </p>
                    </div>
                    <button class="dark-button" @click.stop="removeFromCart(item.product_id)">Remove</button>
                </div>
            </li>
            <div v-if="cart.length > 0" class="row-item">
                <a href="#" @click.prevent="confirmBuy">Place Order</a>
                <h3 class="right-container">Total {{ this.total }}</h3>
            </div>
        </ul>
    </div>
    <FooterView />
</template>




<script>
import axios from 'axios';
import { backendMainAppAddress } from '@/config';
import HeaderView from './HeaderView.vue';
import { username } from '@/utils/helpers';
import FooterView from './FooterView.vue';
export default {
    components: { HeaderView, FooterView },
    data() {
        return {
            username,
            cart: [],
            total: null,
            isLoading: false,
            errorMessage: null
        }
    },
    async mounted() {
        this.fetchCart();
        this.setTitle();
    },
    watch: {
        async username() {
            this.setTitle();
            if (this.username) {
                this.fetchCart();
            }
        },
    },
    methods: {
        setTitle() {
            if (this.username) {
                document.title = `${this.username}'s Cart`;
            } else {
                document.title = `Cart`;
            }
        },
        async fetchCart() {
            try {
                const token = sessionStorage.getItem('loginJwt');
                const config = { headers: { Authorization: `${token}` } };
                const response = await axios.get(`${backendMainAppAddress}/cart`, config);
                this.cart = response.data.cart_items;
                this.total = response.data.total;
                this.errorMessage = "";
            } catch (error) {
                this.errorMessage = `Failed to get cart items, status code: ${error.status}`;
            }
        },
        async removeFromCart(product_id) {
            try {
                const token = sessionStorage.getItem('loginJwt');
                const config = { headers: { Authorization: `${token}` } };
                const response = await axios.delete(`${backendMainAppAddress}/cart/${product_id}`, config);
                this.fetchCart();
                this.errorMessage = "";
            } catch (error) {
                this.errorMessage = `Failed to remove item from cart, status code: ${error.status}`;
            }
        },
        async updateCart(product_id, quantity) {
            try {
                const token = sessionStorage.getItem('loginJwt');
                const config = { headers: { Authorization: `${token}` } };
                const response = await axios.put(`${backendMainAppAddress}/cart/${product_id}?quantity=${quantity}`, {}, config);
                this.errorMessage = "";
            } catch (error) {
                if (error.status === 422) {
                    if (error.response.data.detail[0].msg) {
                        this.errorMessage = error.response.data.detail[0].msg;
                    } else {
                        this.errorMessage = error.response.data.detail;
                    }
                } else {
                    this.errorMessage = `Failed to update item quantity, status code: ${error.status}`;
                }
            }
        },
        navigateToForum(id) {
            this.$router.push({ name: 'Forum', params: { "forumId": id } });
        },
        async confirmBuy() {
            try {
                const token = sessionStorage.getItem('loginJwt');
                const config = { headers: { Authorization: `${token}` } };
                const response = await axios.get(`${backendMainAppAddress}/checkout`, config);
                this.$router.push({ name: 'OrderView' });
            } catch (error) {
                this.errorMessage = `Failed to confirm order, status code: ${error.status}`;
            }
        }
    }
}
</script>

<style scoped src="@/assets/lists.css"></style>