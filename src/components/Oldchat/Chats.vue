<template>
  <div class="chats">
    <ul>
      <li v-for="id in chatsIds" :key="id" @click="selectedChat = id">
        {{ id }}
      </li>
    </ul>
  </div>
  <slot />
</template>

<script>
import { ref, provide } from "vue";
export default {
  setup(props, { slots }) {
    const chatsIds = ref(slots.default().map((chat) => chat.props.id));
    const selectedChat = ref(chatsIds.value[0]);

    provide("selectedChat", selectedChat);
    return {
      selectedChat,
      chatsIds,
    };
  },
};
</script>

<style>
</style>