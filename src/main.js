import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import Pusher from "pusher-js";
import axios from "./axios";
import * as bootstrap from "bootstrap";

const app = createApp(App);
const pinia = createPinia();

window.Pusher = Pusher;

pinia.use(piniaPersist);

app.use(router);
app.use(pinia);

app.mount("#app");
