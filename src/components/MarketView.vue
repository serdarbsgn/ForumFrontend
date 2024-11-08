<template>
  <HeaderView ref="headerView"/>
  <div class="centered-content">
    <h1>Product List</h1>
    <ul class="market-list">
      <li v-for="product in products" :key="product.id"  class="market-item">
        <img :src="getThumbnailUrl(product.image)" @click="navigateToForum(product.id)" :alt="`Thumbnail for ${product.name}`" class="thumbnail" />
        <div class="market-item-info">
          <h3>{{ product.name }}</h3>
          <h4>{{ product.description }}</h4>
          <p>at: {{ product.price }}</p>
          <button :class="['dark-button', { active: this.triggerButtonAnim === product.id }]" @click.stop="addToCart(product.id)">Add</button>
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
  data() {
    return {
      products: [],
      triggerButtonAnim:null,
    };
  },
  async mounted() {
    await this.fetchProducts();
    document.title = `Market (Not Real)`;
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(`${backendMainAppAddress}/market`);
        this.products = response.data.products;
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    },
    navigateToForum(id) {
      this.$router.push({ name: 'Forum', params: { "forumId": id } });
    },
    getThumbnailUrl(id) {
      return `${backendMainAppAddress}/product-picture/${id}`
    },
    async addToCart(id){
      try {
        const token = sessionStorage.getItem('loginJwt');
        const config = { headers: { Authorization: `${token}` } };
        const response = await axios.post(`${backendMainAppAddress}/cart/${id}`,{},config);
        this.triggerButtonAnim = id;
          setTimeout(() => {
            this.triggerButtonAnim = null;
          }, 500);
      } catch (error) {
        if(error.status===401){
          this.$refs.headerView.toggleLoginDropdown();
        }
      }
    }
  }

}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 5px;
}

li:hover {
  background-color: #79797980;
}

.market-list {
  display: flex;
  flex-wrap: wrap;
}

.market-item {
  width: calc(33%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}

.thumbnail {
  max-width: 100%;
  margin-top: auto;
}

.market-item-info {
  margin-top: auto;
  /* this pushes it to the bottom of the project-item container */
}

.centered-content {
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-height: 80vh;
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
    transition: transform 0.3s ease, background-color 0.3s ease;
    font-size: 17px;
    background-color: #0c4511;
    color: #bdbdbd;
    border: 1px solid #555;
    border-radius: 10px;
}
.dark-button.active {
  transform: rotateY(180deg);
  background-color: #35ba35;
}
</style>