<template>
  <div>
    <div v-if="data" class="main-chat h-100">
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
            <h6 class="m-b-0">{{ data.user.name }}</h6>
            <small>Last seen: 2 hours ago</small>
          </div>
        </div>

        <div class="chat-icons">
          <a
            href="javascript:void(0);"
            @click="unfriend(data.user)"
            class="btn btn-outline-danger"
            >Unfriend</a
          >
        </div>
      </div>

      <div class="chat-history" ref="chatHistory">
        <ul class="m-b-0" v-if="data.messages.length">
          <li
            class="clearfix"
            v-for="message in data.messages"
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
      <div class="chat-message clearfix">
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

<!-- <script>
import preLoader from "../../preLoader.vue";
import { AuthStore } from "../../../stores/AuthStore";
import { ChatsStore } from "../../../stores/ChatsStore";
import { storeToRefs } from "pinia";

import axios from "axios";

export default {
  data() {
    return {
      noData: true,
      scroll: true,
      loading: true,
      // data: null,
      message: "",
      sending: false,
      isActive: false,
    };
  },
  setup() {
    const auth = AuthStore();
    const ChatStore = ChatsStore();
    const { activeChat, isPublic } = storeToRefs(ChatStore);
    const data = ref(null);

    return { auth, activeChat, ChatStore, isPublic, data };
  },

  async mounted() {
    let l = await this.getData();
    const auth = AuthStore();

    // window.Echo.join("public-chat")
    //   .here((users) => {
    //     //returnning all users but the current
    //     this.$emit("setUsers", users);
    //   })
    //   .joining((user) => {
    //     //adding the juiond user th users
    //     this.$emit("userJoined", user);
    //   })
    //   .leaving((user) => {
    //     // removing the left user from users
    //     this.$emit("leftUser", user);
    //   })
    //   .error((error) => {
    //     console.log(error);
    //   })
    //   .listen("MessageEvent", (message) => {
    //     this.data.push(message.message);
    //   });
  },

  // beforeUnmount() {
  //   window.Echo.leave("public-chat"); // ??
  // },

  components: { preLoader },

  // updated() {
  //   if (this.scroll) {
  //     this.$refs.chatHistory.scrollTop = this.$refs.chatHistory.scrollHeight;
  //     this.loading = false;
  //   }
  // },

  watch: {
    data(newVal) {
      newVal.length ? (this.noData = false) : (this.noData = true);
      this.loading = false;
    },
  },

  methods: {
    async getData(id) {
      console.log(this.activeChat);
      try {
        let res = await axios.get(`getPrivateChat/${this.activeChat}`);

        this.data.value = res.data.data;
        console.log(this.data.value);
        this.loading = false;
        this.isActive = true;
        setTimeout(() => {
          this.$refs.mainInput.focus();
        }, 0);
      } catch (error) {
        console.log(error);
      }
    },
    async send() {
      if (!this.validate(this.message)) {
        return false;
      }
      this.sending = true;
      try {
        await axios.post("messages", { message: this.message });
        this.scroll = true;
        this.$refs.mainInput.focus();
      } catch (error) {
        console.log(error);
      }
      this.message = "";
      this.$refs.mainInput.focus();
      this.sending = false;
    },

    validate(body) {
      // to prevent html tags
      const htmlPreventer = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
      if (htmlPreventer.test(body)) return false;

      // to accept all chars, nums, spaces, new lines and prevent less than 3 chars, over 255 chars.
      const pattern = /^([a-zA-Z0-9_ \s\S-]){1,5000}$/;
      return pattern.test(body);
    },
  },
};
</script> -->

<script setup>
import { ChatsStore } from "../../../stores/ChatsStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import { onMounted, watch, ref } from "vue";
import preLoader from "../../preLoader.vue";
import { AuthStore } from "../../../stores/AuthStore";

const auth = AuthStore();
const ChatStore = ChatsStore();
const { activeChat, isPublic } = storeToRefs(ChatStore);
const data = ref(null);
const loading = ref(true);
const sending = ref(false);
const message = ref("");

onMounted(async () => {
  try {
    await getData();
  } catch (error) {
    console.log(error);
  }
});

async function getData() {
  let res = await axios.get(`getPrivateChat/${activeChat.value}`);

  data.value = res.data.data;
  loading.value = false;
  // loading = false;
  // this.isActive = true;
  // setTimeout(() => {
  //   this.$refs.mainInput.focus();
  // }, 0);
}
// async function send() {
//   if (!this.validate(this.message)) {
//     return false;
//   }
//   this.sending = true;
//   try {
//     await axios.post("messages", { message: this.message });
//     this.scroll = true;
//     this.$refs.mainInput.focus();
//   } catch (error) {
//     console.log(error);
//   }
//   this.message = "";
//   this.$refs.mainInput.focus();
//   this.sending = false;
// }

// function validate(body) {
//   // to prevent html tags
//   const htmlPreventer = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
//   if (htmlPreventer.test(body)) return false;

//   // to accept all chars, nums, spaces, new lines and prevent less than 3 chars, over 255 chars.
//   const pattern = /^([a-zA-Z0-9_ \s\S-]){1,5000}$/;
//   return pattern.test(body);
// }

async function unfriend(user) {
  try {
    let i = await axios.delete("unfriend", {
      data: { user: user, chat_id: ChatStore.activeChat },
    });
    console.log(i);
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