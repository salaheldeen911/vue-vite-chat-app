<template>
  <div
    @focusout="handleFocusOut"
    tabindex="0"
    :class="{ show: status }"
    class="requests"
  >
    <h5 class="text-center">Received Requests</h5>
    <hr />

    <div v-if="receivedRequests.length > 0">
      <div
        v-for="request in receivedRequests"
        :key="request.id"
        class="alert alert-primary"
        role="alert"
      >
        <p>
          {{ request.name }} has sent you a friend request and his phone number
          is <strong> 01273542801</strong>. You can
          <strong
            role="button"
            :disabled="proccessing"
            @click="accept(request)"
            class="alert-link"
            >Accept It</strong
          >
          or you can
          <strong
            role="button"
            :disabled="proccessing"
            @click="ignore(request)"
            class="alert-link"
            >Ignore It</strong
          >.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AuthStore } from "../../stores/AuthStore";
import { ReceivedRequestsStore } from "../../stores/ReceivedRequestsStore";
import { GeneralStore } from "../../stores/GeneralStore";
import { storeToRefs } from "pinia";
import echo from "../../echo";
import axios from "axios";
import { onMounted, ref } from "vue";

const ReceivedRequestStore = ReceivedRequestsStore();
const General = GeneralStore();

const { receivedRequests, status } = storeToRefs(ReceivedRequestStore);
const auth = AuthStore();
const proccessing = ref(false);

async function accept(user) {
  proccessing.value = true;
  ReceivedRequestStore.status = false;

  await ReceivedRequestStore.acceptRequest(user);
  General.refreshStores();

  proccessing.value = false;
}

async function ignore(user) {
  proccessing.value = true;
  await ReceivedRequestStore.ignoreRequest(user);
  proccessing.value = false;
}

function handleFocusOut() {
  if (ReceivedRequestStore.status) ReceivedRequestStore.status = false;
}

function listenToFriendRequestChannel() {
  window.Echo.private(`friend-request-channel.${auth.user.id}`)
    .listen("FriendRquestEvent", (e) => {
      ReceivedRequestStore.setUnreadedReceivedRequestsCount();
      ReceivedRequestStore.setReceivedRequests();
    })
    .error((error) => {
      console.log(error);
    });
}

function listenToCancelFriendRequestChannel() {
  window.Echo.private(`cancel-friend-request-channel.${auth.user.id}`)
    .listen("CancelFriendRquestEvent", (e) => {
      ReceivedRequestStore.setReceivedRequests();
    })
    .error((error) => {
      console.log(error);
    });
}

onMounted(async () => {
  axios.defaults.headers.common["Authorization"] = auth.token(); // `Bearer ${this.auth.token()}`;
  if (!window.Echo) echo.initLaravelEcho();

  // window.Echo.private(`chat.4`)
  //   .whisper("typing", {
  //     name: auth.user.name,
  //   })
  //   .listenForWhisper("typing", (e) => {
  //     console.log(e.name);
  //   })
  //   .error((error) => {
  //     console.log(error);
  //   });
  listenToCancelFriendRequestChannel();

  listenToFriendRequestChannel();
});
</script>

<style scoped>
.requests {
  height: calc(100vh - 115px);
  background: #eee;
  width: 35%;
  z-index: 100;
  position: fixed;
  right: 0;
  opacity: 0.9;
  border-radius: 5px;
  padding: 10px;
  transition: all 1s linear;
  transform: translateX(110%);
  overflow: auto;
}

.show {
  transform: translateX(0);
}
@media screen and (max-width: 400px) {
  .requests {
    width: 45%;
  }
}
</style>