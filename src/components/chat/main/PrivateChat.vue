<template>
  <div>
    <div v-if="chat" class="main-chat h-100">
      <preLoader v-if="loading" ref="preLoaderComponent" />

      <div class="titel text-center fw-bold fst-italic">
        <span>Private Chat</span>
        <i
          @click="resetChat()"
          class="mdi mdi-close-circle h4"
          role="button"
        ></i>
      </div>
      <div class="main-chat-header">
        <div class="userInfo">
          <a
            href="javascript:void(0);"
            data-toggle="modal"
            data-target="#view_info"
          >
            <img
              src="https://bootdey.com/img/Content/avatar/avatar2.png"
              alt="avatar"
            />
          </a>
          <div class="chat-about">
            <h6 class="m-b-0">{{ chat.user.name }}</h6>
            <small>Last seen: 2 hours ago</small>
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

      <div class="chat-history" ref="chatHistory">
        <ul class="m-b-0" v-if="chat.messages.length">
          <li
            class="clearfix"
            v-for="message in chat.messages"
            :key="message.id"
          >
            <div
              v-if="auth.user"
              class="message-data"
              :class="{ textRight: message.user.id == auth.user.id }"
            >
              <span class="message-data-time fw-bold fst-italic">
                {{ message.created_at }}
              </span>
            </div>
            <div
              v-if="auth.user"
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
                >{{ message.user.name }}</span
              >
              <p>
                {{ message.message }}
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="chat.status" class="chat-message clearfix">
        <form class="input-group mb-0" @submit.prevent.enter="send">
          <div class="input-group-prepend">
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
  </div>
</template>


<script setup>
import { ChatsStore } from "../../../stores/ChatsStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import { onMounted, watch, ref } from "vue";
import preLoader from "../../preLoader.vue";
import { AuthStore } from "../../../stores/AuthStore";
import echo from "../../../echo";
import { GeneralStore } from "../../../stores/GeneralStore";

const auth = AuthStore();
const ChatStore = ChatsStore();
const General = GeneralStore();
const { activeChat, isPublic } = storeToRefs(ChatStore);
const chat = ref(null);
const loading = ref(true);
const sending = ref(false);
const message = ref("");

onMounted(async () => {
  await getChat();
});

async function getChat() {
  let res = await axios.get(`getPrivateChat/${activeChat.value}`);

  chat.value = res.data.data;
  loading.value = false;
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
</script>

<style scoped lang="scss">
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
</style>