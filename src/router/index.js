import { createRouter, createWebHistory } from "vue-router";
import { AuthStore } from "../stores/AuthStore";
import echo from "../echo";
import Home from "../views/Home.vue";
import Chat from "../views/Chat.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Todo from "../views/Todo.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/todo",
    name: "todo",
    component: Todo,
  },
];

const middleware = (to, from, next) => {
  const auth = AuthStore();
  if (!auth.status) {
    if (to.name == "login" || to.name == "register") return next();

    return next("/login");
  } else {
    if (!window.Echo) echo.initLaravelEcho();

    if (to.name == "login" || to.name == "register") return next("/");

    return next();
  }
};

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(middleware);

export default router;
