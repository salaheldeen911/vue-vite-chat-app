<template>
  <div id="site-container">
    <header>
      <mainNav ref="mainNavComponent" />
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
const mainNavComponent = ref(null);

const keyIndex = ref(0);

function requestHasBeenAccepted() {
  SentRequestsComponent.value.getSentRequests();
}

function sentRequest() {
  SentRequestsComponent.value.getSentRequests();
}

// function showSentRequests() {
//   SentRequestsComponent.value.toggle();
// }

// function showReceivedRequests() {
//   ReceivedRequestsComponent.value.toggle();
// }

// function updateReceivedRequests() {
//   ReceivedRequestsComponent.value.getReceivedRequests();
//   mainNavComponent.value.getUnreadedReceivedRequestsCount();
// }
</script>



<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap";
@import "./assets/sass/styles.scss";
</style>
