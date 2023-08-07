<template>
  <div v-show="id == selectedChat">
    <slot />
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  props: ["id"],
  setup() {
    const selectedChat = inject("selectedChat");

    return {
      selectedChat,
    };
  },
};
</script>

<style>
</style>