<template>
  <nav class="navbar navbar-expand-lg navbar-dark p-3 bg-danger" id="headerNav">
    <div class="container-fluid">
      <a class="navbar-brand d-block d-lg-none" href="#">
        <img src="/static_files/images/logos/logo_2_white.png" height="80" />
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
          <!-- <li v-if="auth.status" class="nav-item dropdown">
            <a
              class="nav-link mx-2 dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sent Requests
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <SentRequests />

              <li><a class="dropdown-item" href="#">Blog</a></li>
              <li><a class="dropdown-item" href="#">About Us</a></li>
              <li><a class="dropdown-item" href="#">Contact us</a></li>
            </ul>
          </li> -->

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
                <img
                  style="width: 100%; height: 100%"
                  src="../../public/s.png"
                />
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
          <li class="nav-item">
            <a
              v-if="auth.status"
              href=" javascript:void(0)"
              :class="{ disabled: clicked }"
              @click="showReceivedRequests"
              class="nav-link mx-2"
              >Received Requests</a
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

export default {
  name: "mainNav",
  setup() {
    const auth = AuthStore();
    return { auth };
  },
  components: { SentRequests, ReceivedRequests },

  mounted() {
    axios.defaults.headers.common["Authorization"] = this.auth.token(); // `Bearer ${this.auth.token()}`;
  },
  data() {
    return {
      clicked: false,
    };
  },
  methods: {
    async logout() {
      this.clicked = true;
      try {
        axios.post("logout");
        this.auth.$reset();
        console.log("logedout", "left");
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
    showReceivedRequests() {
      if (window.innerWidth < 992) {
        this.$refs.toggler.click();
      }

      this.$emit("showReceivedRequests");
    },
  },
};
</script>

<style>
.router-link-active {
  color: #fff !important;
}
</style>