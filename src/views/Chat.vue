<template>
  <div id="main">
    <div class="users-lists" ref="usersLists">
      <div @click="showUsers()" class="showBtn none" ref="arrowShow">
        <span
          id="arrowShow"
          role="button"
          class="mdi mdi-chevron-double-right"
        ></span>
      </div>
      <not-friends />
      <friends @openChat="openChat" ref="friends" />
      <div @click="hideUsers()" class="hideBtn none" ref="arrowHide">
        <span
          id="arrowHide"
          role="button"
          class="mdi mdi-chevron-double-left"
        ></span>
      </div>
    </div>
    <!-- <Users @openChat="openChat" ref="usersLists" /> -->
    <mainChat
      ref="mainChat"
      @userJoined="userJoined"
      @setUsers="setUsers"
      @leftUser="leftUser"
    />
  </div>
</template>

<script>
import { AuthStore } from "../stores/AuthStore";
import Echo from "laravel-echo";
import Users from "../components/chat/usersLists.vue";
import mainChat from "../components/chat/mainChat.vue";
import axios from "axios";
import NotFriends from "../components/chat/NotFriends.vue";
import Friends from "../components/chat/Friends.vue";

export default {
  components: { Users, mainChat, NotFriends, Friends },
  setup() {
    const auth = AuthStore();
    return { auth };
  },
  async mounted() {
    const auth = AuthStore();
    window.Echo.private(`friend-request-channel.${auth.user.id}`).listen(
      "FriendRquestEvent",
      (e) => {
        console.log("Friend Rquest Has Been Sent");
        // console.log(e);
      }
    );
  },
  data() {
    return {
      data: [],
    };
  },
  methods: {
    setUsers(users) {
      this.$refs.friends.setUsers(users);
    },
    userJoined(user) {
      this.$refs.friends.addUser(user);
    },
    leftUser(user) {
      this.$refs.friends.removeUser(user);
    },
    openChat(id) {
      // console.log("refs", this.$refs);
      this.$refs.mainChat.openPrivateChat(id);

      // console.log(id);
    },
    showUsers() {
      this.$refs.friends.classList.add("show-users-lists");
      this.$refs.arrowShow.classList.add("hide", "disabled");
      this.$refs.arrowHide.classList.add("flex");
    },
    hideUsers() {
      this.$refs.friends.classList.remove("show-users-lists");
      this.$refs.arrowShow.classList.remove("hide", "disabled");
      this.$refs.arrowHide.classList.remove("flex");
    },
  },
  /* TODO:: APPLY FOR FRONT END */
};
</script>

<style lang="scss">
</style>