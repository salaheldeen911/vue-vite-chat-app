<template>
  <nav class="navbar navbar-expand-lg navbar-dark p-3 bg-danger" id="headerNav">
    <div class="container-fluid">
      <a class="navbar-brand d-block d-lg-none" href="#">
        <img src="/vite.svg" />
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
            <router-link v-if="auth.status" class="nav-link mx-2" to="/game"
              >Game</router-link
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

<script setup>
import axios from "axios";
import { AuthStore } from "../stores/AuthStore";
import { ReceivedRequestsStore } from "../stores/ReceivedRequestsStore";
import { SentRequestsStore } from "../stores/SentRequestsStore";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

import echo from "../echo";
import { useRouter } from "vue-router";

const router = useRouter();
const ReceivedRequestStore = ReceivedRequestsStore();
const { unreadedReceivedRequestsCount } = storeToRefs(ReceivedRequestStore);
const SentRequestStore = SentRequestsStore();
const auth = AuthStore();

const clicked = ref(false);
const lastRequest = ref(0);
const delay = ref(400);
const toggler = ref(null);

const emit = defineEmits(["sentRequestsFocus", "receivedRequestsFocus"]);

onMounted(async () => {
  if (auth.status)
    ReceivedRequestStore.setUnreadedReceivedRequestsCount(auth.token());
});

async function logout() {
  clicked.value = true;
  try {
    await axios.post("left-user", auth.user);
    axios.post("logout");
    auth.$reset();
    window.Echo.leave("public-chat");
    router.push({ path: "/login", replace: true });
    clicked.value = false;

    return true;
  } catch (errors) {
    console.log(errors);
    clicked.value = false;
  }
}
async function readAllReceivedRequests() {
  // if (lastRequest.value >= Date.now() - delay.value) return;
  console.log("D:");
  await ReceivedRequestStore.readAllReceivedRequests();
  ReceivedRequestStore.setUnreadedReceivedRequestsCount();

  lastRequest.value = Date.now();
}
function showSentRequests() {
  if (!ReceivedRequestStore.status) {
    SentRequestStore.toggleStatus();
    emit("sentRequestsFocus");
  }

  if (window.innerWidth < 992) {
    toggler.value.click();
  }
}
async function showReceivedRequests() {
  try {
    if (!ReceivedRequestStore.status) {
      ReceivedRequestStore.toggleStatus();
      emit("receivedRequestsFocus");
      readAllReceivedRequests();
    }
  } catch (errors) {
    console.log(errors);
  }

  if (window.innerWidth < 992) {
    toggler.value.click();
  }
}
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