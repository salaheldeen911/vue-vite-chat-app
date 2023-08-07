<template>
  <div class="users-list">
    <div class="titel text-center fw-bold fst-italic">Friends</div>
    <div class="users-list-body">
      <ul class="list-unstyled chat-list mt-2 mb-0">
        <li
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
              <i
                v-if="chat.user.status"
                class="mdi mdi-check-circle online"
              ></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { AuthStore } from "../../stores/AuthStore";
import axios from "axios";

export default {
  setup() {
    const auth = AuthStore();
    return { auth };
  },
  data() {
    return {
      onlineUsers: [],
      onlineIds: [],
      chats: [],
    };
  },
  watch: {
    onlineUsers() {
      console.log("online", this.onlineUsers);
    },
  },
  async mounted() {
    console.log("mounted", this.onlineUsers);
    try {
      let chats = await axios.get("chats");
      this.chats = chats.data.chats;
      console.log("chats", chats);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    setUsers(users) {
      this.onlineUsers = users.filter((u) => u.id != this.auth.user.id);
    },
    removeUser(user) {
      this.onlineUsers = this.onlineUsers.filter((u) => u.id != user.id);
    },
    addUser(user) {
      this.onlineUsers.push(user);
      console.log(this.onlineUsers);
    },

    openChat(id) {
      this.$emit("openChat", id);
    },
  },
};
</script>

<style>
</style>