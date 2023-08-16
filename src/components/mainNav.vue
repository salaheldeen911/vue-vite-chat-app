<template>
  <nav class="navbar navbar-expand-lg navbar-dark p-3 bg-danger" id="headerNav">
    <div class="container-fluid">
      <a class="navbar-brand d-block d-lg-none" href="#">
        <img src="/vite.svg" height="80" />
      </a>
      <button
        ref="toggler"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mx-auto" style="align-items: center">
          <li class="nav-item">
            <a
              v-if="auth.status"
              href=" javascript:void(0)"
              :class="{ disabled: clicked }"
              @click="showSentRequests"
              class="nav-link mx-2"
              >Sent Requests</a
            >
          </li>
          <li class="nav-item">
            <router-link
              v-if="!auth.status"
              class="nav-link mx-2"
              :to="{ name: 'login' }"
              >Login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link v-if="auth.status" class="nav-link mx-2" to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link v-if="auth.status" class="nav-link mx-2" to="/todo"
              >Todos</router-link
            >
          </li>
          <li class="nav-item d-none d-lg-block">
            <router-link v-if="auth.status" class="nav-link mx-2" to="/">
              <div style="width: 100px; height: 40px">
                <img style="width: 100%; height: 100%" src="/vite.svg" />
              </div>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              v-if="!auth.status"
              class="nav-link mx-2"
              :to="{ name: 'register' }"
              >Register</router-link
            >
          </li>
          <li class="nav-item">
            <router-link v-if="auth.status" class="nav-link mx-2" to="/chat"
              >Chat</router-link
            >
          </li>
          <li class="nav-item position-relative">
            <a
              v-if="auth.status"
              href=" javascript:void(0)"
              :class="{ disabled: clicked }"
              @click="showReceivedRequests"
              class="nav-link mx-2"
              >Received Requests</a
            >
            <span
              v-if="unreadedReceivedRequestsCount > 0"
              class="unreadedReceivedRequestsCount"
              >{{ unreadedReceivedRequestsCount }}</span
            >
          </li>
          <li class="nav-item">
            <a
              v-if="auth.status"
              href=" javascript:void(0)"
              :class="{ disabled: clicked }"
              @click="logout"
              class="nav-link mx-2"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { AuthStore } from "../stores/AuthStore";
import SentRequests from "./requests/SentRequests.vue";
import ReceivedRequests from "./requests/ReceivedRequests.vue";
// import Echo from "laravel-echo";
import echo from "../echo";

export default {
  name: "mainNav",
  setup() {
    const auth = AuthStore();
    return { auth };
  },
  components: { SentRequests, ReceivedRequests },

  mounted() {
    console.log("mounted");

    this.getUnreadedReceivedRequestsCount();
    if (this.auth.status) {
      if (!window.Echo) echo.initLaravelEcho();
    }
    console.log("this.auth.user.id", this.auth.user.id);

    window.Echo.private(`friend-request-channel.${this.auth.user.id}`)
      .listen("FriendRquestEvent", (e) => {
        this.getUnreadedReceivedRequestsCount();
        this.$emit("updateReseivedRequests");
        console.log("event", e);
      })
      .error((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      clicked: false,
      unreadedReceivedRequestsCount: 0,
    };
  },
  methods: {
    async logout() {
      this.clicked = true;
      try {
        axios.post("logout");
        this.auth.$reset();
        window.Echo.leave("public-chat");
        this.$router.push({ path: "/login", replace: true });
        this.clicked = false;

        return true;
      } catch (errors) {
        console.log(errors);
        this.clicked = false;
      }
    },
    showSentRequests() {
      if (window.innerWidth < 992) {
        this.$refs.toggler.click();
      }
      this.$emit("showSentRequests");
    },
    async showReceivedRequests() {
      try {
        this.$emit("showReceivedRequests");

        await axios.put("readAllReceivedRequests");
        this.getUnreadedReceivedRequestsCount();
      } catch (errors) {
        console.log(errors);
      }

      if (window.innerWidth < 992) {
        this.$refs.toggler.click();
      }
    },
    async getUnreadedReceivedRequestsCount() {
      try {
        let count = await axios.get("unreadedReceivedRequestsCount", {
          headers: {
            Authorization: this.auth.token(),
          },
        });
        console.log(count);
        this.unreadedReceivedRequestsCount = count.data.data.count;
        console.log(this.unreadedReceivedRequestsCount);

        return true;
      } catch (errors) {
        console.log(errors);
        this.clicked = false;
      }
    },
    // initEcho() {
    //   window.Echo = new Echo({
    //     broadcaster: "pusher",
    //     key: "pusher_key",
    //     wsHost: window.location.hostname,
    //     wsPort: 6001,
    //     forceTLS: false,
    //     disableStats: true,
    //     authEndpoint: "http://localhost:8000/api/broadcasting/auth",
    //     auth: {
    //       headers: {
    //         Authorization: this.auth.token(),
    //       },
    //     },
    //   });
    // },
  },
};
</script>

<style scoped>
.router-link-active {
  color: #fff !important;
}

.unreadedReceivedRequestsCount {
  position: absolute;
  top: -2px;
  left: -6px;
  font-size: 12px;
  font-weight: 700;
  padding: 2px;
  background: aliceblue;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>