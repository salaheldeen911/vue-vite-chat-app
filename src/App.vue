<template>
  <div id="site-container">
    <header>
      <mainNav
        @showSentRequests="showSentRequests"
        @showReceivedRequests="showReceivedRequests"
      />
    </header>
    <main>
      <SentRequests ref="SentRequestsComponent" />
      <ReceivedRequests ref="ReceivedRequestsComponent" />
      <router-view />
    </main>
    <footer></footer>
  </div>
</template>
<script setup>
import "./assets/icons/css/materialdesignicons.min.css";
import mainNav from "./components/mainNav.vue";
import SentRequests from "./components/requests/SentRequests.vue";
import ReceivedRequests from "./components/requests/ReceivedRequests.vue";
import { ref } from "vue";

import { AuthStore } from "./stores/AuthStore";
import Echo from "laravel-echo";

const auth = AuthStore();
const SentRequestsComponent = ref(null);
const ReceivedRequestsComponent = ref(null);

if (auth.status) {
  if (!window.Echo) {
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "pusher_key",
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
      authEndpoint: "http://localhost:8000/api/broadcasting/auth",
      auth: {
        headers: {
          Authorization: auth.token(),
        },
      },
    });
  }
}

function showSentRequests() {
  SentRequestsComponent.value.toggle();

  console.log("D:d");
}

function showReceivedRequests() {
  ReceivedRequestsComponent.value.toggle();

  console.log("D:d");
}

// window.Echo.join("public-chat")
//   .here((users) => {
//     //returnning all users but the current
//     this.$emit("setUsers", users);
//   })
//   .joining((user) => {
//     //adding the juiond user th users
//     this.$emit("userJoined", user);
//   })
//   .leaving((user) => {
//     // removing the left user from users
//     this.$emit("leftUser", user);
//   })
//   .error((error) => {
//     console.log(error);
//   })
//   .listen("MessageEvent", (message) => {
//     this.data.push(message.message);
//   });
</script>



<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap";
@import "./assets/sass/styles.scss";
</style>
