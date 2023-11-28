<template>
  <div v-if="typing" class="typing">
    <span class="dot dot1"></span>
    <span class="dot dot2"></span>
    <span class="dot dot3"></span>
  </div>
</template>
<script setup>
import { ChatsStore } from "../stores/ChatsStore";
import { storeToRefs } from "pinia";
import { ref, toRefs } from "vue";
import echo from "../echo";
import { AuthStore } from "../stores/AuthStore";

const auth = AuthStore();

const props = defineProps({
  id: Number,
});

const { id } = toRefs(props);

const ChatStore = ChatsStore();
const { activeChat, isPublic } = storeToRefs(ChatStore);
const channel = ref(null);
const typing = ref(false);

channel.value = window.Echo.private(`chat.${id.value}`);

channel.value
  .listenForWhisper("typing", (e) => {
    typing.value = true;
  })
  .listenForWhisper("typing-stoped", (e) => {
    typing.value = false;
  })
  .error((error) => {
    console.log(error);
  });
</script>

<style lang="scss" scoped>
.dot {
  width: 8px;
  height: 8px;
  background-color: rgb(220 53 69);
  border-radius: 50%;
  margin: 5px;
  animation: dots 0.6s ease-in-out infinite alternate;
  display: inline-block;
}

.dot2 {
  animation-delay: 0.2s;
}

.dot3 {
  animation-delay: 0.4s;
}

@keyframes dots {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>