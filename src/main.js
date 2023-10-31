import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'

import Game from './routes/Game.vue';
import GameSelect from './routes/GameSelect.vue';
import Room from './routes/Room.vue';
import User from './routes/User.vue';
import App from './App.vue';

import './style.css';


const routes = [
  // { path: '/', component: App },
  { path: '/', component: User },
  { path: '/game', component: Game },
  { path: '/game-select', component: GameSelect },
  { path: '/:id', component: Room },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router } // so we can use it outside components

const app = createApp(App)
app.use(router)

app.mount('#app')