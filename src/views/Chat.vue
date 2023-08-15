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
      <not-friends @sentRequest="sentRequest" />
      <friends @openChat="openChat" ref="friends" />
      <div @click="hideUsers()" class="hideBtn none" ref="arrowHide">
        <span
          id="arrowHide"
          role="button"
          class="mdi mdi-chevron-double-left"
        ></span>
      </div>
    </div>
    <mainChat ref="mainChat" />
  </div>
</template>

<script>
import mainChat from "../components/chat/main/mainChat.vue";
import NotFriends from "../components/chat/NotFriends.vue";
import Friends from "../components/chat/Friends.vue";

export default {
  components: { mainChat, NotFriends, Friends },
  methods: {
    openChat(id) {
      this.$refs.mainChat.openPrivateChat(id);
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
    sentRequest() {
      this.$emit("sentRequest");
    },
  },
};
</script>
