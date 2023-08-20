<template>
  <public-chat v-if="isPublic" ref="fo" />
  <private-chat v-if="!isPublic" ref="privateChat" />
</template>

<script setup>
import PublicChat from "./PublicChat.vue";
import PrivateChat from "./PrivateChat.vue";
import { ref } from "vue";
import { ChatsStore } from "../../../stores/ChatsStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";

const ChatStore = ChatsStore();
const { activeChat, isPublic } = storeToRefs(ChatStore);

// function openPrivateChat(id) {
//   this.isPublicChat = false;
//   this.$refs.privateChat.getData(id);
// }
</script>
