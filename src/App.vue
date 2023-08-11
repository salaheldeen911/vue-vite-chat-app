<template>
  <div id="site-container">
    <header>
      <mainNav
        @showSentRequests="showSentRequests"
        @showReceivedRequests="showReceivedRequests"
      />
    </header>
    <main>
      <SentRequests v-if="auth.status" ref="SentRequestsComponent" />
      <ReceivedRequests v-if="auth.status" ref="ReceivedRequestsComponent" />
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
import { ref, onMounted } from "vue";

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
  // onMounted(() => {
  // window.Echo.join("public-chat")
  //   .here((users) => {
  //     //returnning all users but the current
  //     console.log("here", users);
  //     // this.$emit("setUsers", users);
  //   })
  //   .joining((user) => {
  //     //adding the juiond user th users
  //     console.log("joining", user);
  //     // this.$emit("userJoined", user);
  //   })
  //   .leaving((user) => {
  //     // removing the left user from users
  //     console.log("leaving", user);
  //     // this.$emit("leftUser", user);
  //   })
  //   .error((error) => {
  //     console.log(error);
  //   })
  //   .listen("MessageEvent", (message) => {
  //     console.log("message", message.message);
  //     this.data.push(message.message);
  //   });

  window.Echo.private(`friend-request-channel.${auth.user.id}`).listen(
    "FriendRquestEvent",
    (e) => {
      console.log("Friend Rquest Has Been Sent");
      // console.log(e);
    }
  );
  // });
}

function showSentRequests() {
  SentRequestsComponent.value.toggle();
}

function showReceivedRequests() {
  ReceivedRequestsComponent.value.toggle();
}
</script>



<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap";
@import "./assets/sass/styles.scss";
</style>
