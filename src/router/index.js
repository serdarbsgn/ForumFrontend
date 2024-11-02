import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/HomeView.vue';
import LoginView from '@/components/LoginView.vue';
import UploadProfilePictureView from '@/components/UploadProfilePictureView.vue';
import RegisterView from '@/components/RegisterView.vue';
import ForumList from '@/components/ForumList.vue';
import ForumView from '@/components/ForumView.vue';
import PostView from '@/components/PostView.vue';
import MarketView from '@/components/MarketView.vue';
import CartView from '@/components/CartView.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/post/:postId',
    name: 'Post',
    component: PostView,
    props: true,
  },
  {
    path: '/forum',
    name: 'ForumList',
    component: ForumList,
  },
  {
    path: '/forum/:forumId',
    name: 'Forum',
    component: ForumView,
    props: true,
  },
  {
    path: '/upload-profile-picture',
    name: 'UploadProfilePicture',
    component: UploadProfilePictureView,
  },
  {
    path: '/market',
    name: 'MarketView',
    component: MarketView,
  },
  {
    path: '/cart',
    name: 'CartView',
    component: CartView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
