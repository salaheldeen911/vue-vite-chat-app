<template>
  <div class="users-list">
    <div class="titel text-center fw-bold fst-italic">Friends</div>

    <div class="users-list-body">
      <ul class="list-unstyled chat-list mt-2 mb-0">
        <li
          :id="'user-' + chat.user.id"
          @click="openChat(chat.id)"
          class="user mb-2"
          v-for="chat in chats"
          :key="chat.id"
        >
          <img
            :src="chat.user.gender ? '/male.png' : '/female.png'"
            alt="avatar"
          />
          <div class="about">
            <p class="name m-0 p-1">{{ chat.user.name }}</p>
            <p class="phone m-0 p-1">01273542801</p>
            <!-- <p class="phone m-0 p-1">{{ chat.message }}</p> -->

            <div v-if="chat.status" class="status">
              <i class="mdi mdi-check-circle online none"></i>
            </div>
          </div>
          <TypingAnimation :id="chat.id" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { OnlineUsersStore } from "../../stores/OnlineUsersStore";
import { ChatsStore } from "../../stores/ChatsStore";
import axios from "axios";
import TypingAnimation from "../TypingAnimation.vue";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";

const ChatStore = ChatsStore();
const { chats } = storeToRefs(ChatStore);
const OnlineStore = OnlineUsersStore();
const { onlineUsers } = storeToRefs(OnlineStore);

// const emit = defineEmits(["openchat"]);

function openChat(id) {
  ChatStore.setIsPublic(false);
  ChatStore.setActiveChat(id);

  // emit("openChat", id);
}

async function setChats() {
  ChatStore.setChats();
}

onMounted(async () => {
  try {
    await ChatStore.setChats();
    showOnlineFriends();
  } catch (error) {
    console.log(error);
  }
});

function getOnlineUsersIds() {
  let ids = [];
  for (let onlineUser of onlineUsers.value) {
    ids.push(onlineUser.id);
  }
  return ids;
}

function showOnlineFriends() {
  const onlineUsersIds = getOnlineUsersIds();
  setTimeout(() => {
    for (const chat of chats.value) {
      let chatElement = document.getElementById("user-" + chat.user.id);
      if (chat.status) {
        if (onlineUsersIds.includes(chat.user.id)) {
          chatElement.getElementsByTagName("i")[0].classList.remove("none");
        } else {
          chatElement.getElementsByTagName("i")[0].classList.add("none");
        }
      }
    }
  }, 200);
}

watch(
  () => onlineUsers.value,
  () => {
    showOnlineFriends();
  },
  { deep: true }
);

watch(
  () => chats.value,
  () => {
    showOnlineFriends();
  },
  { deep: true }
);
</script>

<style scoped>
.typing {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>