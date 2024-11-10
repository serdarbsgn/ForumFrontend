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
import OrderView from '@/components/OrderView.vue';
import GameList from '@/components/GameList.vue';
import CanvasHomeView from '@/components/CanvasHomeView.vue';
import UserView from '@/components/UserView.vue';
import GyroWheelView from '@/components/GyroWheelView.vue';
import GyroWheelPrivacyView from '@/components/GyroWheelPrivacyView.vue';
import MinesweeperGameView from '@/components/MinesweeperGameView.vue';
import SnakeGameView from '@/components/SnakeGameView.vue';
import PhysicsGameView from '@/components/PhysicsGameView.vue';
import LogoutView from '@/components/LogoutView.vue';
import PrivacyPolicyView from '@/components/PrivacyPolicyView.vue';
import CallbackView from '@/components/CallbackView.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    alias: '/home'
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
    props: true
  },
  {
    path: '/forum',
    name: 'ForumList',
    component: ForumList,
    props: route => ({ page: parseInt(route.query.page) || 0 }),
    alias: '/forums'
  },
  {
    path: '/forum/:forumId',
    name: 'Forum',
    component: ForumView,
    props: route => ({
      forumId: route.params.forumId,
      page: parseInt(route.query.page) || 0
    })
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
  },
  {
    path: '/orders',
    name: 'OrderView',
    component: OrderView,
  },
  {
    path: '/games',
    name: 'GameList',
    component: GameList,
  },
  {
    path: '/games/snake',
    name: 'Snake',
    component: SnakeGameView,
  },
  {
    path: '/games/minesweeper',
    name: 'Minesweeper',
    component: MinesweeperGameView,
  },
  {
    path: '/games/physics',
    name: 'Physics',
    component: PhysicsGameView,
  },
  {
    path: '/canvas_home',
    name: 'CanvasHome',
    component: CanvasHomeView,
  },
  {
    path: '/user',
    name: 'User',
    component: UserView,
  },
  {
    path: '/gyrowheel',
    name: 'Gyrowheel',
    component: GyroWheelView,
  },
  {
    path: '/privacy-policy-for-gyrowheel-app',
    name: 'GyrowheelPrivacy',
    component: GyroWheelPrivacyView,
  },
  {
    path:'/logout',
    name:'LogOut',
    component:LogoutView
  },
  {
    path:'/privacy-policy',
    name:'PrivacyPolicy',
    component:PrivacyPolicyView
  },
  {
    path:'/callback',
    name:'GoogleCallback',
    component:CallbackView
  }

];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
