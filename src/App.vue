<template>
  <div id="site-container">
    <header>
      <mainNav
        @sentRequestsFocus="sentRequestsFocus"
        @receivedRequestsFocus="receivedRequestsFocus"
        ref="mainNavComponent"
      />
    </header>
    <main>
      <SentRequests v-if="auth.status" ref="SentRequestsComponent" />
      <ReceivedRequests
        @updateUnreadedReceivedRequestsCount="
          updateUnreadedReceivedRequestsCount
        "
        v-if="auth.status"
        ref="ReceivedRequestsComponent"
      />
      <router-view />
    </main>
    <footer>
      <p class="text-center m-0">
        Copyright © All Rights Reserved by
        <a href="https://salaheldeen911.github.io/new-cv/" target="_blank"
          >salaheldeen911</a
        >
      </p>
    </footer>
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

function requestHasBeenAccepted() {
  SentRequestsComponent.value.getSentRequests();
}

function sentRequestsFocus() {
  SentRequestsComponent.value.$el.focus();
}

function receivedRequestsFocus() {
  ReceivedRequestsComponent.value.$el.focus();
}

function sentRequest() {
  SentRequestsComponent.value.getSentRequests();
}

function updateUnreadedReceivedRequestsCount() {
  mainNavComponent.value.getUnreadedReceivedRequestsCount();
}
</script>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap";
@import "./assets/sass/styles.scss";
</style>
