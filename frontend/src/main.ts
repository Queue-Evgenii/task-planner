import "material-icons/iconfont/material-icons.css";
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { useApiProvider } from './api/ApiProvider';

const app = createApp(App);

app.use(createPinia());
app.use(router);

useApiProvider();

app.mount('#app');
