<template>
  <div v-if="auth.status" class="main-chat">
    <preLoader v-if="loading" />

    <div class="titel text-center fw-bold fst-italic">
      <span>Private Chat</span>
      <i @click="resetChat()" class="mdi mdi-close-circle h4" role="button"></i>
    </div>
    <div v-if="chat" class="main-chat-header">
      <div class="userInfo">
        <a
          href="javascript:void(0);"
          data-toggle="modal"
          data-target="#view_info"
        >
          <img
            :src="chat.user.gender ? '/male.png' : '/female.png'"
            alt="avatar"
          />
        </a>
        <div class="chat-about">
          <h6 class="m-b-0">{{ chat.user.name }}</h6>
          <small v-if="!friendStatus && !gettingLastSeen"
            >Last seen: {{ chat.user.last_seen }}</small
          >
          <small v-else>Online</small>
        </div>
      </div>

      <div v-if="chat.status" class="chat-icons">
        <a
          href="javascript:void(0);"
          @click="unfriend(chat.user)"
          class="btn btn-outline-danger"
          >Unfriend</a
        >
      </div>
    </div>
    <div v-if="chat" class="chat-history" id="chatHistory" ref="chatHistory">
      <ul class="m-b-0" v-if="chat.messages.length">
        <li class="clearfix" v-for="message in messages" :key="message.id">
          <div
            class="message-data"
            :class="{ textRight: message.user.id == auth.user.id }"
          >
            <span class="message-data-time fw-bold fst-italic">
              {{ message.created_at }}
            </span>
          </div>
          <div
            class="relative message"
            :class="[
              message.user.id == auth.user.id
                ? 'otherMessage floatRight'
                : 'my-message',
            ]"
          >
            <span
              v-if="auth.user && message.user.id !== auth.user.id"
              class="fw-bold fst-italic"
              >{{
                message.user.id !== auth.user.id ? message.user.name : "You"
              }}</span
            >
            <p>
              {{ message.message }}
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="!loading" class="chat-message clearfix">
      <form
        v-if="chat && chat.status"
        class="input-group mb-0"
        @submit.prevent.enter="sendPrivate"
      >
        <div class="input-group-prepend">
          <TypingAnimation :id="activeChat" />
          <button :disabled="sending" type="submit" class="input-group-text">
            <i class="mdi mdi-send"></i>
          </button>
        </div>
        <input
          v-model="message"
          ref="mainInput"
          type="text"
          class="form-control"
          placeholder="Enter text here..."
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { OnlineUsersStore } from "../../../stores/OnlineUsersStore";
import { ChatsStore } from "../../../stores/ChatsStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import { onMounted, watch, ref } from "vue";
import preLoader from "../../preLoader.vue";
import TypingAnimation from "../../TypingAnimation.vue";
import { AuthStore } from "../../../stores/AuthStore";
import { GeneralStore } from "../../../stores/GeneralStore";

// const props = defineProps({
//   id: Number,
// });
const auth = AuthStore();
const ChatStore = ChatsStore();
const General = GeneralStore();
const { activeChat, isPublic } = storeToRefs(ChatStore);
const OnlineStore = OnlineUsersStore();
const { onlineUsers } = storeToRefs(OnlineStore);
const chat = ref(null);
const chatHistory = ref(null);
const loading = ref(true);
const sending = ref(false);
const message = ref("");
const messages = ref([]);
const channel = ref(null);
const friendStatus = ref(false);
const gettingLastSeen = ref(false);

onMounted(async () => {
  loading.value = true;
  await getChat();
  loading.value = false;

  scroll();

  channel.value = window.Echo.private(`chat.${activeChat.value}`);

  channel.value
    .listen("PrivateMessageEvent", (e) => {
      messages.value.push(e.message);

      scroll();
    })
    .error((error) => {
      console.log(error);
    });

  checkFriendStatus();
});

function scroll() {
  let chatHistory = document.getElementById("chatHistory");
  if (chatHistory) {
    setTimeout(() => {
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }, 200);
  }
}

async function getChat() {
  let res = await axios.get(`getPrivateChat/${activeChat.value}`);
  console.log("D:");
  chat.value = res.data.data;
  messages.value = chat.value.messages;
  // loading.value = false;
}

function validate(message) {
  // to prevent html tags
  const htmlPreventer = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
  if (htmlPreventer.test(message)) return false;

  // to accept all chars, nums, spaces, new lines and prevent less than 3 chars, over 255 chars.
  const pattern = /^(?!.{256})\s*\S.{0,253}\S\s*$/;

  return pattern.test(message);
}

async function sendPrivate() {
  if (!validate(message.value)) return false;

  sending.value = true;

  try {
    const res = await axios.post("privateMessage", {
      message: message.value,
      chat_id: activeChat.value,
    });

    scroll.value = true;
  } catch (error) {
    console.log(error);
  }

  message.value = "";
  // $refs.mainInput.focus();
  sending.value = false;
}

async function unfriend(user) {
  try {
    let i = await axios.delete("unfriend", {
      data: { user: user, chat_id: ChatStore.activeChat },
    });
    resetChat();
    General.refreshStores();
  } catch (error) {
    console.log(error);
  }
}

function resetChat() {
  ChatStore.reset();
}

function getOnlineUsersIds() {
  let ids = [];
  for (let onlineUser of onlineUsers.value) {
    ids.push(onlineUser.id);
  }
  return ids;
}

function checkFriendStatus() {
  const onlineUsersIds = getOnlineUsersIds();
  setTimeout(() => {
    if (chat.value.status) {
      if (onlineUsersIds.includes(chat.value.user.id)) {
        friendStatus.value = true;
      } else {
        friendStatus.value = false;
      }
    }
  }, 400);
}

watch(message, (value) => {
  if (value) {
    channel.value.whisper("typing", {
      name: auth.user.name,
      typing: true,
    });
  } else {
    channel.value.whisper("typing-stoped", {
      name: auth.user.name,
      typing: false,
    });
  }
});

watch(
  () => onlineUsers.value,
  () => {
    checkFriendStatus();
  },
  { deep: true }
);

watch(
  () => friendStatus.value,
  async () => {
    if (!friendStatus.value) {
      gettingLastSeen.value = true;
      await getChat();
      gettingLastSeen.value = false;
    }
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.typing {
  position: absolute;
  top: -22px;
}
.mdi.mdi-close-circle {
  width: 35px;
  height: 29px !important;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  margin: 0;
  align-items: center;
  padding: 1px;

  &:hover {
    color: rgb(220 53 69);
  }
}

.typing {
  position: absolute;
  top: -22px;
}
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