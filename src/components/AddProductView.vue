<template>
    <div>
        <h1>Add New Product</h1>
        <form @submit.prevent="uploadProduct">
            <div>
                <label for="name">Product Name:</label>
                <input type="text" class="dark-textarea" v-model="productName" required />
            </div>
            <div>
                <label for="description">Description:</label>
                <textarea class="dark-textarea" v-model="productDescription" required></textarea>
            </div>
            <div>
                <label for="price">Price:</label>
                <input type="number" class="dark-textarea" step="0.01" v-model="productPrice" required />
            </div>
            <br>
            <label for="file">Select an Image:</label>
            <div>
                <input type="file" @change="handleFileUpload" accept=".jpg" required ref="fileInput"
                    style="display: none;" />
            </div>
            <div class="buttons-container">
                <button type="button" class="dark-button" @click="triggerFileInput">
                    Select File
                </button>
                <button type="submit" class="dark-button">Upload</button>
                <h2 v-if="file">{{ file.name }}</h2>
            </div>
        </form>
        <h1 v-if="errorMessage" class="error">{{ errorMessage }}</h1>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </div>
</template>

<script>
import axios from 'axios';
import { backendMainAppAddress } from '@/config';

export default {
    data() {
        return {
            productName: '',
            productDescription: '',
            productPrice:'',
            file: null,
            errorMessage: '',
            successMessage: ''
        };
    },
    methods: {
        async handleFileUpload(event) {
            const selectedFile = event.target.files[0];
            this.file = selectedFile;
        }, triggerFileInput() {
            this.$refs.fileInput.click();
        },
        async uploadProduct() {
            this.errorMessage = '';
            this.successMessage = '';

            const formData = new FormData();
            formData.append('file', this.file);
            formData.append('name', this.productName);
            formData.append('description', this.productDescription);
            formData.append('price', this.productPrice);

            try {
                const token = sessionStorage.getItem('loginJwt');
                const config = {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                };

                const response = await axios.post(`${backendMainAppAddress}/add-product`, formData, config);
                this.successMessage = response.data.msg;
                this.$router.push({ name: 'MarketView' })
            } catch (error) {
                if (error.response && error.response.data) {
                    this.errorMessage = error.response.data.detail || 'An error occurred while creating the product';
                } else {
                    this.errorMessage = 'An unexpected error occurred.';
                }
            }
        },
    },
};
</script>

<style scoped>
.error {
    color: red;
}

.success {
    color: green;
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
    font-size: 17px;
    background-color: #0c4511;
    color: #bdbdbd;
    border: 1px solid #555;
    margin: 10px 15px 0px 0px;
}

.buttons-container {
    display: flex;
    flex-direction: row;
}
</style>