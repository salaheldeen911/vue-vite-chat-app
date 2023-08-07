<template>
  <public-chat
    ref="fo"
    :class="{ none: !isPublicChat }"
    @userJoined="userJoined"
    @setUsers="setUsers"
    @leftUser="leftUser"
  />
  <private-chat ref="privateChat" :class="{ none: isPublicChat }" />
</template>

<script>
import PublicChat from "./PublicChat.vue";
import PrivateChat from "./PrivateChat.vue";

export default {
  components: { PublicChat, PrivateChat },
  emits: ["setUsers", "userJoined", "leftUser"], // <--- add this line

  data() {
    return {
      isPublicChat: true,
      id: null,
    };
  },

  methods: {
    openPrivateChat(id) {
      this.isPublicChat = false;
      this.$refs.privateChat.getData(id);
    },
    setUsers(users) {
      this.$emit("setUsers", users);
    },
    userJoined(user) {
      this.$emit("userJoined", user);
    },
    leftUser(user) {
      this.$emit("leftUser", user);
    },
  },
};
</script>

<style>
.none {
  display: none !important;
}
</style>
