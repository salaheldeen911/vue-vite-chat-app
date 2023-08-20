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
          <li v-if="auth.status" class="nav-item position-relative">
            <a
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
import { ReceivedRequestsStore } from "../stores/ReceivedRequestsStore";
import { SentRequestsStore } from "../stores/SentRequestsStore";

import echo from "../echo";

export default {
  setup() {
    const ReceivedRequestStore = ReceivedRequestsStore();
    const SentRequestStore = SentRequestsStore();

    const auth = AuthStore();
    return { auth, ReceivedRequestStore, SentRequestStore };
  },

  mounted() {
    if (this.auth.status) {
      if (!window.Echo) echo.initLaravelEcho();
      this.getUnreadedReceivedRequestsCount();
      // if (!window.Echo) echo.initLaravelEcho();

      // window.Echo.private(`friend-request-channel.${this.auth.user.id}`)
      //   .listen("FriendRquestEvent", (e) => {
      //     this.getUnreadedReceivedRequestsCount();
      //     this.$emit("updateReseivedRequests");
      //     console.log("event", e);
      //   })
      //   .error((error) => {
      //     console.log(error);
      //   });

      window.Echo.private(`friend-request-channel.${this.auth.user.id}`)
        .listen("FriendRquestEvent", (e) => {
          this.getUnreadedReceivedRequestsCount();
          console.log("friend request event {{ count }}", e);
        })
        .error((error) => {
          console.log(error);
        });
    }
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
      this.SentRequestStore.toggleStatus();
      this.$emit("sentRequestsFocus");
    },
    async showReceivedRequests() {
      // console.log("why");
      // this.$emit("receivedRequestsFocus");

      try {
        console.log(this.ReceivedRequestStore.status);
        if (!this.ReceivedRequestStore.status) {
          this.ReceivedRequestStore.toggleStatus();
          this.$emit("receivedRequestsFocus");
          await axios.put("readAllReceivedRequests");
          this.getUnreadedReceivedRequestsCount();
        }

        // this.ReceivedRequestStore.toggleStatus();
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
        this.unreadedReceivedRequestsCount = count.data.data.count;

        return true;
      } catch (errors) {
        console.log(errors);
        this.clicked = false;
      }
    },
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