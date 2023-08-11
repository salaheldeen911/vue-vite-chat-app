import { createRouter, createWebHistory } from "vue-router";
import { AuthStore } from "../stores/AuthStore";
import { OnlineUsersStore } from "../stores/OnlineUsersStore";
import Home from "../views/Home.vue";
import Chat from "../views/Chat.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Todo from "../views/Todo.vue";
import chatTest from "../views/ChatTest.vue";

// import About from "@/views/About.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/test",
    name: "chatTest",
    component: chatTest,
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
  // {
  //   path: "/about",
  //   name: "About",
  //   component: About,
  // },
];

const middleware = (to, from, next) => {
  const auth = AuthStore();
  if (!auth.status) {
    if (to.name == "login" || to.name == "register") return next();

    return next("/login");
  } else {
    const OnlineUsers = OnlineUsersStore();

    window.Echo.join("public-chat")
      .here((users) => {
        //returnning all users but the current
        OnlineUsers.base(users);
        // console.log("here", users);
        // this.$emit("setUsers", users);
      })
      .joining((user) => {
        //adding the juiond user th users
        OnlineUsers.joined(user);

        // console.log("joining", user);
        // this.$emit("userJoined", user);
      })
      .leaving((user) => {
        // removing the left user from users
        OnlineUsers.left(user);

        // console.log("leaving", user);
        // this.$emit("leftUser", user);
      })
      .error((error) => {
        console.log(error);
      })
      .listen("MessageEvent", (message) => {
        console.log("message", message.message);
        // this.data.push(message.message);
      });

    if (to.name == "login" || to.name == "register") return next("/");
    // checkEcho();

    return next();
  }
};

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(middleware);

export default router;
