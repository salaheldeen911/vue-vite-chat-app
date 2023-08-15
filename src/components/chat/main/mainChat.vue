<template>
  <public-chat ref="fo" :class="{ none: !isPublicChat }" />
  <private-chat ref="privateChat" :class="{ none: isPublicChat }" />
</template>

<script>
import PublicChat from "./PublicChat.vue";
import PrivateChat from "./PrivateChat.vue";

export default {
  components: { PublicChat, PrivateChat },

  data() {
    return {
      isPublicChat: true,
    };
  },

  methods: {
    openPrivateChat(id) {
      this.isPublicChat = false;
      this.$refs.privateChat.getData(id);
    },
  },
};
</script>
