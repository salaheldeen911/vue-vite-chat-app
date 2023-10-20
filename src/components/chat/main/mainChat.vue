<template>
  <public-chat v-if="isPublic" ref="fo" />
  <private-chat v-if="!isPublic" ref="privateChat" />
</template>

<script setup>
import PublicChat from "./PublicChat.vue";
import PrivateChat from "./PrivateChat.vue";
import { GeneralStore } from "../../../stores/GeneralStore";
import { ChatsStore } from "../../../stores/ChatsStore";
import echo from "../../../echo";
import { AuthStore } from "../../../stores/AuthStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const auth = AuthStore();
const ChatStore = ChatsStore();
const general = GeneralStore();
const { activeChat, isPublic } = storeToRefs(ChatStore);

onMounted(async () => {
  axios.defaults.headers.common["Authorization"] = auth.token(); // `Bearer ${this.auth.token()}`;
  if (!window.Echo) echo.initLaravelEcho();

  window.Echo.private(`accepted-friend-request-channel.${auth.user.id}`)
    .listen("AcceptedFriendRquestEvent", (e) => {
      general.refreshStores();
    })
    .error((error) => {
      console.log(error);
    });

  window.Echo.private(`unfriend-user-channel.${auth.user.id}`)
    .listen("UnfriendEvent", (e) => {
      general.refreshStores();
    })
    .error((error) => {
      console.log(error);
    });
});
</script>
