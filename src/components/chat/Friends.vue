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
            src="https://bootdey.com/img/Content/avatar/avatar2.png"
            alt="avatar"
          />
          <div class="about">
            <p class="name m-0 p-1">{{ chat.user.name }}</p>
            <p class="phone m-0 p-1">01273542801</p>

            <div v-if="chat.status" class="status">
              <i class="mdi mdi-check-circle online none"></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { OnlineUsersStore } from "../../stores/OnlineUsersStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import { onMounted, watch, ref } from "vue";

const OnlineStore = OnlineUsersStore();
const { onlineUsers } = storeToRefs(OnlineUsersStore);

const chats = ref([]);
const emit = defineEmits(["openchat"]);

function openChat(id) {
  emit("openChat", id);
}

async function get() {
  let r = await axios.get("chats");
  return r.data.chats;
}

onMounted(async () => {
  try {
    chats.value = await get();
    if (chats.value.length > 0) {
      setTimeout(() => {
        showOnlineFriends();
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
});

function getOnlineUsersIds(onlineUsers) {
  let ids = [];
  for (let onlineUser of onlineUsers) {
    ids.push(onlineUser.id);
  }
  return ids;
}

function showOnlineFriends() {
  const onlineUsersIds = getOnlineUsersIds(OnlineStore.onlineUsers);

  for (const chat of chats.value) {
    let chatElement = document.getElementById("user-" + chat.user.id);
    if (onlineUsersIds.includes(chat.user.id)) {
      chatElement.getElementsByTagName("i")[0].classList.remove("none");
    } else {
      chatElement.getElementsByTagName("i")[0].classList.add("none");
    }
  }
}

watch(
  () => OnlineStore.onlineUsers,
  () => {
    showOnlineFriends();
  },
  { deep: true }
);
</script>

<style>
</style>