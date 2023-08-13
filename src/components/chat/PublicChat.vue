<template>
  <div class="main-chat">
    <preLoader v-if="loading" ref="preLoader" />

    <div class="titel text-center fw-bold fst-italic">Public Chat</div>
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
          <h6 class="m-b-0">{{ auth.user ? auth.user.name : "" }}</h6>
          <small>Last seen: 2 hours ago</small>
        </div>
      </div>

      <div class="chat-icons">
        <a href="javascript:void(0);" class="btn btn-outline-primary"
          ><i class="mdi mdi-image h5"></i
        ></a>
      </div>
    </div>

    <div class="chat-history" ref="chatHistory">
      <ul class="m-b-0" v-if="data.length">
        <li class="clearfix" v-for="message in data" :key="message.id">
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
</template>

<script>
import preLoader from "../preLoader.vue";
import { AuthStore } from "../../stores/AuthStore";
import axios from "axios";

export default {
  data() {
    return {
      noData: true,
      scroll: true,
      loading: true,
      data: [],
      message: "",
      sending: false,
      publicChat: true,
    };
  },
  setup() {
    const auth = AuthStore();
    return { auth };
  },

  async mounted() {
    await this.getData();
    this.$refs.mainInput.focus();
    const auth = AuthStore();

    window.Echo.join("public-chat").listen("MessageEvent", (message) => {
      this.data.push(message.message);
    });
  },

  components: { preLoader },

  updated() {
    if (this.scroll) {
      this.$refs.chatHistory.scrollTop = this.$refs.chatHistory.scrollHeight;
      this.loading = false;
    }
  },

  watch: {
    data(newVal) {
      newVal.length ? (this.noData = false) : (this.noData = true);
      this.loading = false;
    },
  },

  methods: {
    async getData() {
      try {
        let res = await axios.get("getPublicMessages");
        this.data = res.data.data;
        this.loading = false;
      } catch (error) {
        console.log("ho", error);
      }
    },

    async send() {
      if (!this.validate(this.message)) {
        return false;
      }
      this.sending = true;
      try {
        // await axios.post("messages", { message: this.message });
        console.log(await axios.post("messages", { message: this.message }));
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
</script>

