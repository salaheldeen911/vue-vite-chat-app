<template>
  <div
    @focusout="handleFocusOut"
    tabindex="0"
    :class="{ show: status }"
    class="requests"
    ref="receivedRequestsContainer"
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
          <strong role="button" @click="accept(request)" class="alert-link"
            >Accept It</strong
          >
          or you can
          <strong role="button" @click="ignore(request)" class="alert-link"
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
import { storeToRefs } from "pinia";
import echo from "../../echo";
import axios from "axios";
import { onMounted, watch, ref } from "vue";

const ReceivedRequestStore = ReceivedRequestsStore();
const { receivedRequests, status } = storeToRefs(ReceivedRequestStore);
const auth = AuthStore();
const receivedRequestsContainer = ref(null);
const emit = defineEmits(["updateUnreadedReceivedRequestsCount"]);

async function getReceivedRequests() {
  try {
    let res = await axios.get("receivedRequests");
    ReceivedRequestStore.setReceivedRequests(res.data.data);
  } catch (error) {
    console.log(error);
  }
}

async function accept(user) {
  try {
    await axios.post("acceptRequest", user);
    await getReceivedRequests();
    // this.$emit("requestHasBeenAccepted");
  } catch (error) {
    console.log(error);
  }
}

async function ignore(user) {
  try {
    await axios.put("ignoreRequest", user);
    await getReceivedRequests();
    // this.$emit("requestHasBeenAccepted");
  } catch (error) {
    console.log(error);
  }
}

// function toggle() {
//   if (status.value) receivedRequestsContainer.value.focus();
// }

function handleFocusOut() {
  setTimeout(() => {
    if (status.value) status.value = false;
  }, 200);
}

// async function getUnreadedReceivedRequestsCount() {
//   try {
//     let count = await axios.get("unreadedReceivedRequestsCount");
//     this.unreadedReceivedRequestsCount = count.data.data.count;
//   } catch (errors) {
//     console.log(errors);
//   }
// }

onMounted(async () => {
  axios.defaults.headers.common["Authorization"] = auth.token(); // `Bearer ${this.auth.token()}`;
  if (!window.Echo) echo.initLaravelEcho();

  window.Echo.private(`cancel-friend-request-channel.${auth.user.id}`)
    .listen("CancelFriendRquestEvent", (e) => {
      getReceivedRequests();

      console.log("event", e);
    })
    .error((error) => {
      console.log(error);
    });

  window.Echo.private(`friend-request-channel.${auth.user.id}`)
    .listen("FriendRquestEvent", (e) => {
      // let count = getUnreadedReceivedRequestsCount();
      // ReceivedRequestStore.setUnreadedReceivedRequestsCount(count);
      getReceivedRequests();
      console.log("friend request event", e);
    })
    .error((error) => {
      console.log(error);
    });
});

// watch(status, (status) => {
//   if (status) toggle();
// });
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